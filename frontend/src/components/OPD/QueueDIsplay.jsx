import React from 'react';

const QueueDisplay = ({ queue }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Current Queue</h2>
      <ul className="list-disc pl-5">
        {queue.map((patient, index) => (
          <li key={index} className="mb-2">
            {patient.name} - {patient.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueDisplay;