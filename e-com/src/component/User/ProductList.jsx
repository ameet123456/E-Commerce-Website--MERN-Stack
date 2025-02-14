import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products/getproduct")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Log the fetched data to check the structure
        setProducts(data);
      });
  }, []);

  const styles = {
    productList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    productCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '15px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textDecoration: 'none',
      color: 'black',
    },
    productCardHover: {
      ':hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
      }
    },
    productImage: {
      width: '100%',
      height: '300px',
      objectFit: 'contain',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    productName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    productPrice: {
      fontSize: '16px',
      color: '#e44d26',
      fontWeight: '600',
    }
  };

  return (
    <div style={styles.productList}>
      {products.map((product) => (
        <Link 
          to={`/products/${product.id}`} 
          key={product.id}
          style={{
            ...styles.productCard,
            ...styles.productCardHover
          }}
        >
          {product.img && product.img[0] && (
            <img 
              src={product.img[0]} 
              alt={product.name} 
              style={styles.productImage} 
            />
          )}
          <h4 style={styles.productName}>{product.name}</h4>
          <p style={styles.productPrice}>₹{product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;