// FeaturesOverview.jsx
import React from 'react';

function FeaturesOverview() {
  const features = [
    'Patient Queue Management',
    'Bed Availability Tracking',
    'Admission Management',
    'Inventory Management'
  ];

  return (
    <section className="py-28 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">{feature}</h3>
              <p className="text-gray-400">Brief description of {feature.toLowerCase()} functionality.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesOverview;
