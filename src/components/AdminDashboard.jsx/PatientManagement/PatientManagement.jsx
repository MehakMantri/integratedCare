import React, { useState, useEffect } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';
import PatientRegistration from './PatientRegistration';
import PatientSearch from './PatientSearch';
import PatientProfile from './PatientProfile';
import PatientAdmission from './PatientAdmission';
import AppointmentScheduling from './AppointmentScheduling';
import { FaUserPlus, FaSearch, FaUserEdit, FaBed, FaCalendarAlt } from 'react-icons/fa';

function PatientManagement() {
  const { isDarkTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('search');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch patients from API or load from local storage
    // This is a mock implementation
    const mockPatients = [
      { id: 1, name: 'John Doe', age: 35, gender: 'Male', bloodGroup: 'A+' },
      { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', bloodGroup: 'O-' },
      // ... more mock patients
    ];
    setPatients(mockPatients);
  }, []);

  const handleRegister = (newPatient) => {
    // In a real app, you'd send this to your backend API
    const patientWithId = { ...newPatient, id: patients.length + 1 };
    setPatients([...patients, patientWithId]);
    alert('Patient registered successfully!');
  };

  const handleSearch = (searchTerm) => {
    const results = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('profile');
  };

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    setSelectedPatient(updatedPatient);
    alert('Patient information updated successfully!');
  };

  const handleAdmission = (admissionDetails) => {
    // In a real app, you'd update the backend and maybe create an admission record
    console.log('Admission details:', admissionDetails);
    alert('Patient admitted successfully!');
  };

  const handleAppointment = (appointmentDetails) => {
    // In a real app, you'd save this to your appointments database
    console.log('Appointment scheduled:', appointmentDetails);
    alert('Appointment scheduled successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'register':
        return <PatientRegistration onRegister={handleRegister} />;
      case 'search':
        return (
          <div>
            <PatientSearch onSearch={handleSearch} />
            <div className="mt-4">
              {searchResults.map(patient => (
                <div 
                  key={patient.id} 
                  className={`p-2 mb-2 rounded cursor-pointer ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => handlePatientSelect(patient)}
                >
                  {patient.name} (ID: {patient.id})
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return selectedPatient ? (
          <PatientProfile patient={selectedPatient} onUpdate={handleUpdatePatient} />
        ) : (
          <div>Please select a patient from the search results.</div>
        );
      case 'admission':
        return selectedPatient ? (
          <PatientAdmission patient={selectedPatient} onAdmit={handleAdmission} />
        ) : (
          <div>Please select a patient first.</div>
        );
      case 'appointment':
        return selectedPatient ? (
          <AppointmentScheduling patient={selectedPatient} onSchedule={handleAppointment} />
        ) : (
          <div>Please select a patient first.</div>
        );
      default:
        return <div>Select an option from above.</div>;
    }
  };

  return (
    <div className={`p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>
      <div className="flex mb-4 space-x-2">
        <TabButton icon={<FaUserPlus />} label="Register" onClick={() => setActiveTab('register')} isActive={activeTab === 'register'} />
        <TabButton icon={<FaSearch />} label="Search" onClick={() => setActiveTab('search')} isActive={activeTab === 'search'} />
        <TabButton icon={<FaUserEdit />} label="Profile" onClick={() => setActiveTab('profile')} isActive={activeTab === 'profile'} />
        <TabButton icon={<FaBed />} label="Admission" onClick={() => setActiveTab('admission')} isActive={activeTab === 'admission'} />
        <TabButton icon={<FaCalendarAlt />} label="Appointment" onClick={() => setActiveTab('appointment')} isActive={activeTab === 'appointment'} />
      </div>
      {renderTabContent()}
    </div>
  );
}

function TabButton({ icon, label, onClick, isActive }) {
  const { isDarkTheme } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded ${
        isActive
          ? isDarkTheme
            ? 'bg-blue-600 text-white'
            : 'bg-blue-500 text-white'
          : isDarkTheme
          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
}

export default PatientManagement;