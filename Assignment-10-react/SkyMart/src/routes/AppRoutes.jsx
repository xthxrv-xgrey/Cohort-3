import { Routes, Route } from "react-router";
import GuestRoutes from "./GuestRoutes.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

import Landing from "../pages/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Cart from "../pages/Cart.jsx";
import ProductDisplay from "../pages/ProductDisplay.jsx";

import AppLayout from "../layouts/AppLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDisplay />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
