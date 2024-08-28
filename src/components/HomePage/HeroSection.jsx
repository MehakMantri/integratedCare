import React from 'react';
import { useTheme } from './ThemeContext';

function HeroSection() {
  const { isDarkTheme } = useTheme();

  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-blue-100'}`}>
      {!isDarkTheme && (
        <div className="absolute inset-0">
          <video
            src="/video/bg-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
        </div>
      )}
      <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 opacity-60'}`}></div>
      <div className="relative z-10 text-center text-white px-6 py-8 md:px-16">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in font-sans ">Healthify</h1>
        <p className="text-lg md:text-2xl mb-8 opacity-90 animate-fade-in delay-150">Innovative Solutions for Optimal Healthcare Management</p>
        <div className="flex justify-center gap-4">
          <a href="#book-appointment" className={`inline-block ${isDarkTheme ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-blue-50'} font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 duration-300`}>
            Book Appointment
          </a>
          <a href="/admin-dashboard" className={`inline-block ${isDarkTheme ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 duration-300`}>
            Admin Dashboard
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
