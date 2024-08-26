import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import PatientPortal from './components/PatientPortal/PatientPortal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Use `element` prop and wrap the component in JSX */}
          <Route path="/" element={<HomePage />} />
          <Route path="/patient" element={<PatientPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
