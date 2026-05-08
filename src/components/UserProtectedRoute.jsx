import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Loader2 } from "lucide-react";

const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserAuth();

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-lime-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
