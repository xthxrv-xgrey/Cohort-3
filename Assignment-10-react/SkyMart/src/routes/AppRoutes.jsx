import { createBrowserRouter, RouterProvider } from "react-router";

import Landing from "../pages/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import Cart from "../pages/Cart.jsx";
import Product from "../pages/Product.jsx";

import MainLayout from "../layout/MainLayout.jsx";

import ProtectedRoutes from "./ProtectedRoutes.jsx";
import GuestRoutes from "./GuestRoutes.jsx";

const router = createBrowserRouter([
  // Guest Routes
  {
    element: <GuestRoutes />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "product/:id",
            element: <Product />,
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
