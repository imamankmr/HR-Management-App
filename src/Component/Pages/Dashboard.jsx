import React from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-section">
          <p>Welcome to the application dashboard. Use the navigation to explore features.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
