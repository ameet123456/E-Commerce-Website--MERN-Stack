import axios from "axios";
import React, { useState, useEffect } from "react";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch banners from backend
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/slider/getBanner");
        setBanners(response.data); // Use `response.data` directly
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div>Loading banners...</div>;
  }

  return (
    <div className="banner-slider w-full overflow-hidden relative">
      <div className="flex">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="banner-item flex-none w-full text-center"
          >
            <img
              src={banner.image} // Assuming `image` contains the URL for the banner
              alt={banner.name} // Assuming `name` contains the banner title
              className="w-full h-64 object-cover"
            />
            <p className="mt-2 text-lg font-semibold">{banner.name}</p>
            <p className="text-sm text-gray-500">{banner.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
