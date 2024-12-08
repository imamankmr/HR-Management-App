const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
