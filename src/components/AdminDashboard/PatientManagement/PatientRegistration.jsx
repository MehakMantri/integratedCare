import React, { useState } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';

function PatientRegistration({ onRegister }) {
  const { isDarkTheme } = useTheme();
  const [patient, setPatient] = useState({
    name: '',
    gender: '',
    state: '',
    phn_no: '',
    weight: '',
    age: '',
    blood_group: '',
    fathers_name: '',
    dateOfBirth: '',
    address: '',
    idProof: '',
    idNumber: '',
    preferredDate: '',
    preferredTime: '',
    reasonForVisit: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate unique patient ID
    const patientId = Date.now().toString();
    onRegister({ ...patient, patientId });
    // TODO: Send confirmation SMS
    // TODO: Print appointment slip
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow`}>
      <h2 className="text-2xl font-bold mb-4">Patient Registration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={patient.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <select
          name="gender"
          value={patient.gender}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="state"
          value={patient.state}
          onChange={handleInputChange}
          placeholder="State"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="tel"
          name="phn_no"
          value={patient.phn_no}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="number"
          name="weight"
          value={patient.weight}
          onChange={handleInputChange}
          placeholder="Weight (kg)"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="number"
          name="age"
          value={patient.age}
          onChange={handleInputChange}
          placeholder="Age"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <select
          name="blood_group"
          value={patient.blood_group}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <input
          type="text"
          name="fathers_name"
          value={patient.fathers_name}
          onChange={handleInputChange}
          placeholder="Father's Name"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="date"
          name="dateOfBirth"
          value={patient.dateOfBirth}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="text"
          name="address"
          value={patient.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <select
          name="idProof"
          value={patient.idProof}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        >
          <option value="">Select ID Proof</option>
          <option value="aadhar">Aadhar</option>
          <option value="passport">Passport</option>
          <option value="driving_license">Driving License</option>
        </select>
        <input
          type="text"
          name="idNumber"
          value={patient.idNumber}
          onChange={handleInputChange}
          placeholder="ID Number"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="date"
          name="preferredDate"
          value={patient.preferredDate}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <input
          type="time"
          name="preferredTime"
          value={patient.preferredTime}
          onChange={handleInputChange}
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}
        />
        <textarea
          name="reasonForVisit"
          value={patient.reasonForVisit}
          onChange={handleInputChange}
          placeholder="Reason for Visit"
          required
          className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} col-span-2`}
        ></textarea>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Register and Book Appointment
      </button>
    </form>
  );
}

export default PatientRegistration;