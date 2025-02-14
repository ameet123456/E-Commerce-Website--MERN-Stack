import React, { useState } from "react";
import axios from "axios";

const Trail = () => {
  const [bannerData, setBannerData] = useState({
    title: "",
    description: "",
    image: "",
    alwaysDisplay: false,
    startTime: "",
    endTime: "",
  });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setBannerData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/banner", bannerData);
      alert("Banner added successfully!");
    } catch (err) {
      console.error("Failed to add banner", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
      <label>
        <input type="checkbox" name="alwaysDisplay" onChange={handleChange} />
        Always Display
      </label>
      {!bannerData.alwaysDisplay && (
        <>
          <input type="datetime-local" name="startTime" onChange={handleChange} />
          <input type="datetime-local" name="endTime" onChange={handleChange} />
        </>
      )}
      <button type="submit">Add Banner</button>
    </form>
  );
};

export default Trail;
