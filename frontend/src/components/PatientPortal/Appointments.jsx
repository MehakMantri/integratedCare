import React, { useState } from 'react';

function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Smith', date: '2024-05-15', time: '14:30', department: 'Cardiology' },
    { id: 2, doctor: 'Dr. Johnson', date: '2024-05-20', time: '10:00', department: 'Neurology' },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Appointments</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Doctor</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="py-3 px-4">{appointment.doctor}</td>
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{appointment.time}</td>
                <td className="py-3 px-4">{appointment.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Book New Appointment
      </button>
    </div>
  );
}

export default Appointments;