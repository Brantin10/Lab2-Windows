const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); // Adjust if needed

const Employee = require('./models/Employee');
const Project = require('./models/Project');
const ProjectAssignment = require('./models/ProjectAssignment');

// MongoDB connection string
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');

  // Sample Employees
  const employees = [
    { full_name: 'John Doe', email: 'john.doe@example.com', hashed_password: 'hashed_password1' },
    { full_name: 'Jane Smith', email: 'jane.smith@example.com', hashed_password: 'hashed_password2' },
    { full_name: 'Mike Johnson', email: 'mike.johnson@example.com', hashed_password: 'hashed_password3' },
    { full_name: 'Sarah Lee', email: 'sarah.lee@example.com', hashed_password: 'hashed_password4' },
    { full_name: 'David Kim', email: 'david.kim@example.com', hashed_password: 'hashed_password5' }
  ];

  // Sample Projects
  const projects = [
    { project_code: 'P001', project_name: 'Project A', project_description: 'Description of Project A' },
    { project_code: 'P002', project_name: 'Project B', project_description: 'Description of Project B' },
    { project_code: 'P003', project_name: 'Project C', project_description: 'Description of Project C' },
  ];

  // Sample ProjectAssignments (mapping employees to projects)
  const projectAssignments = [
    { employee_id: '1', project_code: 'P001', start_date: new Date() },
    { employee_id: '2', project_code: 'P002', start_date: new Date() },
    { employee_id: '3', project_code: 'P003', start_date: new Date() },
  ];

  // Insert Sample Data into MongoDB
  Employee.insertMany(employees)
    .then(() => {
      console.log('Inserted Employees');
      return Project.insertMany(projects);
    })
    .then(() => {
      console.log('Inserted Projects');
      return ProjectAssignment.insertMany(projectAssignments);
    })
    .then(() => {
      console.log('Inserted Project Assignments');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error inserting data:', err);
    });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
