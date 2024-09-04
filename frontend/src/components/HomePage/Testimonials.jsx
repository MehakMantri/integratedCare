// Testimonials.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

function Testimonials() {
  const { isDarkTheme } = useTheme();
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
      text: "Highly effective and reliable. It's a game-changer for hospital management.",
      author: "Dr. Michael Brown, County Hospital"
    }
  ];

  return (
    <section id ="testimonials" className={`py-20 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${isDarkTheme ? 'bg-gray-800' : 'bg-blue-50'} p-6 rounded-xl shadow-lg ${isDarkTheme ? 'border-gray-600' : 'border-blue-100'} border`}>
              <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.text}"</p>
              <p className={`font-semibold ${isDarkTheme ? 'text-gray-300' : 'text-blue-600'}`}>- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
