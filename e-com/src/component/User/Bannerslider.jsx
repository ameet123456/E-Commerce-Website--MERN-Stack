import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("/api/banner")
      .then((response) => response.json())
      .then((data) => setBanners(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {banners.map((banner) => (
        <div key={banner.id}>
          <img src={banner.image} alt={banner.title} />
          <h3>{banner.title}</h3>
          <p>{banner.description}</p>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
