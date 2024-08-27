// src/components/QueueingModel.js
import React, { useState } from 'react';

function QueueingModel() {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Emergency', waitTime: 15 },
    { id: 2, name: 'Cardiology', waitTime: 30 },
    { id: 3, name: 'Pediatrics', waitTime: 20 },
  ]);

  const updateWaitTime = (id, newTime) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, waitTime: newTime } : dept
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">OPD Queuing Models</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{dept.name}</h3>
            <p>Current Wait Time: {dept.waitTime} minutes</p>
            <input 
              type="number" 
              value={dept.waitTime}
              onChange={(e) => updateWaitTime(dept.id, parseInt(e.target.value))}
              className="mt-2 p-2 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default QueueingModel;