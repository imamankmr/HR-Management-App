import React, { useState } from "react";
import "./Attendance.css"; 
import Navbar from "./Navbar";

const Attendance = () => {
  const [employees, setEmployees] = useState([
   
  ]);

  // Handle attendance status change
  const handleStatusChange = (id, event) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, status: event.target.value } : employee
    );
    setEmployees(updatedEmployees);
  };

  // Handle task assignment change
  const handleTaskChange = (id, event) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, task: event.target.value } : employee
    );
    setEmployees(updatedEmployees);
  };

  // Submit the attendance and tasks (logging for now)
  const handleSubmit = () => {
    console.log("Submitted Data:", employees);
  };

  return (
    <div className="attendance-page">
      <Navbar/>
      <h1>Attendance Management</h1>

    
      <div className="attendance-list">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Attendance Status</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <select
                    value={employee.status}
                    onChange={(e) => handleStatusChange(employee.id, e)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Work From Home">Work From Home</option>
                    <option value="Leave">Leave</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Assign task"
                    value={employee.task}
                    onChange={(e) => handleTaskChange(employee.id, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <div className="submit-btn">
        <button onClick={handleSubmit}>Submit Attendance & Tasks</button>
      </div>
    </div>
  );
};

export default Attendance;
