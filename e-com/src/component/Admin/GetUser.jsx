import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/axiosConfig';
import "./view.css";

const GetUser = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/users/getUser");
      setUsers(response.data); // Set the user data in the state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user data"); // Set error message
      setLoading(false);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <div className="header">
        <h1>Users</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>FULLNAME</th>
                <th>EMAIL</th>
                <th>TOTAL TIME SPENT (mins)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-name">{user.fullname}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.totalTimeSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetUser;