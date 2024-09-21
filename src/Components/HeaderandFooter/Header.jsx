import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Make sure to import your UserContext

const Header = () => {
    const { currentUser, logoutUser } = useContext(UserContext); 
    const navigate = useNavigate();

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
                                onClick={handleLogout} // Call logout function
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                                Logout
                            </button>
                        )}
                    </>
                </div>
            </div>
        </header>
    );
};

export default Header;
