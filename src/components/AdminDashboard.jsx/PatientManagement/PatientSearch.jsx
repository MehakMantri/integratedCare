import React, { useState } from 'react';
import { useTheme } from '../../HomePage/ThemeContext';

function PatientSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or ID"
        className={`w-full p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border`}
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
    </form>
  );
}

export default PatientSearch;
