import React, { useEffect } from 'react';
import axios from 'axios';

const QueueList = ({ patients, setPatients }) => {
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
    };

    return (
        <div className="queue-list">
            <h2>Current Queue</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.name} - {patient.priority === 0 ? 'Priority' : 'Normal'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QueueList;
