import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../authentication/AuthContext";
import { api } from "../utils/Api";
import Loader from "../components/Shared/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🔐 Get role from DB
  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/users/${user.email}`);
      return res.data.data?.role;
    },
  });

  // 🔄 Firebase still loading
  if (loading || isLoading) {
    return <Loader />;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ Not admin
  if (data !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Admin access
  return children;
};

export default AdminRoute;
