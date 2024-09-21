import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {

  const { loginUser,currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password ) {
        alert('Please fill out all fields.');
        return;
      }
    const isLoggedIn = loginUser(formData.email, formData.password);
    if (isLoggedIn) {
      navigate('/create-event');
      alert("Login has been successfully");
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-blue-900 container mx-auto p-5 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section */}
          <div className="hidden md:block">
            <h1 className="text-5xl font-bold mb-4 text-yellow-400">Welcome Back</h1>
            <p className="mb-4 text-white">Discover millions of events, get alerts about your favorite artists, teams, plays and more — plus always-secure, effortless ticketing.</p>
            <img
              src="https://cdni.iconscout.com/illustration/premium/preview/event-management-service-illustration-download-in-svg-png-gif-file-formats--managing-manager-planning-pack-entertainment-illustrations-4693331.png?f=webp&h=700"
              alt="Event Management Service"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Login form */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <div className="mb-3">
                <label htmlFor="email" className="block text-white">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              {/* Password field */}
              <div className="mb-3">
                <label htmlFor="password" className="block text-white">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="w-full bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Login</button>
            </form>
            <p className="mt-4 text-white">
              Don't have an account? <Link to="/register" className="text-yellow-400">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
