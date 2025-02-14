import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quanaity: '',
    description: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`http://localhost:5000/products/getproduct/${productId}`);
        setProduct({
          name: data.name || '',
          price: data.price || '',
          quanaity: data.quanaity|| '',
          description: data.description || '',
          isActive: data.isActive || true,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`http://localhost:5000/products/update/${productId}`, product, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert("Product updated successfully");
      navigate("/admin/product/viewProduct"); // Redirect to the product view page
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please check your input.");
    }
  };

  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{background: 'white',color: 'black',}}>
      <h1 >Edit Product</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Quanaity:</label>
          <input
            type="text"
            name="quanaity"
            value={product.quanaity}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Active:</label>
          <select
            name="isActive"
            value={product.isActive ? 'true' : 'false'}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                isActive: e.target.value === 'true',
              }))
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
