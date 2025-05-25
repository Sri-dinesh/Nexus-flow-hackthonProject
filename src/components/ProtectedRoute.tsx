
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  requireAuth?: boolean;
  requireAgent?: boolean;
  requireAdmin?: boolean;
};

const ProtectedRoute = ({
  requireAuth = true,
  requireAgent = false,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user, profile, isLoading, isAgent, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !user) {
    // Redirect to login if authentication is required but user is not logged in
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAgent && !isAgent()) {
    // Redirect to home if agent role is required but user is not an agent
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin()) {
    // Redirect to home if admin role is required but user is not an admin
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // User is authenticated, render the child route
  return <Outlet />;
};

export default ProtectedRoute;
