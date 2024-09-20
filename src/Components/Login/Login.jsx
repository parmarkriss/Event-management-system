import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; 

const Login = () => {
  const { saveUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Email:', formData.email);
    console.log('Submitted Password:', formData.password);
    // Simple authentication check (replace with real logic)
    if (formData.email && formData.password) {
      saveUser({ email: formData.email });
      navigate('/create-event'); 
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-blue-900 container mx-auto p-5 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content visible only on larger screens */}
          <div className="hidden md:block md:mr-4 md:ml-4 md:mt-0 md:mb-0">
            <h1 className="text-5xl font-bold mb-4 text-yellow-400">Welcome Back</h1>
            <p className="mb-4 text-white">Discover millions of events, get alerts about your favorite artists, teams, plays and more — plus always-secure, effortless ticketing.</p>
            <img
              src="https://cdni.iconscout.com/illustration/premium/preview/event-management-service-illustration-download-in-svg-png-gif-file-formats--managing-manager-planning-pack-entertainment-illustrations-4693331.png?f=webp&h=700"
              alt="Event Management Service"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:mt-4 md:ml-4 md:mr-4 md:mb-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Sign In</h2>
            <p className="mb-4 text-white">New to Ticketmaster? <Link to={'/'} className="text-blue-500 hover:underline">Sign Up</Link></p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="block text-white">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="block text-white">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="w-full bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
