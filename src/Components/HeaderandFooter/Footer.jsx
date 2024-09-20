import React from 'react';

function Footer() {
    return (
        <footer className="bg-black text-white py-8">
        <div className="flex flex-wrap justify-center mb-6">
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 1</a>
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 2</a>
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 3</a>
        </div>
        <div className="flex flex-wrap justify-center mb-6">
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 4</a>
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 5</a>
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 6</a>
        </div>
        <div className="flex flex-wrap justify-center mb-6">
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 7</a>
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 8</a>
          <a href="#" className="no-underline text-gray-400 hover:text-white mx-4">Link 9</a>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-400 text-center">&copy; 1999-2024 Eventify. All rights reserved.</p>
        </div>
      </footer>
      
    );
}

export default Footer;