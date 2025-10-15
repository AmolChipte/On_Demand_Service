import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Star, MapPin, Phone, User, Settings, Bell, Home,
  Users, Wrench, DollarSign, CheckCircle, XCircle, Play, Pause, UserCheck,
  UserX, LogIn, UserPlus, Eye, EyeOff, Plus, Filter, Trash2, ChevronRight, AlertTriangle
} from 'lucide-react';

// Predefined users data
// let PREDEFINED_USERS = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     password: "password123",
//     phone: "+1234567890",
//     address: "123 Main St, Cityville",
//     role: "user",
//     is_verified: true
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     password: "password123",
//     phone: "+0987654321",
//     address: "456 Oak Ave, Townsville",
//     role: "provider",
//     is_verified: true,
//     services: [1, 2]
//   },
//   {
//     id: 3,
//     name: "Admin User",
//     email: "admin@example.com",
//     password: "admin123",
//     phone: "+1122334455",
//     address: "789 Admin Blvd, Metropolis",
//     role: "admin",
//     is_verified: true
//   }
// ];

// Predefined services
// let SERVICES = [
//   {
//     id: 1,
//     name: "Plumbing Service",
//     category: { name: "Home Maintenance" },
//     base_price_min: 50,
//     base_price_max: 150,
//     provider_id: 2
//   },
//   {
//     id: 2,
//     name: "Electrical Repair",
//     category: { name: "Home Maintenance" },
//     base_price_min: 60,
//     base_price_max: 200,
//     provider_id: 2
//   },
//   {
//     id: 3,
//     name: "Cleaning Service",
//     category: { name: "Home Care" },
//     base_price_min: 40,
//     base_price_max: 120,
//     provider_id: null
//   }
// ];

// Predefined bookings
// let INITIAL_BOOKINGS = [
//   {
//     id: 1,
//     service_id: 1,
//     user_id: 1,
//     provider_id: 2,
//     date: "2023-06-15",
//     time: "10:00",
//     address: "123 Main St, Cityville",
//     notes: "Leaky faucet in kitchen",
//     status: "Completed"
//   },
//   {
//     id: 2,
//     service_id: 2,
//     user_id: 1,
//     provider_id: 2,
//     date: "2023-06-20",
//     time: "14:00",
//     address: "123 Main St, Cityville",
//     notes: "Replace light fixture in living room",
//     status: "Pending"
//   }
// ];

let PREDEFINED_USERS = [];
let SERVICES = [];
let INITIAL_BOOKINGS = [];

// Custom Lock icon component
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

// --- PUBLIC HOME PAGE ---
const PublicHome = ({ onLogin, onRegister }) => {
  // State for data
  const [users, setUsers] = useState(PREDEFINED_USERS);
  const [services, setServices] = useState(SERVICES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [providers, setProviders] = useState(PREDEFINED_USERS.filter(u => u.role === 'provider'));

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => {
        PREDEFINED_USERS = data;
        setUsers(data);
      });

    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => {
        SERVICES = data;
        setServices(data);
      });

    fetch("http://localhost:5000/api/bookings")
      .then(res => res.json())
      .then(data => {
        INITIAL_BOOKINGS = data;
        setBookings(data);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">ODSM</h1>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onRegister}
              className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Register
            </button>
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 shadow-md transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            On-Demand Service <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Book trusted professionals in minutes. Reliable, fast, and hassle-free service at your doorstep.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onRegister}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-700 shadow-lg transition-all"
            >
              Get Started
            </button>
            <button
              onClick={onLogin}
              className="px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 shadow transition-all"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => (
              <div key={service.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.category?.name}</p>
                <p className="text-gray-700 font-semibold">
                  From ₹{service.base_price_min}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 ODSM. On-Demand Service Management Platform.</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('public'); // 'public', 'login', 'register'
  const [userRole, setUserRole] = useState('user');
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Login/Register state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'user'
  });

  // Booking form state
  const [bookingData, setBookingData] = useState({
    serviceId: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  });

  // Add Service form state
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    base_price_min: '',
    base_price_max: ''
  });

  // State for data
  const [users, setUsers] = useState(PREDEFINED_USERS);
  const [services, setServices] = useState(SERVICES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [providers, setProviders] = useState(PREDEFINED_USERS.filter(u => u.role === 'provider'));

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => {
        PREDEFINED_USERS = data;
        setUsers(data);
      });

    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => {
        SERVICES = data;
        setServices(data);
      });

    fetch("http://localhost:5000/api/bookings")
      .then(res => res.json())
      .then(data => {
        INITIAL_BOOKINGS = data;
        setBookings(data);
      });
  }, []);


  // Login function
  const handleLogin = (e) => {
    e.preventDefault();
    const user = PREDEFINED_USERS.find(
      u => u.email === loginData.email && u.password === loginData.password
    );
    if (user) {
      if (user.role === 'provider' && !user.is_verified) {
        alert('Your provider account is pending admin approval.');
        return;
      }
      setCurrentUser(user);
      setUserRole(user.role);
      setIsLoggedIn(true);
    } else {
      alert('Invalid email or password');
    }
  };

  // Register function
  const handleRegister = (e) => {
    e.preventDefault();
    const existingUser = PREDEFINED_USERS.find(u => u.email === registerData.email);
    if (existingUser) {
      alert('Email already registered');
      return;
    }
    const newUser = {
      id: PREDEFINED_USERS.length + 1,
      ...registerData,
      is_verified: registerData.role === 'user' ? true : false
    };
    alert('Registration successful! Please login.');
    setCurrentView('login');
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginData({ email: '', password: '' });
  };

  // Booking functions
  const handleBookService = (service) => {
    setSelectedService(service);
    setBookingData({
      serviceId: service.id,
      date: '',
      time: '',
      address: currentUser?.address || '',
      notes: ''
    });
    setShowBookingModal(true);
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.time) {
      alert('Please select both date and time.');
      return;
    }
    const newBooking = {
      id: bookings.length + 1,
      service_id: bookingData.serviceId,
      user_id: currentUser.id,
      provider_id: selectedService?.provider_id || null,
      date: bookingData.date,
      time: bookingData.time,
      address: bookingData.address,
      notes: bookingData.notes,
      status: 'Pending'
    };
    setBookings([...bookings, newBooking]);
    setShowBookingModal(false);
    setBookingData({ serviceId: '', date: '', time: '', address: '', notes: '' });
    alert('Booking created successfully!');
  };

  // Add Service function
  const handleAddService = (e) => {
    e.preventDefault();
    const { name, category, base_price_min, base_price_max } = newService;
    if (!name || !category || !base_price_min || !base_price_max) {
      alert('Please fill all fields');
      return;
    }
    const service = {
      id: Math.max(...services.map(s => s.id), 0) + 1,
      name,
      category: { name: category },
      base_price_min: Number(base_price_min),
      base_price_max: Number(base_price_max),
      provider_id: currentUser.id
    };
    setServices([...services, service]);
    setNewService({ name: '', category: '', base_price_min: '', base_price_max: '' });
    setShowAddServiceModal(false);
    alert('Service added successfully!');
  };

  // --- NEW: Delete current user's account ---
  const handleDeleteOwnAccount = () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

    // Remove user
    const updatedUsers = PREDEFINED_USERS.filter(u => u.id !== currentUser.id);
    setUsers(updatedUsers);

    // Remove their services (if provider)
    if (currentUser.role === 'provider') {
      const updatedServices = services.filter(s => s.provider_id !== currentUser.id);
      setServices(updatedServices);
      // Remove related bookings
      const updatedBookings = bookings.filter(b => b.provider_id !== currentUser.id);
      setBookings(updatedBookings);
    }

    // Remove their bookings (if user)
    if (currentUser.role === 'user') {
      const updatedBookings = bookings.filter(b => b.user_id !== currentUser.id);
      setBookings(updatedBookings);
    }

    alert('Your account has been deleted.');
    handleLogout();
  };

  // --- NEW: Approve pending provider ---
  const handleApproveProvider = (providerId) => {
    const updatedUsers = PREDEFINED_USERS.map(u =>
      u.id === providerId ? { ...u, is_verified: true } : u
    );
    setUsers(updatedUsers);
    setProviders(updatedUsers.filter(u => u.role === 'provider'));
    alert('Provider approved!');
  };

  // --- NEW: Admin delete any user/provider ---
  const handleAdminDeleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    // Remove user
    const updatedUsers = PREDEFINED_USERS.filter(u => u.id !== userId);
    setUsers(updatedUsers);

    // Remove their services
    const updatedServices = services.filter(s => s.provider_id !== userId);
    setServices(updatedServices);

    // Remove all related bookings
    const updatedBookings = bookings.filter(b => b.user_id !== userId && b.provider_id !== userId);
    setBookings(updatedBookings);

    // Update providers list
    setProviders(updatedUsers.filter(u => u.role === 'provider'));
    alert('User deleted successfully!');
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  // UI helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Accepted': return <UserCheck className="w-4 h-4" />;
      case 'In Progress': return <Play className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // === RENDER FUNCTIONS ===
  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <button onClick={() => setCurrentView('public')} className="flex items-center text-blue-600 mb-6 hover:text-blue-800">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
        </button>
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ODSM</h1>
          <p className="text-gray-600">On-Demand Service Management</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentView('register')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Register now
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <button onClick={() => setCurrentView('public')} className="flex items-center text-blue-600 mb-6 hover:text-blue-800">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
        </button>
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-green-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our service platform</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              required
              value={registerData.address}
              onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your address"
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <select
              value={registerData.role}
              onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="user">Customer</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-teal-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentView('login')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  const renderBookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Book {selectedService?.name}</h3>
          <button
            onClick={() => setShowBookingModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Date</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Time</label>
            <input
              type="time"
              required
              value={bookingData.time}
              onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Address</label>
            <textarea
              required
              value={bookingData.address}
              onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter service address"
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Any specific requirements or instructions"
              rows="3"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAddServiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Add New Service</h3>
          <button
            onClick={() => setShowAddServiceModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleAddService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
            <input
              type="text"
              required
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Plumbing"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              required
              value={newService.category}
              onChange={(e) => setNewService({ ...newService, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Home Maintenance"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={newService.base_price_min}
                onChange={(e) => setNewService({ ...newService, base_price_min: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={newService.base_price_max}
                onChange={(e) => setNewService({ ...newService, base_price_max: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddServiceModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 shadow-md"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderHome = () => {
    // Filter services: show all to users, only own to providers
    const displayedServices = userRole === 'provider'
      ? services.filter(s => s.provider_id === currentUser?.id)
      : services.filter(s => s.provider_id !== null);

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {userRole === 'provider' ? 'Your Services' : 'Available Services'}
            </h1>
            <p className="text-xl text-gray-600">
              {userRole === 'provider'
                ? 'Manage your service offerings'
                : 'Connect with trusted professionals'}
            </p>
          </div>
          {userRole === 'provider' && (
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="bg-gradient-to-r from-green-600 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-teal-800 flex items-center shadow-md"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Service
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map(service => {
            const provider = providers.find(p => p.id === service.provider_id) || null;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">🔧</div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {service.category?.name || 'Service'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                {userRole !== 'provider' && provider && (
                  <p className="text-gray-600 mb-2">by {provider.name}</p>
                )}
                <p className="text-gray-600 mb-4">
                  ₹{service.base_price_min} – ₹{service.base_price_max}
                </p>
                {userRole === 'provider' ? (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this service?')) {
                        setServices(services.filter(s => s.id !== service.id));
                        setBookings(bookings.filter(b => b.service_id !== service.id));
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-4 rounded-lg hover:from-red-700 hover:to-red-800 font-medium shadow-md"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleBookService(service)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 font-medium shadow-md"
                  >
                    Book Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {userRole === 'provider' && displayedServices.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="mx-auto bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Wrench className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-6">Add your first service to start receiving bookings</p>
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="bg-gradient-to-r from-green-600 to-teal-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-800 font-medium shadow-md"
            >
              Add Your First Service
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderBookings = () => {
    // Filter bookings based on user role
    const userBookings = userRole === 'user'
      ? bookings.filter(b => b.user_id === currentUser?.id)
      : bookings.filter(b => b.provider_id === currentUser?.id);
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {userRole === 'user' ? 'My Bookings' : 'My Service Requests'}
          </h2>
          {userRole === 'user' && (
            <button
              onClick={() => {
                setSelectedService(null);
                setShowBookingModal(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center shadow-md"
            >
              <Plus className="w-4 h-4 mr-1" /> New Booking
            </button>
          )}
        </div>
        {userBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="mx-auto bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {userRole === 'user'
                ? 'Start by booking a service from our available professionals'
                : 'You have no service requests at the moment'}
            </p>
            {userRole === 'user' && (
              <button
                onClick={() => setActiveTab('home')}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-medium shadow-md"
              >
                Browse Services
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map(booking => {
              const service = services.find(s => s.id === booking.service_id) || { name: 'Unknown Service' };
              const provider = providers.find(p => p.id === booking.provider_id) || null;
              const user = PREDEFINED_USERS.find(u => u.id === booking.user_id) || null;
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600">
                        {userRole === 'user'
                          ? `Provider: ${provider?.name || 'N/A'}`
                          : `Customer: ${user?.name || 'N/A'}`
                        }
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1">{booking.status}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {booking.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      {booking.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      {booking.address}
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600"><strong>Notes:</strong> {booking.notes}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {userRole === 'user' && booking.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md"
                        >
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-md">
                          Reschedule
                        </button>
                      </>
                    )}
                    {userRole === 'provider' && booking.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'Accepted')}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-lg hover:from-green-700 hover:to-teal-800 transition-all duration-300 shadow-md"
                        >
                          Accept Request
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {userRole === 'provider' && booking.status === 'Accepted' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'In Progress')}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 shadow-md"
                      >
                        Start Service
                      </button>
                    )}
                    {userRole === 'provider' && booking.status === 'In Progress' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'Completed')}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-lg hover:from-green-700 hover:to-teal-800 transition-all duration-300 shadow-md"
                      >
                        Mark Complete
                      </button>
                    )}
                    {booking.status === 'Completed' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-md">
                        Rate Service
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderProviders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Service Providers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map(provider => {
          const providerServices = services.filter(s => s.provider_id === provider.id);
          return (
            <div
              key={provider.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                      {provider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                      <p className="text-gray-600 text-sm">{provider.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {providerServices.length > 0
                      ? providerServices.map(s => s.name).join(', ')
                      : 'General Service Provider'}
                  </p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700 font-medium">4.5</span>
                    <span className="text-gray-500 ml-2">({providerServices.length} services)</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800`}>
                  Available
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md">
                  <Phone className="w-4 h-4 mr-2" /> Contact
                </button>
                <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAdmin = () => {
    const totalUsers = users.filter(u => u.role === 'user').length;
    const verifiedProviders = providers.filter(p => p.is_verified);
    const pendingProviders = users.filter(u => u.role === 'provider' && !u.is_verified);
    const completionRate = bookings.length > 0
      ? Math.round((bookings.filter(b => b.status === 'Completed').length / bookings.length) * 100)
      : 0;

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-gray-600">Customers</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <Wrench className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{verifiedProviders.length}</p>
                <p className="text-gray-600">Verified Providers</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl mr-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingProviders.length}</p>
                <p className="text-gray-600">Pending Approvals</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                <p className="text-gray-600">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Providers */}
        {pendingProviders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" /> Pending Provider Approvals
            </h3>
            <div className="space-y-4">
              {pendingProviders.map(user => (
                <div key={user.id} className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveProvider(user.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-lg hover:from-green-700 hover:to-teal-800 shadow-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAdminDeleteUser(user.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 shadow-md"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Users (with delete) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">All Users</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {users.map(user => (
              <div key={user.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email} ({user.role})</p>
                </div>
                <button
                  onClick={() => handleAdminDeleteUser(user.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    if (!currentUser) return null;
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-gray-600 text-lg">{currentUser.email}</p>
            <p className="text-gray-600">{currentUser.phone}</p>
            <span className={`inline-block px-3 py-1 mt-2 rounded-full text-sm font-medium ${currentUser.role === 'admin' ? 'bg-purple-100 text-purple-800' :
              currentUser.role === 'provider' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
              {currentUser.role}
            </span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              defaultValue={currentUser.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              defaultValue={currentUser.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              defaultValue={currentUser.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              rows="3"
              defaultValue={currentUser.address}
            />
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-medium shadow-md">
            Save Changes
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all data.</p>
          <button
            onClick={handleDeleteOwnAccount}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 shadow-md"
          >
            Delete My Account
          </button>
        </div>
      </div>
    );
  };

  // Render public home by default
  if (currentView === 'public') {
    return <PublicHome onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')} />;
  }

  if (!isLoggedIn) {
    return currentView === 'login' ? renderLogin() : renderRegister();
  }

  // Navigation items
  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'providers', label: 'Providers', icon: Users },
    ...(userRole === 'admin' ? [{ id: 'admin', label: 'Admin', icon: Settings }] : []),
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">ODSM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                {userRole === 'user' ? 'Customer' : userRole === 'provider' ? 'Provider' : 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-4 py-3 font-medium text-sm transition-all duration-300 rounded-t-lg ${activeTab === item.id
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'providers' && renderProviders()}
        {activeTab === 'admin' && renderAdmin()}
        {activeTab === 'profile' && renderProfile()}
      </main>

      {/* Modals */}
      {showBookingModal && renderBookingModal()}
      {showAddServiceModal && renderAddServiceModal()}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;