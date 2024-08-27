import React from 'react';

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Video */}
      <div className="absolute inset-0">
        {/* <img src="/image.png" alt="" /> */}
        <video
        src=""
        //   src="/video/bg-video.mp4" // Path to the video in the public folder
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 py-8 md:px-16">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in">Healthify</h1>
        <p className="text-lg md:text-2xl mb-8 opacity-90 animate-fade-in delay-150">Innovative Solutions for Optimal Healthcare Management</p>
        <div className="flex justify-center gap-4">
          <a href="#book-appointment" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 duration-300">
            Book Appointment
          </a>
          <a href="/admin-dashboard" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 duration-300">
            Admin Dashboard
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
