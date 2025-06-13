import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { WorkspaceDashboardSkeleton } from "../components/skeleton-loaders/dashboard-skeleton";
import useAuth from "../hooks/api/use-auth";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData;

  if (isLoading) {
    return <WorkspaceDashboardSkeleton />;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
