import React, { useState, useEffect } from 'react';
import { useTheme } from '../HomePage/ThemeContext';
import { FaUserPlus, FaUserMinus, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function QueueingModel() {
  const { isDarkTheme } = useTheme();
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'General Medicine',
      patients: [
        { id: 101, name: 'John Doe', priority: 'normal', waitTime: 45, arrivalTime: '09:30 AM' },
        { id: 102, name: 'Jane Smith', priority: 'high', waitTime: 15, arrivalTime: '09:45 AM' },
        { id: 103, name: 'Bob Johnson', priority: 'low', waitTime: 60, arrivalTime: '10:00 AM' },
      ]
    },
    {
      id: 2,
      name: 'Pediatrics',
      patients: [
        { id: 201, name: 'Emily Brown', priority: 'high', waitTime: 10, arrivalTime: '09:15 AM' },
        { id: 202, name: 'Michael Davis', priority: 'normal', waitTime: 30, arrivalTime: '09:30 AM' },
      ]
    },
    {
      id: 3,
      name: 'Orthopedics',
      patients: [
        { id: 301, name: 'Sarah Wilson', priority: 'normal', waitTime: 40, arrivalTime: '09:00 AM' },
        { id: 302, name: 'David Lee', priority: 'high', waitTime: 20, arrivalTime: '09:20 AM' },
        { id: 303, name: 'Lisa Taylor', priority: 'low', waitTime: 55, arrivalTime: '09:40 AM' },
      ]
    },
    {
      id: 4,
      name: 'Cardiology',
      patients: [
        { id: 401, name: 'Robert White', priority: 'high', waitTime: 5, arrivalTime: '08:45 AM' },
        { id: 402, name: 'Jennifer Green', priority: 'normal', waitTime: 35, arrivalTime: '09:10 AM' },
      ]
    },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [newPatient, setNewPatient] = useState({ name: '', priority: 'normal' });

  useEffect(() => {
    const interval = setInterval(updateWaitTimes, 60000); // Update wait times every minute
    return () => clearInterval(interval);
  }, []);

  const updateWaitTimes = () => {
    setDepartments(departments.map(dept => ({
      ...dept,
      patients: dept.patients.map(patient => ({
        ...patient,
        waitTime: Math.max(0, patient.waitTime - 1)
      }))
    })));
  };

  const addPatient = () => {
    if (newPatient.name.trim() === '') return;
    
    setDepartments(departments.map(dept =>
      dept.id === selectedDepartment
        ? {
            ...dept,
            patients: [
              ...dept.patients,
              {
                id: Date.now(),
                name: newPatient.name,
                priority: newPatient.priority,
                waitTime: estimateWaitTime(dept.patients.length, newPatient.priority),
                arrivalTime: new Date().toLocaleTimeString(),
              }
            ]
          }
        : dept
    ));
    setNewPatient({ name: '', priority: 'normal' });
  };

  const removePatient = (deptId, patientId) => {
    setDepartments(departments.map(dept =>
      dept.id === deptId
        ? { ...dept, patients: dept.patients.filter(p => p.id !== patientId) }
        : dept
    ));
  };

  const changePriority = (deptId, patientId, newPriority) => {
    setDepartments(departments.map(dept =>
      dept.id === deptId
        ? {
            ...dept,
            patients: dept.patients.map(p =>
              p.id === patientId
                ? { ...p, priority: newPriority, waitTime: estimateWaitTime(dept.patients.length, newPriority) }
                : p
            )
          }
        : dept
    ));
  };

  const estimateWaitTime = (queueLength, priority) => {
    const baseTime = queueLength * 15; // Assume 15 minutes per patient
    switch (priority) {
      case 'high': return Math.max(15, baseTime * 0.5);
      case 'low': return baseTime * 1.5;
      default: return baseTime;
    }
  };

  const getNextPatient = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    if (dept && dept.patients.length > 0) {
      const nextPatient = dept.patients.reduce((prev, current) => 
        (prev.priority === 'high' && current.priority !== 'high') || 
        (prev.priority === current.priority && prev.arrivalTime < current.arrivalTime) ? prev : current
      );
      removePatient(deptId, nextPatient.id);
    }
  };

  return (
    <div className={`p-6 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-blue-800'}`}>OPD Queuing Model</h2>
      
      <div className="mb-4">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(Number(e.target.value))}
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        >
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          placeholder="Patient Name"
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border flex-grow`}
        />
        <select
          value={newPatient.priority}
          onChange={(e) => setNewPatient({ ...newPatient, priority: e.target.value })}
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
        >
          <option value="low">Low Priority</option>
          <option value="normal">Normal Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          onClick={addPatient}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaUserPlus />
        </button>
      </div>

      {departments.map(dept => (
        <div key={dept.id} className={`mb-6 ${isDarkTheme ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded shadow`}>
          <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-blue-800'} mb-2`}>{dept.name}</h3>
          <table className="w-full">
            <thead>
              <tr className={isDarkTheme ? 'bg-gray-600' : 'bg-blue-100'}>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Priority</th>
                <th className="p-2 text-left">Wait Time</th>
                <th className="p-2 text-left">Arrival Time</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dept.patients.map(patient => (
                <tr key={patient.id} className={isDarkTheme ? 'border-b border-gray-600' : 'border-b'}>
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded ${getPriorityColor(patient.priority)}`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td className="p-2">{patient.waitTime} min</td>
                  <td className="p-2">{patient.arrivalTime}</td>
                  <td className="p-2">
                    <button
                      onClick={() => changePriority(dept.id, patient.id, 'high')}
                      className="mr-2 text-green-500 hover:text-green-600"
                      title="Increase Priority"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      onClick={() => changePriority(dept.id, patient.id, 'low')}
                      className="mr-2 text-red-500 hover:text-red-600"
                      title="Decrease Priority"
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      onClick={() => removePatient(dept.id, patient.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Remove Patient"
                    >
                      <FaUserMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => getNextPatient(dept.id)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Call Next Patient
          </button>
        </div>
      ))}
    </div>
  );
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return 'bg-red-200 text-red-800';
    case 'low': return 'bg-green-200 text-green-800';
    default: return 'bg-yellow-200 text-yellow-800';
  }
}

export default QueueingModel;
