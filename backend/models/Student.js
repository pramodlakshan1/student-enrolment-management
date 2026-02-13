const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Enrolled', 'Dropped'] }
});

module.exports = mongoose.model('Student', studentSchema);