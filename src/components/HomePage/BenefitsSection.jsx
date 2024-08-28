// BenefitsSection.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

function BenefitsSection() {
  const { isDarkTheme } = useTheme();
  const benefits = [
    { title: 'Improved Efficiency', icon: '🚀', description: 'Description of how the system provides improved efficiency.' },
    { title: 'Enhanced Patient Care', icon: '💖', description: 'Description of how the system enhances patient care.' },
    { title: 'Cost Reduction', icon: '💵', description: 'Description of how the system provides cost reduction.' }
  ];

  return (
    <section className={` pb-40 pt-12 ${isDarkTheme ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 duration-300`}>
              <div className={`${isDarkTheme ? 'bg-blue-600' : 'bg-blue-600'} text-white rounded-full p-4 inline-block mb-4`}>
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-blue-600'}`}>{benefit.title}</h3>
              <p className={isDarkTheme ? 'text-gray-200' : 'text-gray-600'}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
