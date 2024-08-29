import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-start space-x-4">
        <Link to="/" className="hover:text-blue-200">Home</Link>
        <Link to="/patient" className="hover:text-blue-200">Patient Portal</Link>
        <Link to="/staff" className="hover:text-blue-200">Staff Portal</Link>
        {/* Add other navigation items as needed */}
      </div>
    </nav>
  );
}

export default Navigation;