import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig'; // Import axiosInstance
import './ProductCategoryPage.css';
const ProductCategoryPage = () => {
  // State to hold category data
  const [categories, setCategories] = useState([]);

  // Fetch categories and products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/products/getProductByCategory');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="category-page">
      <h1>Category</h1>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category._id} className="category">
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            {category.products.length > 0 ? (
              <div className="products">
                {category.products.map((product) => (
                  <div key={product._id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Discount: {product.discount}%</p>
                    <div className="product-images">
                      {product.img.map((image, index) => (
                        <img key={index} src={image} alt={product.name}  style={{ width: "150px", height: "auto" }} />
                      ))}
                    </div>
                    <div className="product-colors">
                      <p style={{ backgroundColor: product.bgcolor, color: product.txtcolor }}>
                        Background Color
                      </p>
                      <p style={{ backgroundColor: product.panelcolor }}>Panel Color</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products available in this category</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default ProductCategoryPage;
