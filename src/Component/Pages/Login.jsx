import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", values);
      setToken(data.token); 
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Login error:", error); 
      if (error.response && error.response.data) {
        setFieldError("general", error.response.data.message || "Invalid email or password");
      } else {
        setFieldError("general", "Unable to connect to the server. Please try again later.");
      }
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form className="login-form">
          
            {errors.general && <div className="form-error general-error">{errors.general}</div>}

         
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>

          
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <div className="password-input-container">
                <Field
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-input"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="password-toggle-icon"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>

            <button type="submit" className="login-button" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner"></span> : "Login"}
            </button>

           
            <div className="login-links">
              <p>
                Forgot password? <NavLink to="/reset" className="link">Reset Password</NavLink>
              </p>
              <p>
                Don't have an account? <NavLink to="/register" className="link">Register</NavLink>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
