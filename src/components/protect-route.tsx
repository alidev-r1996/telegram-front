import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "./store/user-store";



const ProtectedRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) return <p>Loading...</p>; 

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
