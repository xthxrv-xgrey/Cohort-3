import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // toast.warning("Please log in to continue.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
