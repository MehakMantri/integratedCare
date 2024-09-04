import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHospital, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

function Navbar() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full bg-opacity-70 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-blue-600 bg-opacity-90'} shadow-lg z-50`}>
      <div className="container mx-auto flex justify-between items-center py-5 px-4 ">
        <div className="flex items-center space-x-2">
          <FaHospital className={`text-2xl ${isDarkTheme ? 'text-blue-600' : 'text-blue-600'}`} />
          <span className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Healthify</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => handleNavClick('home')} className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Home</button>
          <button onClick={() => handleNavClick('features')} className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Features</button>
          <button onClick={() => handleNavClick('testimonials')} className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Testimonials</button>
          <button onClick={() => handleNavClick('benefits')} className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Benefits</button>
          <button onClick={() => navigate('/blogs')} className={`text-lg ${isDarkTheme ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>Blogs</button>
          <button onClick={toggleTheme} className="focus:outline-none">
            {isDarkTheme ? <FaSun className="text-2xl text-yellow-400" /> : <FaMoon className="text-2xl text-blue-600" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
