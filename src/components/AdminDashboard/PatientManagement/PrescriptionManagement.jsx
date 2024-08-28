import React, { useState } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';

function PrescriptionManagement({ patient, onPrescribe }) {
  const { isDarkTheme } = useTheme();
  const [prescription, setPrescription] = useState({
    doctorNotes: '',
    medications: [{ name: '', dosage: '', timing: '' }],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'doctorNotes') {
      setPrescription({ ...prescription, doctorNotes: value });
    } else {
      const newMedications = [...prescription.medications];
      newMedications[index] = { ...newMedications[index], [name]: value };
      setPrescription({ ...prescription, medications: newMedications });
    }
  };

  const addMedication = () => {
    setPrescription({
      ...prescription,
      medications: [...prescription.medications, { name: '', dosage: '', timing: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPrescribe({ ...patient, prescription });
    // TODO: Print prescription
    // TODO: Update inventory
    // TODO: Send to pharmacy
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow`}>
      <h2 className="text-2xl font-bold mb-4">Prescription Management</h2>
      <textarea
        name="doctorNotes"
        value={prescription.doctorNotes}
        onChange={(e) => handleInputChange(e)}
        placeholder="Doctor's Notes"
        className={`p-2 border rounded w-full mb-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
      ></textarea>
      {prescription.medications.map((med, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
          <input
            type="text"
            name="name"
            value={med.name}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Medication Name"
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
          />
          <input
            type="text"
            name="dosage"
            value={med.dosage}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Dosage"
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
          />
          <input
            type="text"
            name="timing"
            value={med.timing}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Timing"
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
          />
        </div>
      ))}
      <button type="button" onClick={addMedication} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Medication
      </button>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Prescription
      </button>
    </form>
  );
}

export default PrescriptionManagement;