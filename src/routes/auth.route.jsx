import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/api/use-auth";
import { WorkspaceDashboardSkeleton } from "../components/skeleton-loaders/dashboard-skeleton";
import { isAuthRoute } from './common/routePaths';

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);

  if (isLoading && !_isAuthRoute) return <WorkspaceDashboardSkeleton />;

  if (user) return <Navigate to={`/workspace/${user.currentWorkspace?.code}`} replace />;

  return <Outlet />;
};

export default AuthRoute;
