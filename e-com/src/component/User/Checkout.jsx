const Checkout = () => {
    return (
      <div className="checkout">
        <form>
          <h2>Shipping Details</h2>
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="Phone" required />
          <input type="email" placeholder="Email" required />
          <h3>Order Summary</h3>
          {/* Add product list and total */}
          <button type="submit">Place Order</button>
        </form>
      </div>
    );
  };
  
  export default Checkout;
  