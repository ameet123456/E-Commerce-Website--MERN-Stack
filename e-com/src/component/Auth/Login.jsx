import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";

function Login() {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
    if (error) setError(null); // Clear error on typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (error) setError(null); // Clear error on typing
  };

  const handleLogin = async () => {
    if (!fullname || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        fullname,
        password,
      });

      const { token } = response.data;
      sessionStorage.setItem("token", token); // Use sessionStorage instead of localStorage
      setError("Login successful");
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome back</h1>
      <div className="form">
        {error && <div className="error">{error}</div>}
        <div className="input-group">
          <label htmlFor="fullname" className="label">
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            className="input"
            value={fullname}
            onChange={handleFullnameChange}
            placeholder="Enter Fullname"
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
          <input type="checkbox" id="keepLoggedIn" className="login-checkbox" />
          <label htmlFor="keepLoggedIn" className="label">
            Keep me logged in
          </label>
        </div>
        <button className="button" onClick={handleLogin}>
          Log in
        </button>
        <div className="links">
          <Link to="/forgot-password" className="link">
            Forgot your password?
          </Link>
          <Link to="/signup" className="link">
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
