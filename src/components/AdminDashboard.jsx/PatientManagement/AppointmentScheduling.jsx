import React, { useState } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';

function AppointmentScheduling({ patient, onSchedule }) {
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
    reason: '',
  });
  const { isDarkTheme } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({ ...patient, appointment });
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <h2 className="text-xl font-bold mb-4">Schedule Appointment</h2>
      <input
        type="date"
        name="date"
        value={appointment.date}
        onChange={handleInputChange}
        className={`w-full p-2 mb-2 rounded ${isDarkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
        required
      />
      <input
        type="time"
        name="time"
        value={appointment.time}
        onChange={handleInputChange}
        className={`w-full p-2 mb-2 rounded ${isDarkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
        required
      />
      <input
        type="text"
        name="doctor"
        value={appointment.doctor}
        onChange={handleInputChange}
        placeholder="Doctor's Name"
        className={`w-full p-2 mb-2 rounded ${isDarkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
        required
      />
      <textarea
        name="reason"
        value={appointment.reason}
        onChange={handleInputChange}
        placeholder="Reason for appointment"
        className={`w-full p-2 mb-2 rounded ${isDarkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
        required
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Schedule Appointment
      </button>
    </form>
  );
}

export default AppointmentScheduling;