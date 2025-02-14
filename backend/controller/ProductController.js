const Product = require("../models/product_model");
const Category = require("../models/categories_model");

// Delete a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      req.body, // Use the entire request body for updates
      { new: true, runValidators: true } // Ensure updated product is returned and validated
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    // Log the request parameters to check if the product ID is being passed correctly
    console.log('Request Parameters:', req.params); // Log entire params object
    console.log('Received Product ID:', req.params.id); // Log the specific product ID

    const productId = req.params.id; // Extract product ID from URL
    const userRole = req.user ? req.user.role : null; // Check if user is authenticated and get role if available

    let product;

    if (userRole === 'admin') {
      // Fetch all fields for admin
      product = await Product.findById(productId);
    } else {
      // Fetch only specific fields for regular users
      product = await Product.findById(productId).select('name price image description');
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product); // Return the product details
  } catch (error) {
    // Log error details for debugging
    console.error('Error details:', error);
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllProduct = async (req, res) => {
  try {
    // No authentication required to view products
    const userRole = req.user ? req.user.role : null;

    let products;
    if (userRole === 'admin') {
      // Admin can see all product details
      products = await Product.find({}).populate('category');
    } else {
      // Regular users can see limited product fields (e.g., name, price, image, description)
      products = await Product.find({}, 'id name price img description').populate('category');
    }

    res.status(200).json(products); // Return the list of products
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, bgcolor, txtcolor, panelcolor, category, tags } = req.body;

    // Handle multiple images
    const images = req.files.map(file => file.path); // Get array of Cloudinary URLs
    console.log("Image URLs:", images);

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      img: images, // Save array of Cloudinary image URLs
      bgcolor,
      txtcolor,
      panelcolor,
      category,
      tags,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', newProduct });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'An error occurred while creating the product',
      error: error.message || JSON.stringify(error),
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find({});

    // For each category, find the products associated with it
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ category: category._id });
        return {
          ...category.toObject(),
          products: products
        };
      })
    );

    // Send the categories with their products as the response
    res.status(200).json(categoriesWithProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories and products", error });
  }
};

module.exports = { getAllProduct, createProduct, updateProduct, getProductByCategory, getProductById };
