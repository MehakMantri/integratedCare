// BenefitsSection.jsx
import React from 'react';

function BenefitsSection() {
  const benefits = [
    { title: 'Improved Efficiency', icon: '🚀', description: 'Description of how the system provides improved efficiency.' },
    { title: 'Enhanced Patient Care', icon: '💖', description: 'Description of how the system enhances patient care.' },
    { title: 'Cost Reduction', icon: '💵', description: 'Description of how the system provides cost reduction.' }
  ];

  return (
    <section className="py-28 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 duration-300">
              <div className="bg-blue-600 text-white rounded-full p-4 inline-block mb-4">
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
