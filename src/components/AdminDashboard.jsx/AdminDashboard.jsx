
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import QueueingModel from './QueueingModel';
import BedAvailability from './BedAvailability';
import PatientAdmission from './PatientAdmission';
import InventoryManagement from './InventoryManagement';

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('queuing');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'queuing':
        return <QueueingModel />;
      case 'beds':
        return <BedAvailability />;
      case 'admission':
        return <PatientAdmission />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return <QueueingModel />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Hospital Admin Dashboard</h1>
          </div>
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

export default AdminDashboard;
