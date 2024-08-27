// src/components/BedAvailability.js
import React, { useState } from 'react';

function BedAvailability() {
  const [wards, setWards] = useState([
    { id: 1, name: 'General Ward', total: 50, available: 10 },
    { id: 2, name: 'ICU', total: 20, available: 5 },
    { id: 3, name: 'Pediatric Ward', total: 30, available: 8 },
  ]);

  const updateAvailability = (id, newAvailable) => {
    setWards(wards.map(ward => 
      ward.id === id ? { ...ward, available: newAvailable } : ward
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bed Availability</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ward
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Beds
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Available Beds
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {wards.map(ward => (
              <tr key={ward.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{ward.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{ward.total}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{ward.available}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <input 
                    type="number" 
                    value={ward.available}
                    onChange={(e) => updateAvailability(ward.id, parseInt(e.target.value))}
                    className="p-2 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BedAvailability;