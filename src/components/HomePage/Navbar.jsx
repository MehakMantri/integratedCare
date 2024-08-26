// Updated Navbar component
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospital } from 'react-icons/fa'; // Import a logo icon
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <FaHospital className="text-2xl text-blue-500" /> {/* Logo icon */}
          <span className="text-xl font-bold text-white">Healthify</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-lg text-white hover:text-blue-500">Home</Link>
          <Link to="/features" className="text-lg text-white hover:text-blue-500">Features</Link>
          <Link to="/doctors" className="text-lg text-white hover:text-blue-500">Doctors</Link>
          <Link to="/services" className="text-lg text-white hover:text-blue-500">Services</Link>
          <Link to="/blogs" className="text-lg text-white hover:text-blue-500">Blogs</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
