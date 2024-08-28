import React, { useState } from 'react';

function BedAllotmentForm() {
  const [patientId, setPatientId] = useState('');
  const [bedId, setBedId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log('Submitting:', { patientId, bedId });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Bed Allotment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="patientId" className="block text-gray-700">Patient ID</label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bedId" className="block text-gray-700">Bed ID</label>
          <input
            type="text"
            id="bedId"
            value={bedId}
            onChange={(e) => setBedId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Allot Bed
        </button>
      </form>
    </div>
  );
}

export default BedAllotmentForm;
