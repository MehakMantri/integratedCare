// Footer.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

function Footer() {
  const { isDarkTheme } = useTheme();

  return (
    <footer className={`${isDarkTheme ? 'bg-gray-900 text-gray-300' : 'bg-blue-800 text-white'} pt-20 pb-10 px-10`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className={isDarkTheme ? 'text-gray-400' : 'text-blue-100'}>Brief company description goes here. Providing a short overview of what we do and our mission.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className={isDarkTheme ? 'text-gray-400' : 'text-blue-100'}>contact@hospitalms.com</p>
            <p className={isDarkTheme ? 'text-gray-400' : 'text-blue-100'}>+1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>Privacy Policy</a></li>
              <li><a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>Terms of Service</a></li>
              <li><a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>📘</a>
              <a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>🐦</a>
              <a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>📸</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
