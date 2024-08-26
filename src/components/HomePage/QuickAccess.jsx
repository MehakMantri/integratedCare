import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function QuickAccessButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
    >
      {text}
    </button>
  );
}

function QuickAccess() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <section className="mb-8 flex flex-wrap justify-around gap-4">
      {/* Each button navigates to a specific route */}
      <QuickAccessButton text="Patient Portal" onClick={() => navigate('/patient')} />
      <QuickAccessButton text="Staff Portal" onClick={() => navigate('/staff')} />
      <QuickAccessButton text="Bed Availability" onClick={() => navigate('/bed-availability')} />
      <QuickAccessButton text="Book Appointment" onClick={() => navigate('/book-appointment')} />
    </section>
  );
}

export default QuickAccess;
