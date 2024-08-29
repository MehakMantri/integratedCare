import React, { useState } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';

function PatientProfile({ patient, onUpdate }) {
  const { isDarkTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedPatient);
    setIsEditing(false);
  };

  return (
    <div className={`p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow`}>
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Add form fields similar to PatientRegistration */}
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Contact Number:</strong> {patient.contactNumber}</p>
          <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}
      {/* Add sections for Medical History, Appointment History, and Document Uploads */}
    </div>
  );
}

export default PatientProfile;