const mongoose = require('mongoose');

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true,
  },
  project_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
});

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);

module.exports = ProjectAssignment;
