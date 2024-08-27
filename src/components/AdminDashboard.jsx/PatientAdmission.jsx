// src/components/PatientAdmission.js
import React, { useState } from 'react';

function PatientAdmission() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    ward: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatients([...patients, { ...newPatient, id: Date.now() }]);
    setNewPatient({ name: '', age: '', gender: '', ward: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patient Admission</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newPatient.name}
            onChange={handleInputChange}
            placeholder="Patient Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="age"
            value={newPatient.age}
            onChange={handleInputChange}
            placeholder="Age"
            className="p-2 border rounded"
            required
          />
          <select
            name="gender"
            value={newPatient.gender}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="ward"
            value={newPatient.ward}
            onChange={handleInputChange}
            placeholder="Ward"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Admit Patient
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ward
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.age}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.gender}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.ward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientAdmission;