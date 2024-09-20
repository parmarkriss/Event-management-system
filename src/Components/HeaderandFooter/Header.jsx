import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Adjust the path if needed

const Header = () => {
    const { saveUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        saveUser(null); // Update context state
        navigate('/login'); // Redirect to login page or home page
    };

    return (
        <header className="bg-white py-3 px-4 shadow-md rounded-md">
            <div className="flex items-center justify-between">
                <a href="/" className="text-3xl font-bold text-red-500 no-underline">Eventify</a>
                <div className="hidden md:flex space-x-6 align-items-center">
                    <Link to={'/home'} className="text-gray-700 hover:text-gray-900 no-underline">
                        Home
                    </Link>
                    <Link to={'/view-event'} className="text-gray-700 hover:text-gray-900 no-underline">
                        View Events
                    </Link>
                    <Link to={'/create-event'} className="text-gray-700 hover:text-gray-900 no-underline">
                        Create Events
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                        Logout
                    </button>
                </div>
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <Link to={'/home'} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 no-underline">
                    Home
                </Link>
                <Link to={'/view-event'} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 no-underline">
                    View Events
                </Link>
                <Link to={'/create-event'} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 no-underline">
                    Create Events
                </Link>
                <button
                    onClick={handleLogout}
                    className="block w-1/2 mx-auto text-left px-4 py-2 bg-red-500 text-white hover:bg-red-600 no-underline rounded-full"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
