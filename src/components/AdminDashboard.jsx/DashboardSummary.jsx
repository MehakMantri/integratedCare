// DashboardSummary.js
import React from 'react';

function DashboardSummary() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary of Queueing Model */}
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Queueing Model</h3>
          <p className="text-sm text-gray-600">Overview of current queue statistics.</p>
        </div>
        {/* Summary of Bed Availability */}
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Bed Availability</h3>
          <p className="text-sm text-gray-600">Current status of bed availability.</p>
        </div>
        {/* Summary of Patient Admission */}
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Patient Admission</h3>
          <p className="text-sm text-gray-600">Summary of patient admissions.</p>
        </div>
        {/* Summary of Inventory Management */}
        <div className="p-4 bg-red-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Inventory Management</h3>
          <p className="text-sm text-gray-600">Overview of inventory levels and supplies.</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
