import React from 'react';

function MedicalRecords() {
  const records = [
    { id: 1, date: '2024-05-01', type: 'General Checkup', doctor: 'Dr. Smith', notes: 'Patient in good health.' },
    { id: 2, date: '2024-04-15', type: 'Blood Test', doctor: 'Dr. Johnson', notes: 'All levels normal.' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Medical Records</h2>
      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold">{record.date} - {record.type}</p>
            <p>Doctor: {record.doctor}</p>
            <p>Notes: {record.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecords;