import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffPortal() {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [consumables, setConsumables] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    admission_date: '',
    discharge_date: '',
  });
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    quantity: '',
    cost: '',
  });
  const [newConsumable, setNewConsumable] = useState({
    name: '',
    quantity: '',
    cost: '',
  });

  useEffect(() => {
    fetchPatients();
    fetchMedicines();
    fetchConsumables();
  }, []);

  const fetchPatients = async () => {
    const response = await axios.get('/api/patients');
    setPatients(response.data);
  };

  const fetchMedicines = async () => {
    const response = await axios.get('/api/medicines');
    setMedicines(response.data);
  };

  const fetchConsumables = async () => {
    const response = await axios.get('/api/consumables');
    setConsumables(response.data);
  };

  const addPatient = async () => {
    await axios.post('/api/patients', newPatient);
    setNewPatient({ name: '', age: '', admission_date: '', discharge_date: '' });
    fetchPatients();
  };

  const addMedicine = async () => {
    await axios.post('/api/medicines', newMedicine);
    setNewMedicine({ name: '', quantity: '', cost: '' });
    fetchMedicines();
  };

  const addConsumable = async () => {
    await axios.post('/api/consumables', newConsumable);
    setNewConsumable({ name: '', quantity: '', cost: '' });
    fetchConsumables();
  };

  return (
    <div>
      <h1>Hospital Staff Portal</h1>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.patient_id}>
            {patient.name} ({patient.age}) - Admitted: {patient.admission_date}, Discharged: {patient.discharge_date}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={newPatient.name}
        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newPatient.age}
        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Admission Date"
        value={newPatient.admission_date}
        onChange={(e) => setNewPatient({ ...newPatient, admission_date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Discharge Date"
        value={newPatient.discharge_date}
        onChange={(e) => setNewPatient({ ...newPatient, discharge_date: e.target.value })}
      />
      <button onClick={addPatient}>Add Patient</button>

      <h2>Medicines</h2>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine.medicine_id}>
            {medicine.name} - Quantity: {medicine.quantity}, Cost: {medicine.cost}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={newMedicine.name}
        onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newMedicine.quantity}
        onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cost"
        value={newMedicine.cost}
        onChange={(e) => setNewMedicine({ ...newMedicine, cost: e.target.value })}
      />
      <button onClick={addMedicine}>Add Medicine</button>

      <h2>Consumables</h2>
      <ul>
        {consumables.map((consumable) => (
          <li key={consumable.consumable_id}>
            {consumable.name} - Quantity: {consumable.quantity}, Cost: {consumable.cost}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={newConsumable.name}
        onChange={(e) => setNewConsumable({ ...newConsumable, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newConsumable.quantity}
        onChange={(e) => setNewConsumable({ ...newConsumable, quantity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cost"
        value={newConsumable.cost}
        onChange={(e) => setNewConsumable({ ...newConsumable, cost: e.target.value })}
      />
      <button onClick={addConsumable}>Add Consumable</button>
    </div>
  );
}

export default StaffPortal;