import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the server based on the search term
    axios.get(`http://localhost:3001/api/data?search=${searchTerm}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [searchTerm]); // Trigger the effect when the search term changes

  return (
    <div>
      <h1>Data from API</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display data */}
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <strong>{item.first_name} {item.last_name}</strong> - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
