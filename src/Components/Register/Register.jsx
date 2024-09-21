import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.postalCode) {
        alert('Please fill out all fields.');
        return;
      }
    registerUser(formData);
    alert("Register successfully");
    navigate('/'); //login page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-blue-900 container mx-auto p-5 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section */}
          <div className="hidden md:block">
            <h1 className="text-5xl font-bold mb-4 text-yellow-400">Your All-Access Pass</h1>
            <p className="mb-4 text-white">Discover and manage all your events in one place...</p>
            <img
              src="https://cdni.iconscout.com/illustration/premium/preview/event-management-service-illustration-download-in-svg-png-gif-file-formats--managing-manager-planning-pack-entertainment-illustrations-4693331.png?f=webp&h=700"
              alt="Event Management Service"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Registration form */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Sign Up</h2>
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

              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label htmlFor="firstName" className="block text-white">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="firstName"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-white">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="lastName"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Country and Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label htmlFor="country" className="block text-white">Country of Residence</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    id="country"
                    onChange={handleChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-white">Zip/Postal Code</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="postalCode"
                    placeholder="Enter your zip/postal code"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
