// src/components/BedAvailability.js
import React, { useState, useEffect } from 'react';
import { useTheme } from '../HomePage/ThemeContext';
import { FaBed, FaUserPlus, FaUserMinus, FaExclamationTriangle } from 'react-icons/fa';

function BedAvailability() {
  const { isDarkTheme } = useTheme();
  const [wards, setWards] = useState([
    {
      id: 1,
      name: 'General Ward',
      beds: [
        { id: 101, type: 'General', status: 'Available', patient: null },
        { id: 102, type: 'General', status: 'Occupied', patient: 'John Doe' },
        { id: 103, type: 'General', status: 'Available', patient: null },
        { id: 104, type: 'General', status: 'Maintenance', patient: null },
        { id: 105, type: 'General', status: 'Occupied', patient: 'Jane Smith' },
      ]
    },
    {
      id: 2,
      name: 'ICU',
      beds: [
        { id: 201, type: 'ICU', status: 'Available', patient: null },
        { id: 202, type: 'ICU', status: 'Occupied', patient: 'Robert Johnson' },
        { id: 203, type: 'ICU', status: 'Available', patient: null },
      ]
    },
    {
      id: 3,
      name: 'Pediatric Ward',
      beds: [
        { id: 301, type: 'Pediatric', status: 'Occupied', patient: 'Emily Brown' },
        { id: 302, type: 'Pediatric', status: 'Available', patient: null },
        { id: 303, type: 'Pediatric', status: 'Available', patient: null },
        { id: 304, type: 'Pediatric', status: 'Occupied', patient: 'Michael Davis' },
      ]
    },
    {
      id: 4,
      name: 'Maternity Ward',
      beds: [
        { id: 401, type: 'Maternity', status: 'Available', patient: null },
        { id: 402, type: 'Maternity', status: 'Occupied', patient: 'Sarah Wilson' },
        { id: 403, type: 'Maternity', status: 'Available', patient: null },
      ]
    },
  ]);

  const [selectedWard, setSelectedWard] = useState(1);
  const [newPatient, setNewPatient] = useState('');

  useEffect(() => {
    const interval = setInterval(updateBedStatus, 300000); // Update bed status every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const updateBedStatus = () => {
    // In a real application, this would fetch the latest bed status from the server
    console.log('Updating bed status...');
  };

  const allocateBed = (wardId, bedId) => {
    if (newPatient.trim() === '') return;

    setWards(wards.map(ward => 
      ward.id === wardId
        ? {
            ...ward,
            beds: ward.beds.map(bed => 
              bed.id === bedId
                ? { ...bed, status: 'Occupied', patient: newPatient }
                : bed
            )
          }
        : ward
    ));
    setNewPatient('');
  };

  const dischargeBed = (wardId, bedId) => {
    setWards(wards.map(ward => 
      ward.id === wardId
        ? {
            ...ward,
            beds: ward.beds.map(bed => 
              bed.id === bedId
                ? { ...bed, status: 'Available', patient: null }
                : bed
            )
          }
        : ward
    ));
  };

  const getWardStats = (ward) => {
    const total = ward.beds.length;
    const available = ward.beds.filter(bed => bed.status === 'Available').length;
    const occupied = ward.beds.filter(bed => bed.status === 'Occupied').length;
    const maintenance = ward.beds.filter(bed => bed.status === 'Maintenance').length;
    return { total, available, occupied, maintenance };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-200 text-green-800';
      case 'Occupied': return 'bg-red-200 text-red-800';
      case 'Maintenance': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`p-6 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>Bed Availability</h2>
      
      <div className="mb-4">
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(Number(e.target.value))}
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        >
          {wards.map(ward => (
            <option key={ward.id} value={ward.id}>{ward.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {wards.map(ward => {
          const stats = getWardStats(ward);
          return (
            <div key={ward.id} className={`p-4 rounded shadow ${isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'} mb-2`}>{ward.name}</h3>
              <p>Total Beds: {stats.total}</p>
              <p>Available: {stats.available}</p>
              <p>Occupied: {stats.occupied}</p>
              <p>Maintenance: {stats.maintenance}</p>
              {stats.available === 0 && (
                <p className="text-red-500 flex items-center mt-2">
                  <FaExclamationTriangle className="mr-2" /> No beds available
                </p>
              )}
            </div>
          );
        })}
      </div>

      {wards.map(ward => ward.id === selectedWard && (
        <div key={ward.id} className={`mb-6 ${isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded shadow`}>
          <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'} mb-2`}>{ward.name} - Bed Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ward.beds.map(bed => (
              <div key={bed.id} className={`p-4 rounded shadow ${isDarkTheme ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Bed {bed.id}</span>
                  <FaBed className={bed.status === 'Available' ? 'text-green-500' : 'text-red-500'} />
                </div>
                <p>Type: {bed.type}</p>
                <p className={`${getStatusColor(bed.status)} px-2 py-1 rounded text-sm inline-block mb-2`}>
                  {bed.status}
                </p>
                {bed.patient && <p>Patient: {bed.patient}</p>}
                {bed.status === 'Available' ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newPatient}
                      onChange={(e) => setNewPatient(e.target.value)}
                      placeholder="Patient Name"
                      className={`p-1 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border w-full mb-2`}
                    />
                    <button
                      onClick={() => allocateBed(ward.id, bed.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 w-full flex items-center justify-center"
                    >
                      <FaUserPlus className="mr-1" /> Allocate
                    </button>
                  </div>
                ) : bed.status === 'Occupied' ? (
                  <button
                    onClick={() => dischargeBed(ward.id, bed.id)}
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full flex items-center justify-center"
                  >
                    <FaUserMinus className="mr-1" /> Discharge
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BedAvailability;