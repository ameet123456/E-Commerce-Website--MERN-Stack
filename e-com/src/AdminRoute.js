import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './component/Admin/AdminDashboard';
import AddProduct from './component/Admin/AddProduct';
import ProductList from './component/Admin/ViweProduct';
import EditProduct from './component/Admin/EditProduct';
import Categories from './component/Admin/Categories';
import AddBanner from './component/Admin/AddBanner';
import BannerSlider from './component/Admin/getBanner';
import GetUser from './component/Admin/GetUser';
import AdminLogin from './component/Auth/AdminLogin';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/product/addProduct" element={<AddProduct />} />
      <Route path="/admin/product/viewProduct" element={<ProductList />} />
      <Route path="/admin/product/edit/:productId" element={<EditProduct />} />
      <Route path="/admin/product/viewCategory" element={<Categories />} />
      <Route path="/admin/product/addBanner" element={<AddBanner />} />
      <Route path="/admin/product/getBanner" element={<BannerSlider />} />
      <Route path="/admin/getUser" element={<GetUser />} />
    </Routes>
  );
};

export default AdminRoutes;
