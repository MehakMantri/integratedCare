// FeaturesOverview.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

function FeaturesOverview() {
  const { isDarkTheme } = useTheme();
  const features = [
    'Patient Queue Management',
    'Bed Availability Tracking',
    'Admission Management',
    'Inventory Management'
  ];

  return (
    <section id="features" className={`py-28 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-7 py-20">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`${isDarkTheme ? 'bg-gray-800' : 'bg-blue-50'} p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-blue-600'}`}>{feature}</h3>
              <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Brief description of {feature.toLowerCase()} functionality.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesOverview;
