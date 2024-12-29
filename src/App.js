import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8080/employee/all')
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load employees');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Employee List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ul className="employee-list">
            {employees.map((employee) => (
              <li key={employee.id} className="employee-item">
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
