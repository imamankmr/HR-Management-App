const Employee = require("../models/Employee");

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve employees. Please try again later.",
      error: error.message,
    });
  }
};

// Add a new employee
const addEmployee = async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
      res.status(500).json({ message: "Error adding employee", error });
    }
  };
// Update an existing employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({
      message: "Employee updated successfully.",
      employee: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update employee. Please try again later.",
      error: error.message,
    });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete employee. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
