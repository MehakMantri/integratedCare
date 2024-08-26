// Testimonials.jsx
import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      text: "This system has revolutionized our hospital operations. Highly recommended!",
      author: "Dr. Jane Doe, City Hospital"
    },
    {
      text: "The user-friendly interface and powerful features have transformed our workflow.",
      author: "Nurse John Smith, General Clinic"
    },
    {
      text: "An excellent solution that has streamlined our processes and improved patient care.",
      author: "Dr. Emily Davis, Health Center"
    },
    {
      text: "Highly effective and reliable. It’s a game-changer for hospital management.",
      author: "Dr. Michael Brown, County Hospital"
    }
  ];

  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
