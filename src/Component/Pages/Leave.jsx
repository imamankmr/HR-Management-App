import React, { useState } from "react";
import "./Leave.css";
import LeaveModal from "./LeaveModal";
import Navbar from "./Navbar";



const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      leaveType: "Sick Leave",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      status: "Approved",
      document: "leave_doc_1.pdf"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      leaveType: "Vacation",
      startDate: "2024-12-15",
      endDate: "2024-12-18",
      status: "Pending",
      document: "leave_doc_2.pdf"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddLeave = (newLeave) => {
    setLeaveRequests([...leaveRequests, { ...newLeave, id: leaveRequests.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((leave) =>
        leave.id === id ? { ...leave, status: newStatus } : leave
      )
    );
  };

  const filteredLeaveRequests = leaveRequests.filter((leave) => 
    leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approvedLeaves = filteredLeaveRequests.filter((leave) => leave.status === "Approved");

  return (
    <div className="leave-page">
     <Navbar/>

      <h2 className="page-title">Employee Leave Management</h2>

     
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

    
      <button className="add-leave-btn" onClick={() => setIsModalOpen(true)}>
        Add New Leave Request
      </button>

    
      <LeaveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddLeave} />

     
      <div className="leave-requests">
        <h3>Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaveRequests.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employeeName}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === "Pending" && (
                    <button onClick={() => handleStatusChange(leave.id, "Approved")}>Approve</button>
                  )}
                  {leave.status === "Approved" && (
                    <button onClick={() => handleStatusChange(leave.id, "Pending")}>Cancel</button>
                  )}
                </td>
                <td>
                  <a href={`#`} download={leave.document}>Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="calendar-section">
        <button onClick={() => alert("Show Today Approved Leaves")}>Today</button>
        <div className="calendar">
          <h3>Leave Calendar</h3>
          <div className="calendar-days">
            {approvedLeaves.map((leave) => (
              <div key={leave.id} className="calendar-day">
                {leave.startDate} to {leave.endDate} - {leave.employeeName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
