import React, { useState } from "react";
import "./Leave.css";


const LeaveModal = ({ isOpen, onClose, onSave }) => {
  const [newLeave, setNewLeave] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    document: ""
  });

  const handleLeaveChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewLeave({ ...newLeave, document: e.target.files[0].name });
  };

  const handleSave = () => {
    onSave(newLeave);
    setNewLeave({
      employeeName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      status: "Pending",
      document: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Leave Request</h3>
        <form>
          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={newLeave.employeeName}
            onChange={handleLeaveChange}
            required
          />
          <input
            type="text"
            name="leaveType"
            placeholder="Leave Type"
            value={newLeave.leaveType}
            onChange={handleLeaveChange}
            required
          />
          <input
            type="date"
            name="startDate"
            value={newLeave.startDate}
            onChange={handleLeaveChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={newLeave.endDate}
            onChange={handleLeaveChange}
            required
          />
          <input
            type="file"
            name="document"
            onChange={handleFileChange}
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="button" onClick={handleSave}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LeaveModal;