import React from 'react';
import { useTheme } from '../HomePage/ThemeContext';

function DashboardSummary() {
  const { isDarkTheme } = useTheme();

  const summaryItems = [
    { title: 'Queueing Model', description: 'Overview of current queue statistics.', bgColor: isDarkTheme ? 'bg-blue-800' : 'bg-blue-100' },
    { title: 'Bed Availability', description: 'Current status of bed availability.', bgColor: isDarkTheme ? 'bg-green-800' : 'bg-green-100' },
    { title: 'Patient Admission', description: 'Summary of patient admissions.', bgColor: isDarkTheme ? 'bg-yellow-800' : 'bg-yellow-100' },
    { title: 'Inventory Management', description: 'Overview of inventory levels and supplies.', bgColor: isDarkTheme ? 'bg-red-800' : 'bg-red-100' },
  ];

  return (
    <div className={`p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Dashboard Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryItems.map((item, index) => (
          <div key={index} className={`p-4 ${item.bgColor} rounded-lg shadow`}>
            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSummary;
