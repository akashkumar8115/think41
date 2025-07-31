const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
