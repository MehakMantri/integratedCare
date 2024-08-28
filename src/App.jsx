import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import PatientPortal from './components/PatientPortal/PatientPortal';
import AdminDashboard from './components/AdminDashboard.jsx/Admindashboard'; // Adjust the path as needed
import { ThemeProvider } from './components/HomePage/ThemeContext'; // Adjust the path as needed

function App() {
  return (
    <ThemeProvider> {/* Wrap the Router with ThemeProvider */}
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patient" element={<PatientPortal />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
