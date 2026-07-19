import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

const GuestRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;
