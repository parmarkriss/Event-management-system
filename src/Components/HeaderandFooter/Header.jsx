import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Make sure to import your UserContext

const Header = () => {
    const { currentUser, logoutUser } = useContext(UserContext); 
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

    const handleLogout = () => {
        logoutUser(); 
        navigate('/'); 
    };

    return (
        <header className="bg-white py-3 px-4 shadow-md rounded-md">
            <div className="flex items-center justify-between">
                <a href="/" className="text-3xl font-bold text-red-500 no-underline">Eventify</a>
                <div className="hidden md:flex space-x-6 align-items-center">
                    <>
                        <Link to={'/home'} className="text-gray-700 hover:text-gray-900 no-underline">Home</Link>
                        <Link to={'/view-event'} className="text-gray-700 hover:text-gray-900 no-underline">View Events</Link>
                        <Link to={'/create-event'} className="text-gray-700 hover:text-gray-900 no-underline">Create Events</Link>
                        {currentUser && (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                                Logout
                            </button>
                        )}
                    </>
                </div>
                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none">
                        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2">
                    <Link to={'/home'} className="block text-gray-700 hover:text-gray-900 no-underline py-2">Home</Link>
                    <Link to={'/view-event'} className="block text-gray-700 hover:text-gray-900 no-underline py-2">View Events</Link>
                    <Link to={'/create-event'} className="block text-gray-700 hover:text-gray-900 no-underline py-2">Create Events</Link>
                    {currentUser && (
                        <button
                            onClick={handleLogout}
                            className="block w-1/2 mx-auto text-left bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full transition duration-300 ease-in-out text-center">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
