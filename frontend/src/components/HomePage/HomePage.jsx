// HomePage.jsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesOverview from './FeaturesOverview';
import BenefitsSection from './BenefitsSection';
import Testimonials from './Testimonials';
import Footer from './Footer';

function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <HeroSection />
        <FeaturesOverview />
        <BenefitsSection />
        <Testimonials />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
