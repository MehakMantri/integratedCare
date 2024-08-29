import React from 'react';
import { ClockIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Patient Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Next Appointment"
          content="Dr. Smith - 15 May, 2:30 PM"
          icon={<CalendarIcon className="h-8 w-8 text-blue-500" />}
        />
        <DashboardCard
          title="Recent Visit"
          content="General Checkup - 1 May, 2024"
          icon={<ClockIcon className="h-8 w-8 text-green-500" />}
        />
        <DashboardCard
          title="Pending Bills"
          content="$150 - Due 20 May, 2024"
          icon={<DocumentTextIcon className="h-8 w-8 text-red-500" />}
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, content, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}

export default Dashboard;