const Order = require("../models/order_model");
const Cart= require("../models/cart_model");
const Product = require("../models/product_model");

const createOrder = async (req, res) => {
    try {
    const {userId,productId,quantity, fromcart } = req.body;
    let orderItems = [];
    let totalAmount = 0;

    if(fromcart){
        const cart = await Cart.findOne({userId}).populate("items.productId");
        if(!cart || cart.items.length ===0){
            return res.status(400).json({message: "Cart is empty"});
        }
        orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          }));
        totalAmount = cart.items.reduce  ((sum, item) => sum + item.productId.price * item.quantity,
        0);
        cart.items = [];
      await cart.save();
               
    }else {
        // Direct "Buy Now" flow
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        orderItems = [{ productId, quantity }];
        totalAmount = product.price * quantity;
      }
      const order = new Order({
        userId,
        orderItems,
        totalAmount,
      });
  
      await order.save();
  
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
const getOrderHistory = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const orders = await Order.find({ userId }).populate("orderItems.productId");
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
module.exports = { createOrder, getOrderHistory };  