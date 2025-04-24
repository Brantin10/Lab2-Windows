const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file (ensure path is correct)
dotenv.config({ path: './server/.env' });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

// Log the CONNECTION_URL to ensure it's being loaded correctly
console.log('MongoDB Connection URL:', CONNECTION_URL);  // Add this log for debugging

// Import the Employee model (ensure the path is correct)
const Employee = require('./models/Employee');

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
  console.log("Received request to fetch employees...");  // Debugging log
  try {
    const employees = await Employee.find();  // Fetch all employees from MongoDB
    console.log(employees);  // Log the fetched employees for debugging
    res.json(employees);  // Send the employees data as JSON response
  } catch (err) {
    console.error("Error fetching employees:", err);  // Log the error in case of failure
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// Simple test route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
