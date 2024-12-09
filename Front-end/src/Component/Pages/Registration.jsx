import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Registration.css";
import config from "../../../config";

const Registration = () => {
 

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });


  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form data:", values); 

    try {
      const response = await axios.post( `${config.API_BASE_URL}/api/auth/register`, values);
      console.log("Response from server:", response.data); 
      alert(response.data.message || "User registered successfully!"); 
      resetForm(); 
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user");
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
           
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="form-input"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="form-error" />
            </div>

       
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>

           
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-container">
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
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

          
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="password-input-container">
                <Field
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className="password-toggle-icon"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="form-error" />
            </div>

          
            <div className="form-actions">
              <button type="submit" className="register-button" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <p className="login-link">
                Already have an account?{" "}
                <NavLink to="/" className="link">
                  Log in
                </NavLink>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
