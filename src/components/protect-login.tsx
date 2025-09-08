import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "./store/user-store";



const ProtectLoginRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) return <p>Loading...</p>; 

  if (!user) <Outlet />;

  return  <Navigate to="/" replace /> ;
};

export default ProtectLoginRoute;
