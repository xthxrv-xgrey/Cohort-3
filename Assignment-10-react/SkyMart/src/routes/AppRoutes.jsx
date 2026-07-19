import { Routes, Route } from "react-router";
import GuestRoutes from "./GuestRoutes.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

import Landing from "../pages/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";

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
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
