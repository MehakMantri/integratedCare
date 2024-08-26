import React from 'react';

function QueueStatus() {
  const queueInfo = {
    department: 'Cardiology',
    currentNumber: 15,
    yourNumber: 18,
    estimatedWaitTime: '20 minutes',
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Queue Status</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-2">Department: <span className="font-semibold">{queueInfo.department}</span></p>
        <p className="text-lg mb-2">Current Number: <span className="font-semibold">{queueInfo.currentNumber}</span></p>
        <p className="text-lg mb-2">Your Number: <span className="font-semibold">{queueInfo.yourNumber}</span></p>
        <p className="text-lg mb-2">Estimated Wait Time: <span className="font-semibold">{queueInfo.estimatedWaitTime}</span></p>
      </div>
    </div>
  );
}

export default QueueStatus;