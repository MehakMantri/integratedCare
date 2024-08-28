import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospital, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

function Navbar() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 w-full ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-blue-600 bg-opacity-50'} shadow-lg z-50`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <FaHospital className={`text-2xl ${isDarkTheme ? 'text-blue-600' : 'text-blue-600'}`} />
          <span className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Healthify</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Home</Link>
          <Link to="/features" className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Features</Link>
          <Link to="/doctors" className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Doctors</Link>
          <Link to="/services" className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Services</Link>
          <Link to="/blogs" className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Blogs</Link>
          <button onClick={toggleTheme} className="focus:outline-none">
            {isDarkTheme ? <FaSun className="text-2xl text-yellow-400" /> : <FaMoon className="text-2xl text-blue-600" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
