import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
