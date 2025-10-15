import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db, User, Service, Booking
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'devsecret')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, supports_credentials=True)  # allows cookies + requests from frontend origin
    db.init_app(app)

    with app.app_context():
        db.create_all()

    # ---------- Auth ----------
    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'ok': False, 'message': 'Email and password required'}), 400

        user = User.query.filter_by(email=email, password=password).first()
        if not user:
            return jsonify({'ok': False, 'message': 'Invalid credentials'}), 401

        # use Flask session to mark logged in user
        session['user_id'] = user.id
        session['role'] = user.role
        return jsonify({
            'ok': True,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'address': user.address,
                'role': user.role,
                'is_verified': user.is_verified
            }
        })

    @app.route('/api/logout', methods=['POST'])
    def logout():
        session.pop('user_id', None)
        session.pop('role', None)
        return jsonify({'ok': True, 'message': 'Logged out'})

    @app.route('/api/register', methods=['POST'])
    def register():
        data = request.json or {}
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        phone = data.get('phone')
        address = data.get('address')
        role = data.get('role', 'user')

        if not name or not email or not password:
            return jsonify({'ok': False, 'message': 'name, email, password required'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'ok': False, 'message': 'Email already registered'}), 409

        is_verified = True if role == 'user' else False
        user = User(name=name, email=email, password=password, phone=phone, address=address, role=role, is_verified=is_verified)
        db.session.add(user)
        db.session.commit()

        return jsonify({'ok': True, 'message': 'Registered successfully. Please login.'}), 201

    # ---------- Users/Admin ----------
    # // id: 1,
    # // name: "John Doe",
    # // email: "john@example.com",
    # // password: "password123",
    # // phone: "+1234567890",
    # // address: "123 Main St, Cityville",
    # // role: "user",
    # // is_verified: true

    @app.route('/api/users', methods=['GET'])
    def list_users():
        # optional: only admin can list if you want. For now return all.
        users = User.query.all()
        out = []
        for u in users:
            out.append({'id': u.id, 'name': u.name, 'email': u.email, 'password': u.password, 'phone': u.phone,
                        'address': u.address, 'role': u.role, 'is_verified': u.is_verified})
        return jsonify(out)

    @app.route('/api/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        # simple admin-check based on session role
        if session.get('role') != 'admin':
            return jsonify({'ok': False, 'message': 'Only admin allowed'}), 403
        u = User.query.get_or_404(user_id)
        # delete user's services and bookings (cascade manually)
        Service.query.filter_by(provider_id=user_id).delete()
        Booking.query.filter((Booking.user_id==user_id)|(Booking.provider_id==user_id)).delete()
        db.session.delete(u)
        db.session.commit()
        return jsonify({'ok': True, 'message': 'User deleted'})

    # approve provider
    @app.route('/api/users/<int:user_id>/approve', methods=['POST'])
    def approve_provider(user_id):
        if session.get('role') != 'admin':
            return jsonify({'ok': False, 'message': 'Only admin allowed'}), 403
        u = User.query.get_or_404(user_id)
        u.is_verified = True
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Provider approved'})

    # ---------- Services ----------
    @app.route('/api/services', methods=['GET'])
    def get_services():
        services = Service.query.all()
        out = []
        for s in services:
            out.append({
                'id': s.id,
                'name': s.name,
                'category': {'name': s.category} if s.category else None,
                'base_price_min': s.base_price_min,
                'base_price_max': s.base_price_max,
                'provider_id': s.provider_id
            })
        return jsonify(out)

    @app.route('/api/services', methods=['POST'])
    def add_service():
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'ok': False, 'message': 'Login required'}), 401
        data = request.json or {}
        name = data.get('name')
        category = data.get('category')
        base_price_min = float(data.get('base_price_min', 0))
        base_price_max = float(data.get('base_price_max', 0))
        if not name:
            return jsonify({'ok': False, 'message': 'name required'}), 400
        s = Service(name=name, category=category, base_price_min=base_price_min, base_price_max=base_price_max, provider_id=user_id)
        db.session.add(s)
        db.session.commit()
        return jsonify({'ok': True, 'service_id': s.id}), 201

    @app.route('/api/services/<int:service_id>', methods=['DELETE'])
    def delete_service(service_id):
        user_id = session.get('user_id')
        s = Service.query.get_or_404(service_id)
        # providers can delete their services, admin can too
        if session.get('role') != 'admin' and s.provider_id != user_id:
            return jsonify({'ok': False, 'message': 'Not allowed'}), 403
        # delete related bookings
        Booking.query.filter_by(service_id=service_id).delete()
        db.session.delete(s)
        db.session.commit()
        return jsonify({'ok': True})

    # ---------- Bookings ----------
    @app.route('/api/bookings', methods=['GET'])
    def list_bookings():
        # query params can alter behaviour: /api/bookings?user_id=1 or ?provider_id=2
        user_id = request.args.get('user_id', type=int)
        provider_id = request.args.get('provider_id', type=int)
        q = Booking.query
        if user_id:
            q = q.filter_by(user_id=user_id)
        if provider_id:
            q = q.filter_by(provider_id=provider_id)
        bookings = q.all()
        out = []
        for b in bookings:
            out.append({
                'id': b.id,
                'service_id': b.service_id,
                'user_id': b.user_id,
                'provider_id': b.provider_id,
                'date': b.date.isoformat() if b.date else None,
                'time': b.time,
                'address': b.address,
                'notes': b.notes,
                'status': b.status
            })
        return jsonify(out)

    @app.route('/api/bookings', methods=['POST'])
    def create_booking():
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'ok': False, 'message': 'Login required'}), 401
        data = request.json or {}
        service_id = data.get('service_id')
        date_str = data.get('date')
        time_str = data.get('time')
        address = data.get('address')
        notes = data.get('notes')
        if not service_id or not date_str or not time_str:
            return jsonify({'ok': False, 'message': 'service_id, date, time required'}), 400
        service = Service.query.get(service_id)
        if not service:
            return jsonify({'ok': False, 'message': 'Invalid service'}), 400
        provider_id = service.provider_id
        date_obj = None
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        except:
            return jsonify({'ok': False, 'message': 'Invalid date format; use YYYY-MM-DD'}), 400
        b = Booking(service_id=service_id, user_id=user_id, provider_id=provider_id, date=date_obj, time=time_str, address=address, notes=notes, status='Pending')
        db.session.add(b)
        db.session.commit()
        return jsonify({'ok': True, 'booking_id': b.id}), 201

    @app.route('/api/bookings/<int:booking_id>', methods=['PUT'])
    def update_booking_status(booking_id):
        # body: { status: "Accepted" } or other fields
        data = request.json or {}
        b = Booking.query.get_or_404(booking_id)
        # basic access check: either provider for this booking or admin
        if session.get('role') != 'admin' and session.get('user_id') not in (b.user_id, b.provider_id):
            return jsonify({'ok': False, 'message': 'Not allowed'}), 403
        if 'status' in data:
            b.status = data['status']
        # allow editing address/time if owner
        if 'address' in data and session.get('user_id') == b.user_id:
            b.address = data['address']
        if 'time' in data and session.get('user_id') == b.user_id:
            b.time = data['time']
        if 'date' in data and session.get('user_id') == b.user_id:
            try:
                b.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            except:
                pass
        db.session.commit()
        return jsonify({'ok': True})

    @app.route('/api/bookings/<int:booking_id>', methods=['DELETE'])
    def delete_booking(booking_id):
        b = Booking.query.get_or_404(booking_id)
        # allow user (owner) or admin to delete
        if session.get('role') != 'admin' and session.get('user_id') != b.user_id:
            return jsonify({'ok': False, 'message': 'Not allowed'}), 403
        db.session.delete(b)
        db.session.commit()
        return jsonify({'ok': True})

    # ---------- Providers list ----------
    @app.route('/api/providers', methods=['GET'])
    def list_providers():
        providers = User.query.filter_by(role='provider').all()
        out = []
        for p in providers:
            out.append({'id': p.id, 'name': p.name, 'email': p.email, 'is_verified': p.is_verified})
        return jsonify(out)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5000, debug=True)
