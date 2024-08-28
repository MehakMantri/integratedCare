import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import QueueingModel from './QueueingModel';
import BedAvailability from './BedAvailability';
import InventoryManagement from './InventoryManagement';
import PatientManagement from './PatientManagement/PatientManagement';
import { useTheme } from '../HomePage/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUserInjured, FaBed, FaClipboardList, FaUserMd } from 'react-icons/fa';

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const { isDarkTheme } = useTheme();
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 0,
    availableBeds: 0,
    totalAppointments: 0,
    totalDoctors: 0,
    recentAdmissions: [],
    departmentStats: [],
    inventoryAlerts: [],
  });

  useEffect(() => {
    // Simulating API call to fetch dashboard data
    const fetchDashboardData = async () => {
      // In a real application, this would be an API call
      const data = {
        totalPatients: 1250,
        availableBeds: 45,
        totalAppointments: 78,
        totalDoctors: 32,
        recentAdmissions: [
          { id: 1, name: 'John Doe', department: 'Cardiology', date: '2024-03-20' },
          { id: 2, name: 'Jane Smith', department: 'Neurology', date: '2024-03-19' },
          { id: 3, name: 'Bob Johnson', department: 'Orthopedics', date: '2024-03-18' },
        ],
        departmentStats: [
          { name: 'Cardiology', patients: 300 },
          { name: 'Neurology', patients: 200 },
          { name: 'Orthopedics', patients: 250 },
          { name: 'Pediatrics', patients: 180 },
          { name: 'Oncology', patients: 120 },
        ],
        inventoryAlerts: [
          { item: 'Surgical Masks', status: 'Low Stock', quantity: 100 },
          { item: 'Antibiotics', status: 'Expiring Soon', quantity: 500 },
          { item: 'Syringes', status: 'Reorder', quantity: 200 },
        ],
      };
      setDashboardData(data);
    };

    fetchDashboardData();
  }, []);

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <DashboardCard title="Total Patients" value={dashboardData.totalPatients} icon={<FaUserInjured />} />
      <DashboardCard title="Available Beds" value={dashboardData.availableBeds} icon={<FaBed />} />
      <DashboardCard title="Today's Appointments" value={dashboardData.totalAppointments} icon={<FaClipboardList />} />
      <DashboardCard title="Total Doctors" value={dashboardData.totalDoctors} icon={<FaUserMd />} />
      
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Department Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData.departmentStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Bed Occupancy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Occupied', value: 100 - dashboardData.availableBeds },
                { name: 'Available', value: dashboardData.availableBeds },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              <Cell fill="#82ca9d" />
              <Cell fill="#8884d8" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Recent Admissions</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentAdmissions.map((admission) => (
              <tr key={admission.id} className="border-b">
                <td className="py-2 px-4">{admission.name}</td>
                <td className="py-2 px-4">{admission.department}</td>
                <td className="py-2 px-4">{admission.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Inventory Alerts</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Item</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.inventoryAlerts.map((alert, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{alert.item}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="py-2 px-4">{alert.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return renderDashboard();
      case 'patients':
        return <PatientManagement />;
      case 'queuing':
        return <QueueingModel />;
      case 'beds':
        return <BedAvailability />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <Sidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow`}>
          {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Hospital Admin Dashboard</h1>
          </div> */}
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  const { isDarkTheme } = useTheme();
  return (
    <div className={`p-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`text-4xl ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>{icon}</div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'low stock':
      return 'bg-yellow-200 text-yellow-800';
    case 'expiring soon':
      return 'bg-orange-200 text-orange-800';
    case 'reorder':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}

export default AdminDashboard;
