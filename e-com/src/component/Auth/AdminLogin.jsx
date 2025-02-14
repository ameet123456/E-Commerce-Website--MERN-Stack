import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./AuthForm.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (error) setError(null);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email: email,
        password: password,
      });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to the admin dashboard
      navigate("/admin/Dashbord");

      setError(null); // Clear any errors
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container-admin">
      <h1 className="title-admin">Welcome To Your Shop</h1>
      <div className="form-admin">
        {error && <div className="error">{error}</div>}
        <div className="input-group">
          <label htmlFor="Email" className="label">
            Email
          </label>
          <input
            type="text"
            id="Email"
            className="input"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
        </div>
        <div className="login-checkbox-group">
          <input
            type="checkbox"
            id="keepLoggedIn"
            className="login-checkbox"
          />
          <label htmlFor="keepLoggedIn" className="label">
            Keep me logged in
          </label>
        </div>
        <button className="button" onClick={handleLogin}>
          Log in
        </button>
        <div className="links">
          <Link to="/" className="link">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
