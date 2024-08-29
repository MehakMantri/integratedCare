import React from 'react';

const QueueManagement = ({ queue, onNextPatient }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Queue Management</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNextPatient}
      >
        Next Patient
      </button>
    </div>
  );
};

export default QueueManagement;