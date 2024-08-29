import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplaySystem() {
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    const fetchCurrentPatient = async () => {
      const response = await axios.get('/api/current-patient');
      setCurrentPatient(response.data);
    };
    fetchCurrentPatient();
    const interval = setInterval(fetchCurrentPatient, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Now Serving</h1>
      {currentPatient && <h2>{currentPatient.name}</h2>}
    </div>
  );
}

export default DisplaySystem;