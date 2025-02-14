import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HomePage() {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerRes = await axios.get('http://localhost:5000/slider/getBanner');
        const response = await axios.get('http://localhost:5000/products/getproduct');
        setBanners(bannerRes.data);
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      }
    };

    fetchData();
  }, []);

  const styles = {
    fullWidthBanner: {
      width: '100%',
      height: '500px',
      objectFit: 'cover',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    productCard: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '15px',
      textAlign: 'center',
      transition: 'transform 0.2s',
    },
    productImage: {
      width: '100%',
      height: '250px',
      objectFit: 'contain',
      margin: '0 auto 15px',
    },
    productHover: {
      ':hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }
    }
  };

  return (
    <div>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img 
              src={banner.image} 
              alt={banner.title} 
              style={styles.fullWidthBanner}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={styles.productGrid}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{
              ...styles.productCard,
              ...styles.productHover
            }}
          >
            {product.img && product.img[0] && (
              <img 
                src={product.img[0]} 
                alt={product.name} 
                style={styles.productImage}
              />
            )}
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;