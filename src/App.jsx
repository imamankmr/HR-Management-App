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
    // const [userRole, setUserRole] = useState(null);


  

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
    }
}, [token]);

    
    // const isHR = userRole === "HR"; // Check if the user role is HR

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/candidate" element={<Candidates />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leave" element={<Leave />} />
                <Route
                    path="/register" 
                    element={<Registration/>}

                    // element={isHR ? <Registration /> : <Navigate to="/" />}
                 />
            </Routes>
        </Router>
    );
};

export default App;
