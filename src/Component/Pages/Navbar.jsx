import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 
import { CgProfile } from "react-icons/cg";
import { IoPeople, IoLogOut, IoSparklesOutline } from "react-icons/io5";
import { BsFileBarGraph } from "react-icons/bs";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
   console.log(localStorage)
    localStorage.removeItem("authToken"); 
    setShowLogoutModal(false);
    navigate("/"); 
  };

  return (
    <>
      <nav className="navbar">
        <h2>Company</h2>

       
        <div className="nav-category">
          <h3>Recruitment</h3>
          <ul>
            <li>
              <Link to="/candidate">
                <CgProfile /> Candidate
              </Link>
            </li>
          </ul>
        </div>

     
        <div className="nav-category">
          <h3>Organisation</h3>
          <ul>
            <li>
              <Link to="/employee">
                <IoPeople /> Employee
              </Link>
            </li>
            <li>
              <Link to="/attendance">
                <BsFileBarGraph /> Attendance
              </Link>
            </li>
            <li>
              <Link to="/leave">
                <IoSparklesOutline /> Leave
              </Link>
            </li>
          </ul>
        </div>

       
        <div className="logout">
          <button onClick={() => setShowLogoutModal(true)} className="logout-button">
            <IoLogOut /> Logout
          </button>
        </div>
      </nav>

      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to log out?</h3>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
