import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Employee.css"; // Importing the CSS file
import Navbar from "./Navbar";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    email: "",
    department: "",
    role: "",
    phone: "",
  });
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form changes for updating employee
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Handle form submission for adding employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/employees", newEmployee);

      setEmployees([...employees, response.data]);
      setShowModal(false);
      setNewEmployee({
        fullName: "",
        email: "",
        department: "",
        role: "",
        phone: "",

       
      });
      console.log("successfully saved")
    } catch (err) {
      console.error("Error adding employee", err);
    }
  };

  // Handle update employee
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/employees/${employeeToUpdate.id}`,
        employeeToUpdate
      );
      const updatedEmployees = employees.map((employee) =>
        employee.id === employeeToUpdate.id ? response.data : employee
      );
      setEmployees(updatedEmployees);
      setShowUpdateModal(false);
      setEmployeeToUpdate(null);
    } catch (err) {
      console.error("Error updating employee", err);
    }
  };

  // Handle delete employee
  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${employeeId}`);
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  // Filter employees based on search 
  const filteredEmployees = employees.filter((employee) => {
    const fullName = employee.fullName || ""; 
    const department = employee.department || "";
    const role = employee.role || "";
    const email = employee.email || "";
    const phone = employee.phone || "";
  
    return (
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      department.toLowerCase().includes(search.toLowerCase()) ||
      role.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      phone.includes(search)
    );
  });
  
  return (
    <div className="employee-page">
      <Navbar/>
      <h1 className="title">Employee Management</h1>

    
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          placeholder="Search employees by name, department, role, or email"
        />
      </div>

     
      <button className="add-button" onClick={() => setShowModal(true)}>
        Add Employee
      </button>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>
                <select
                  value={employee.role}
                  onChange={(e) => handleRoleChange(e, employee.id)}
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => {
                    setEmployeeToUpdate(employee);
                    setShowUpdateModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Employee</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={newEmployee.fullName}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleChange}
                required
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={newEmployee.phone}
                onChange={handleChange}
                required
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={newEmployee.department}
                onChange={handleChange}
                required
              />
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={newEmployee.role}
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-button">
                Add Employee
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

   
      {showUpdateModal && employeeToUpdate && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Employee</h3>
            <form onSubmit={handleUpdate} className="modal-form">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={employeeToUpdate.fullName}
                onChange={(e) =>
                  setEmployeeToUpdate({
                    ...employeeToUpdate,
                    fullName: e.target.value,
                  })
                }
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={employeeToUpdate.email}
                onChange={(e) =>
                  setEmployeeToUpdate({
                    ...employeeToUpdate,
                    email: e.target.value,
                  })
                }
                required
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={employeeToUpdate.phone}
                onChange={(e) =>
                  setEmployeeToUpdate({
                    ...employeeToUpdate,
                    phone: e.target.value,
                  })
                }
                required
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={employeeToUpdate.department}
                onChange={(e) =>
                  setEmployeeToUpdate({
                    ...employeeToUpdate,
                    department: e.target.value,
                  })
                }
                required
              />
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={employeeToUpdate.role}
                onChange={(e) =>
                  setEmployeeToUpdate({ ...employeeToUpdate, role: e.target.value })
                }
                required
              />
              <button type="submit" className="submit-button">
                Update Employee
              </button>
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
