import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./ProductForm.css";
import { Link, Navigate } from "react-router-dom";
// ImageUploader Component
const ImageUploader = ({ onImagesUpload }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setUploadedImages(filesWithPreview);
    onImagesUpload(filesWithPreview);
  };

  const removeImage = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, idx) => idx !== index);
      onImagesUpload(updatedImages);
      return updatedImages;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="image-uploader">
      <div
        {...getRootProps({
          className: "dropzone",
        })}
      >
        <input {...getInputProps()} />
        <div className="upload-placeholder">
          <p>Click to upload or drag and drop</p>
          <p>Up to 5 images (max 5MB each)</p>
        </div>
      </div>
      {uploadedImages.length > 0 && (
        <div className="image-previews">
          {uploadedImages.map((file, index) => (
            <div key={index} className="preview-item">
              <img src={file.preview} alt={`Preview ${index}`} />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="remove-button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Store the list of products
  const [newCategory, setNewCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    qananity: "",
    images: [],
    bgcolor: "#ffffff",
    txtcolor: "#000000",
    category: "",
    tags: "",
  });

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/category/get-category");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/getproduct");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/category/create", {
        name: newCategory,
      });

      setCategories((prev) => [...prev, response.data]);
      setFormData((prev) => ({ ...prev, category: response.data._id }));
      setNewCategory("");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category === "create-new") {
      alert("Please create a new category or select an existing one.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => data.append("images", file));
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:5000/products/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      Navigate("/admin/product/viewProduct");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  const handleImagesUpload = (images) => {
    setFormData((prev) => ({ ...prev, images }));
  };

 

  return (
    <div>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-header">
        <div className="header">Add Product</div>
        <div className="sub-header">Add new product to the Store</div>
        </div>
        
        
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          placeholder="Enter product description"
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          min="0"
          placeholder="Enter price"
        />
      </div>

      <div className="form-group">
        <label>Discount (%):</label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleInputChange}
          required
          min="0"
          max="100"
          placeholder="Enter discount percentage"
        />
      </div>
      <div className="form-group">
        <label>Quanaity:</label>
        <input
          type="number"
          name="quanaity"
          value={formData.qananity}
          onChange={handleInputChange}
          required
          min="0"
          placeholder="Enter Qananity"
        />
      </div>
      <div className="form-group">
        <label>Images:</label>
        <ImageUploader onImagesUpload={handleImagesUpload} />
      </div>

      <div className="form-group">
        <label>Background Color:</label>
        <input
          type="color"
          name="bgcolor"
          value={formData.bgcolor}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Text Color:</label>
        <input
          type="color"
          name="txtcolor"
          value={formData.txtcolor}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
          <option value="create-new">+ Add New Category</option>
        </select>
      </div>

      {formData.category === "create-new" && (
        <div className="form-group">
          <label>New Category Name:</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
          />
          <button type="button" onClick={handleCreateCategory}>
            Create Category
          </button>
        </div>
      )}

      <div className="form-group">
        <label>Tags:</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="Enter comma-separated tags (e.g., tag1, tag2)"
        />
      </div>

      <button type="submit" className="btn submit-btn">
      <Link to="/admin/product/viewProduct" className="link">
        Add Product</Link>
      </button>
    </form>

    
    </div>
  );
};

export default ProductForm;
