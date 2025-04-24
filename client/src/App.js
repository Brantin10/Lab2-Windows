import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch data from backend API (note the updated endpoint)
    axios.get('http://localhost:5000/employees')  // Make sure the route is correct
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Employee List</h1>
      <ul>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          employees.map(employee => (
            <li key={employee._id}>
              {employee.full_name} - {employee.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
