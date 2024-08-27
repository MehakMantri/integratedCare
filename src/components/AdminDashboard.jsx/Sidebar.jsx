import React from 'react';

function Sidebar({ setActiveComponent }) {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <a onClick={() => setActiveComponent('queuing')} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer">Queuing Models</a>
        <a onClick={() => setActiveComponent('beds')} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer">Bed Availability</a>
        <a onClick={() => setActiveComponent('admission')} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer">Patient Admission</a>
        <a onClick={() => setActiveComponent('inventory')} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer">Inventory Management</a>
      </nav>
    </div>
  );
}

export default Sidebar;