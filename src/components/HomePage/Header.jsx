// Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">HospitalMS</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Solutions</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
            <li><a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md">Login/Signup</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
