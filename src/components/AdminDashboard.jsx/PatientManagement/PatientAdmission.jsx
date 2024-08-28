import React, { useState } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';

function PatientAdmission({ patient, onAdmit }) {
  const { isDarkTheme } = useTheme();
  const [admission, setAdmission] = useState({
    admissionDate: '',
    reasonForAdmission: '',
    expectedDuration: '',
    bedNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmission({ ...admission, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdmit({ ...patient, ...admission });
    // TODO: Generate admission slip
    // TODO: Update bed availability
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow`}>
      <h2 className="text-2xl font-bold mb-4">Patient Admission</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="admissionDate"
          value={admission.admissionDate}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="text"
          name="reasonForAdmission"
          value={admission.reasonForAdmission}
          onChange={handleInputChange}
          placeholder="Reason for Admission"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="number"
          name="expectedDuration"
          value={admission.expectedDuration}
          onChange={handleInputChange}
          placeholder="Expected Duration (days)"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="text"
          name="bedNumber"
          value={admission.bedNumber}
          onChange={handleInputChange}
          placeholder="Bed Number"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Admit Patient
      </button>
    </form>
  );
}

export default PatientAdmission;