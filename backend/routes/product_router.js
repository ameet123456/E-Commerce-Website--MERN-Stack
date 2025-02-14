const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const verifyToken = require('../middleware/verifyToken'); // Import the verifyToken middleware
const { 
  getAllProduct, 
  createProduct, 
  updateProduct, 
  getProductByCategory, 
  getProductById 
} = require('../controller/ProductController');

// Protected Routes
router.post('/create', verifyToken, upload.array('images', 5), createProduct); // Secure Create Product
router.put('/update/:id', verifyToken, updateProduct); // Secure Update Product
router.get('/getproduct', getAllProduct); // Secure Get All Products
router.get('/getproductbycategory', verifyToken, getProductByCategory); // Secure Get Products by Category
router.get('/getproduct/:id', getProductById); // Secure Get Product by ID

module.exports = router;
