from app import create_app
from models import db, User, Service, Booking
from datetime import date

app = create_app()
with app.app_context():
    # clear
    db.drop_all()
    db.create_all()
    # create users similar to your PREDEFINED_USERS
    u1 = User(name="John Doe", email="john@example.com", password="password123", phone="+1234567890", address="123 Main St, Cityville", role="user", is_verified=True)
    u2 = User(name="Jane Smith", email="jane@example.com", password="password123", phone="+0987654321", address="456 Oak Ave, Townsville", role="provider", is_verified=True)
    u3 = User(name="Admin User", email="admin@example.com", password="admin123", phone="+1122334455", address="789 Admin Blvd", role="admin", is_verified=True)
    db.session.add_all([u1,u2,u3])
    db.session.commit()
    s1 = Service(name="Plumbing Service", category="Home Maintenance", base_price_min=50, base_price_max=150, provider_id=u2.id)
    s2 = Service(name="Electrical Repair", category="Home Maintenance", base_price_min=60, base_price_max=200, provider_id=u2.id)
    s3 = Service(name="Cleaning Service", category="Home Care", base_price_min=40, base_price_max=120, provider_id=None)
    db.session.add_all([s1,s2,s3])
    db.session.commit()
    b1 = Booking(service_id=s1.id, user_id=u1.id, provider_id=u2.id, date=date(2023,6,15), time="10:00", address="123 Main St", notes="Leaky faucet", status="Completed")
    b2 = Booking(service_id=s2.id, user_id=u1.id, provider_id=u2.id, date=date(2023,6,20), time="14:00", address="123 Main St", notes="Replace fixture", status="Pending")
    db.session.add_all([b1,b2])
    db.session.commit()
    print("Seeded!")
