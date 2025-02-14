import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => setCartItems(data));
  }, []);

  const handleRemove = (id) => {
    // Implement remove functionality
  };

  const handleQuantityChange = (id, quantity) => {
    // Implement quantity update
  };

  return (
    <div className="cart">
      {cartItems.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
          />
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <h3>
        Total: ₹
        {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
      </h3>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
