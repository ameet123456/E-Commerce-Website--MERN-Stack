import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0, 
    avgTimeSpend: 0,
    totalProducts: 0,
    totalCategory: 0,
  });

  const fetchMetrics = async () => {
    try {
      
      const userResponse = await axios.get("http://localhost:5000/admin/totalUser");
      const avgTimeResponse = await axios.get("http://localhost:5000/admin/avgTimeSpend");
      const productResponse = await axios.get("http://localhost:5000/products/getproduct");
      const categoryResponse = await axios.get("http://localhost:5000/category/get-category");

      
      setMetrics({
        totalUsers: userResponse.data.totalUser || 0,
        avgTimeSpend: avgTimeResponse.data.avgTimeSpend || 0, 
        totalProducts: productResponse.data.length || 0,
        totalCategory: categoryResponse.data.length || 0,
      });
    } catch (error) {
      console.error("Error fetching metrics", error);
      
      setMetrics({
        totalUsers: 0,
        avgTimeSpend: 0,
        totalProducts: 0,
        totalCategory: 0,
      });
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchMetrics();
  }, []);



  return (
    <div className="dashboard">
      <div className="metric">
        <h3>Total Users</h3>
        <p>{metrics.totalUsers}</p> {/* Displaying the fetched totalUsers */}
      </div>
      <div className="metric">
        <h3>Average Time Spent</h3>
        <p>{metrics.avgTimeSpend} minutes</p> {/* Displaying the fetched avgTimeSpend */}
        </div>
      <div className="metric">
        <h3>Total Products</h3>
        <p>{metrics.totalProducts}</p> {/* Displaying the fetched totalProducts */}
        </div>
    <div className="metric">
        <h3>Total Category</h3>
        <p>{metrics.totalCategory}</p> {/* Displaying the fetched totalCategory */}
      </div>
    </div>

  );
};

export default DashboardMetrics;
