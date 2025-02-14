import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { Link } from "react-router-dom";
import './view.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("http://localhost:5000/products/getproduct");
        
        // Check if the response data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array but got:", data);
          setError("Failed to load products");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        setError("Failed to load products");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusToggle = async (productId, currentStatus) => {
    try {
      const response = await axiosInstance.put(`http://localhost:5000/products/update/${productId}`, {
        isActive: !currentStatus
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setProducts(products.map(product => 
          product._id === productId 
            ? { ...product, isActive: !currentStatus }
            : product
        ));
      } else {
        throw new Error(`Server returned status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      alert(`Failed to update product status: ${error.response?.data?.message || error.message}`);
    }
  };

  const getStatusColor = (isActive) => {
    if (isActive === true) return 'active';
    if (isActive === false) return 'inactive';
    return 'loading';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <div className="header">
        <div className="header-actions">
          <h1>Product</h1>
          <button><Link to="/admin/product/addProduct" className="link">Add product</Link></button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>PRODUCTS</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>CATEGORY</th>
                <th>QL</th>
                <th>CREATED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-info">
                      {product.img && product.img[0] && (
                        <img src={product.img[0]} alt={product.name} />
                      )}
                      <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-category">
                          {product.category?.name || 'Uncategorized'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.price?.toLocaleString('en-US', { style: 'currency', currency: 'IND' })}</td>
                  <td 
                    className={`${getStatusColor(product.isActive)} clickable`}
                    onClick={() => handleStatusToggle(product._id, product.isActive)}
                  >
                    <span>{product.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td>{product.category?.name || 'No Category'}</td>
                  <td>{product.quanaity}</td>
                  <td>{formatDate(product.createdAt)}</td>
                  <td>
                    <Link to={`/admin/product/edit/${product._id}`} className="edit-button">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
