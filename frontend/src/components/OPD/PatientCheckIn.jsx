import React, { useState } from 'react';
import axios from 'axios';

function PatientCheckIn() {
  const [patientData, setPatientData] = useState({
    name: '',
    priority: 'normal',
    appointmentTime: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/check-in', patientData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>FOrm</div>
    // <form onSubmit={handleSubmit}>
     
    // </form>
  );
}

export default PatientCheckIn;