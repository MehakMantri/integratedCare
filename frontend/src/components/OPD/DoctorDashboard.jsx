import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorDashboard() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      const response = await axios.get('/api/queue');
      setQueue(response.data);
    };
    fetchQueue();
    const interval = setInterval(fetchQueue, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <ul>
        {queue.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
