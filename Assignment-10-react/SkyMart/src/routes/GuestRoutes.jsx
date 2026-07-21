import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const GuestRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    // toast.info("You're already signed in.");
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;
