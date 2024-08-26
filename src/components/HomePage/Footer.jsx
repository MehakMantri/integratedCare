// Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Brief company description goes here. Providing a short overview of what we do and our mission.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">contact@hospitalms.com</p>
            <p className="text-gray-400">+1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">📘</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">🐦</a>
              <a href="#" className="text-gray-400 hover:text-pink-500">📸</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
