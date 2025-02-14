import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Dashboard.css'; 
import axiosInstance from '../../utils/axiosConfig'; // Import axiosInstance

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        avgTimeSpend: 0,
        totalProducts: 0,
        totalCategory: 0,
    });

    const [error, setError] = useState(null); // For error handling
    const location = useLocation();
    const navigate = useNavigate();

    
    // Fetch metrics data
    const fetchMetrics = async () => {
        try {
            const [userResponse, avgTimeResponse, productResponse, categoryResponse] = await Promise.all([
                axiosInstance.get("http://localhost:5000/admin/totalUser", ),
                axiosInstance.get("http://localhost:5000/admin/avgTimeSpend", ),
                axiosInstance.get("http://localhost:5000/products/getproduct", ),
                axiosInstance.get("http://localhost:5000/category/get-category", ),
            ]);

            setMetrics({
                totalUsers: userResponse.data.totalUser || 0,
                avgTimeSpend: avgTimeResponse.data.avgTimeSpend || 0,
                totalProducts: productResponse.data.length || 0,
                totalCategory: categoryResponse.data.length || 0,
            });

            setError(null); // Clear previous errors
        } catch (err) {
            console.error("Error fetching metrics:", err);
            setError    ("Failed to fetch metrics. Please check your network or authentication.");
            setMetrics({
                totalUsers: 0,
                avgTimeSpend: 0,
                totalProducts: 0,
                totalCategory: 0,
            });
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);
    const handleLogout = () => {
        // Clear authentication token or session
        localStorage.removeItem('token'); // Adjust based on your storage
        navigate('/admin/login'); // Redirect to the login page
    };



    const handleViewStore = () => {
        navigate('/store'); // Navigate to the store page
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>
                <div className="sidebar-menu">
                    <Link to="/admin/getUser" className={location.pathname === '/admin/getUser' ? 'active' : ''}>
                        <span>Users</span>
                    </Link>
                    
                    <Link to="/admin/product/viewProduct" className={location.pathname === '/admin/product/viewProduct' ? 'active' : ''}>
                        <span>Products</span>
                    </Link>
                    <Link to="/admin/product/viewCategory" className={location.pathname === '/admin/product/viewCategory' ? 'active' : ''}>
                        <span>Categories</span>
                    </Link>
                    <Link to="/admin/avgTimeSpend" className={location.pathname === '/admin/avgTimeSpend' ? 'active' : ''}>
                        <span>Time Analytics</span>
                    </Link>
                    <Link to="/admin/product/addBanner" className={location.pathname === '/admin/getUser' ? 'active' : ''}>
                        <span>Add Banner</span>
                    </Link>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Main Dashboard */}
            <div className="dashboard">
                {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

                <div className="metric">
                    <Link to="/admin/getUser">
                        <h3>Total Users</h3>
                        <p>{metrics.totalUsers}</p>
                    </Link>
                </div>
                <div className="metric">
                    <h3>Average Time Spent</h3>
                    <p>{metrics.avgTimeSpend} minutes</p>
                </div>
                <div className="metric">
                    <Link to="/admin/product/viewProduct">
                        <h3>Total Products</h3>
                        <p>{metrics.totalProducts}</p>
                    </Link>
                </div>
                <div className="metric">
                    <Link to="/admin/product/viewCategory">
                        <h3>Total Categories</h3>
                        <p>{metrics.totalCategory}</p>
                    </Link>
                </div>
            </div>

            {/* View Store Button */}
            <button className="view-store-button" onClick={handleViewStore}>
                View Store
            </button>
        </div>
    );
};

export default AdminDashboard;
