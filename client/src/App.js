import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch employees
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));

    // Fetch projects
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch project assignments
    axios.get('http://localhost:5000/api/projectAssignments')
      .then(response => setAssignments(response.data))
      .catch(error => console.error('Error fetching project assignments:', error));
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="App">
      <h1>Employee, Project, and Assignment Information</h1>

      <h2>Employees</h2>
      <ul>
        {employees.length > 0 ? (
          employees.map(employee => (
            <li key={employee._id}>{employee.full_name} - {employee.email}</li>
          ))
        ) : (
          <p>No employees found</p>
        )}
      </ul>

      <h2>Projects</h2>
      <ul>
        {projects.length > 0 ? (
          projects.map(project => (
            <li key={project._id}>
              {project.project_name} - {project.project_description}
            </li>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </ul>

      <h2>Project Assignments</h2>
      <ul>
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <li key={assignment._id}>
              <strong>Employee:</strong> {assignment.employee_id.full_name} ({assignment.employee_id.email})<br />
              <strong>Project:</strong> {assignment.project_code.project_name} - {assignment.project_code.project_description}<br />
              <strong>Start Date:</strong> {new Date(assignment.start_date).toLocaleDateString()}
            </li>
          ))
        ) : (
          <p>No project assignments found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
