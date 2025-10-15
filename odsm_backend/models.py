from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # plaintext as requested (not recommended)
    phone = db.Column(db.String(50))
    address = db.Column(db.Text)
    role = db.Column(db.String(50), default='user')  # user, provider, admin
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    services = db.relationship('Service', backref='provider', lazy=True)
    bookings = db.relationship('Booking', backref='user', lazy=True)

class Service(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(150))
    base_price_min = db.Column(db.Float, default=0.0)
    base_price_max = db.Column(db.Float, default=0.0)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    provider_id = db.Column(db.Integer, nullable=True)
    date = db.Column(db.Date)
    time = db.Column(db.String(20))
    address = db.Column(db.Text)
    notes = db.Column(db.Text)
    status = db.Column(db.String(50), default='Pending')  # Pending, Accepted, In Progress, Completed, Cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    service = db.relationship('Service', primaryjoin="Service.id==Booking.service_id", backref='bookings')
