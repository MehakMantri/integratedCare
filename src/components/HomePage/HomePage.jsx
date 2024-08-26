// HomePage.jsx
import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesOverview from './FeaturesOverview';
import DashboardMockup from './DashboardMockup';
import BenefitsSection from './BenefitsSection';
import Testimonials from './Testimonials';
import IntegrationSection from './IntegrationSection';
import Footer from './Footer';
import Navbar from './Navbar';
function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection />
      <FeaturesOverview />
      {/* <DashboardMockup /> */}
      <BenefitsSection />
      <Testimonials />
      <IntegrationSection />
      <Footer />
    </div>
  );
}

export default HomePage;
