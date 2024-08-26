// IntegrationSection.jsx
import React from 'react';

function IntegrationSection() {
  return (
    <section className="bg-gray-900 py-28 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Integration with NIC Modules</h2>
        <p className="text-gray-400 mb-8">
          Our solution seamlessly integrates with NIC-developed modules, bridging the implementation gap in Delhi's healthcare system.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105 duration-300">
          Learn More About Integration
        </button>
      </div>
    </section>
  );
}

export default IntegrationSection;

