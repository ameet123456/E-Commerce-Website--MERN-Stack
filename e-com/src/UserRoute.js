import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/component/User/Homepage";
import ProductList from "../src/component/User/ProductList";
import ProductDetails from "../src/component/User/ProductDetails";
import Cart from "../src/component/User/Cart";
import Checkout from "../src/component/User/Checkout";
import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";

const UserRoutes = () => {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    
  );
};

export default UserRoutes;
