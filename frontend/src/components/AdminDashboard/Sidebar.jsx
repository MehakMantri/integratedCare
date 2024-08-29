import React from 'react';
import { useTheme } from '../HomePage/ThemeContext';

function Sidebar({ setActiveComponent, activeComponent }) {
  const { isDarkTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'patients', label: 'Patient Management' },
    { id: 'queuing', label: 'Queuing Models' },
    { id: 'beds', label: 'Bed Availability' },
    { id: 'inventory', label: 'Inventory Management' },
  ];

  return (
    <div className={`${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-blue-800 text-white'} w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.id}
            onClick={() => setActiveComponent(item.id)}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              activeComponent === item.id
                ? (isDarkTheme ? 'bg-gray-700' : 'bg-blue-700')
                : 'hover:bg-blue-700'
            } cursor-pointer`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
