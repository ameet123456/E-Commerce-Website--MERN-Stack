import React, { useState } from "react";
import axios from "axios";
import "./banner.css";
import { Link } from "react-router-dom";

const AddBanner = () => {
  const [bannerData, setBannerData] = useState({
    title: "",
    description: "",
    alwaysDisplay: false,
    startTime: "",
    endTime: "",
  });
  const [image, setImage] = useState(null); // For the selected image file
  const [preview, setPreview] = useState(null); // For previewing the image
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form inputs (text, checkbox, etc.)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
  
      // Validate file size (example: limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
  
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image!");
      return;
    }

    try {
      setLoading(true);

      // Create FormData to send file and other data
      const formData = new FormData();
      formData.append("image", image); // Attach the image file
      formData.append("title", bannerData.title);
      formData.append("description", bannerData.description);
      formData.append("alwaysDisplay", bannerData.alwaysDisplay);
      formData.append("startTime", bannerData.startTime);
      formData.append("endTime", bannerData.endTime);

      // Send data to the backend
      const response = await axios.post("http://localhost:5000/slider/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message || "Banner added successfully!");
      setBannerData({
        title: "",
        description: "",
        alwaysDisplay: false,
        startTime: "",
        endTime: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Failed to add banner", error);
      setMessage(error.response?.data?.message || "Failed to add banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="banner-form-container">
      <Link to="/admin/product/getBanner" className="link">
                  VIEW BANNER
                </Link>
      <h1>Add Banner</h1>
      {message && (
        <p className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={bannerData.title}
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={bannerData.description}
            placeholder="Description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="alwaysDisplay"
            checked={bannerData.alwaysDisplay}
            onChange={handleChange}
          />
          <label>Always Display</label>
        </div>
        {!bannerData.alwaysDisplay && (
          <div className="form-group">
            <label>Start Time:</label>
            <input
              type="datetime-local"
              name="startTime"
              value={bannerData.startTime}
              onChange={handleChange}
              required={!bannerData.alwaysDisplay}
            />
            <label>End Time:</label>
            <input
              type="datetime-local"
              name="endTime"
              value={bannerData.endTime}
              onChange={handleChange}
              required={!bannerData.alwaysDisplay}
            />
          </div>
        )}
        <button 
          type="submit" 
          disabled={loading} 
          className="submit-button"
        >
          {loading ? "Adding..." : "Add Banner"}
        </button>
      </form>
    </div>
  );
};
export default AddBanner;
