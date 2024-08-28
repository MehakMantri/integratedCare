import React, { useState } from 'react';
import { useTheme } from '../HomePage/ThemeContext';

function PatientAdmission() {
  const { isDarkTheme } = useTheme();
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 35, gender: 'Male', admissionDate: '2024-03-15', department: 'General' },
    { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', admissionDate: '2024-03-16', department: 'Cardiology' },
  ]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    admissionDate: '',
    department: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPatient.name && newPatient.age && newPatient.admissionDate && newPatient.department) {
      setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
      setNewPatient({ name: '', age: '', gender: 'Male', admissionDate: '', department: '' });
    }
  };

  return (
    <div className={`p-6 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Patient Admission</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newPatient.name}
            onChange={handleInputChange}
            placeholder="Patient Name"
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            required
          />
          <input
            type="number"
            name="age"
            value={newPatient.age}
            onChange={handleInputChange}
            placeholder="Age"
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            required
          />
          <select
            name="gender"
            value={newPatient.gender}
            onChange={handleInputChange}
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="admissionDate"
            value={newPatient.admissionDate}
            onChange={handleInputChange}
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            required
          />
          <input
            type="text"
            name="department"
            value={newPatient.department}
            onChange={handleInputChange}
            placeholder="Department"
            className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Admit Patient
        </button>
      </form>
      
      <h3 className="text-xl font-semibold mb-2">Admitted Patients</h3>
      <div className="overflow-x-auto">
        <table className={`min-w-full ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <thead>
            <tr className={isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Admission Date</th>
              <th className="px-4 py-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className={isDarkTheme ? 'border-b border-gray-600' : 'border-b'}>
                <td className="px-4 py-2">{patient.id}</td>
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.admissionDate}</td>
                <td className="px-4 py-2">{patient.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientAdmission;