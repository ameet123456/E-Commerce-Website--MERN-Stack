import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";
function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
    if (error) setError(null); // Clear error on typing
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (error) setError(null); // Clear error on typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (error) setError(null); // Clear error on typing
  };

  const handleSignup = async () => {
    if (!fullname || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          fullname: fullname,
          email: email,
          password: password,
        }
      );
      setSuccess("Signup successful! You can now log in.");
      alert("Signup successful! You can now log in.");
      setFullname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create a New Account</h1>
      <div className="form">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
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
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
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
            placeholder="Enter Password"
          />
        </div>
        <button className="button" onClick={handleSignup}>
          Signup
        </button>
        <div className="links">
          <Link to="/login" className="link">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
