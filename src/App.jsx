import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Component/Pages/Login';
import Candidates from './Component/Pages/Candidates';
import Employee from './Component/Pages/Employee';
import Dashboard from './Component/Pages/Dashboard';
import Attendance from './Component/Pages/Attendance';
import Leave from './Component/Pages/Leave';
import Registration from './Component/Pages/Registration';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      const expiry = decoded.exp * 1000;
      const timeout = expiry - Date.now();

      const timer = setTimeout(() => {
        alert("Session expired");
        setToken(null);
        localStorage.removeItem("token");
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      setLoading(false); 
    }
  }, [token]);

 

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Login setToken={setToken} />} />

        <Route
          path="/candidate"
          element={token ? <Candidates /> : <Navigate to="/" />}
        />
        <Route
          path="/employee"
          element={token ? <Employee /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/attendance"
          element={token ? <Attendance /> : <Navigate to="/" />}
        />
        <Route
          path="/leave"
          element={token ? <Leave /> : <Navigate to="/" />}
        />

        
        <Route
          path="/register"
          element={
            // token ?
            // && decodeJWT(token).role === "HR" ?
             <Registration /> 
            //  : <Navigate to="/" />
            }
        />
      </Routes>
    </Router>
  );
};

export default App;

