const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: './server/.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

// Import models
const Employee = require('./models/Employee');
const Project = require('./models/Project');
const ProjectAssignment = require('./models/ProjectAssignment');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Route to fetch all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// Route to fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Route to fetch all project assignments
app.get('/api/projectAssignments', async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('employee_id', 'full_name email')  // Populating employee details
      .populate('project_code', 'project_name project_description');  // Populating project details
    
    res.json(assignments);  // Send project assignments data with employee and project details
  } catch (err) {
    console.error("Error fetching project assignments:", err);  // Log error
    res.status(500).json({ message: 'Error fetching project assignments' });
  }
});

// Route to add a project
app.post('/api/projects', async (req, res) => {
  const { project_code, project_name, project_description } = req.body;

  try {
    const newProject = new Project({
      project_code,
      project_name,
      project_description,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project' });
  }
});

// Route to assign an employee to a project
app.post('/api/projectAssignments', async (req, res) => {
  const { employee_id, project_code, start_date } = req.body;

  try {
    const project = await Project.findOne({ project_code });
    const employee = await Employee.findById(employee_id);

    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const newAssignment = new ProjectAssignment({
      employee_id,
      project_code,
      start_date,
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ message: 'Error assigning employee to project' });
  }
});

// Simple test route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
