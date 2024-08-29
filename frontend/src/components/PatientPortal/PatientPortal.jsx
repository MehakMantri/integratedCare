import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import QueueStatus from './QueueStatus';
import MedicalRecords from './MedicalRecords';
import Billing from './Billing';

function PatientPortal() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Patient Portal</h2>
        <nav>
          <ul className="space-y-2">
            <li><Link to="/patient" className="block py-2 px-4 hover:bg-blue-700 rounded">Dashboard</Link></li>
            <li><Link to="/patient/appointments" className="block py-2 px-4 hover:bg-blue-700 rounded">Appointments</Link></li>
            <li><Link to="/patient/queue-status" className="block py-2 px-4 hover:bg-blue-700 rounded">Queue Status</Link></li>
            <li><Link to="/patient/medical-records" className="block py-2 px-4 hover:bg-blue-700 rounded">Medical Records</Link></li>
            <li><Link to="/patient/billing" className="block py-2 px-4 hover:bg-blue-700 rounded">Billing</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="queue-status" element={<QueueStatus />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="billing" element={<Billing />} />
        </Routes>
      </main>
    </div>
  );
}

export default PatientPortal;