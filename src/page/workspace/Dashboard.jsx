import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspaceId from "../../hooks/use-workspace-id";
import WorkspaceAnalytics from "../../components/workspace/workspace-analytics";
import { WorkspaceDashboardSkeleton } from "../../components/skeleton-loaders/dashboard-skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspacesUserIsMemberQueryFn } from "../../lib/api";
import PayNowDialog from "../../components/workspace/payment/pay-now-dialog";
import ActivateNowDialog from "../../components/workspace/activation/activate-now-dialog";
import { useAuthContext } from "../../context/auth-provider";

const WorkspaceDashboard = () => {
  const workspaceId = useWorkspaceId();
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuthContext();
  const [activeWorkspaceName, setActiveWorkspaceName] = useState(null);
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["userWorkspaces"],
    queryFn: getAllWorkspacesUserIsMemberQueryFn,
    staleTime: 1,
    refetchOnMount: true,
  });

  const workspaces = data?.workspaces || [];

  useEffect(() => {
    if (!workspaceId) {
      if (workspaces.length > 0) {
        navigate(`/workspace/${workspaces[0].code}`, { replace: true });
      }
      return;
    }

    const workspace = workspaces.find((w) => w.code === workspaceId);

    if (workspace) {
      setActiveWorkspaceName(workspace.name);
      setLoading(true);

      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      if (workspaces.length > 0) {
        navigate(`/workspace/${workspaces[0].code}`, { replace: true });
      }
    }
  }, [workspaceId, workspaces, navigate]);

  if (!loading && !activeWorkspaceName && workspaces.length === 0) {
    return (
      <main className="flex flex-1 flex-col py-4 md:pt-3">
        <p>No workspaces available.</p>
      </main>
    );
  }

  if (loading || isPending)
    return (
      <WorkspaceDashboardSkeleton
        workspaceName={activeWorkspaceName || "Loading..."}
      />
    );
  
  const companyName = user?.companyName || "Unknown Company";
  const cusCode = user?.psCusCode || "CUSXXX";
  const packageName = user?.packageName || "Unknown Client Package"

  return (
    <main className="flex flex-col py-3 md:pt-2 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <p className="text-xl font-semibold">{cusCode} - {companyName}</p>
          <p className="text-sm text-caramel font-medium mt-1">
            {packageName}
          </p>
        </div>
      </div>
      <WorkspaceAnalytics />
      <PayNowDialog />
      <ActivateNowDialog />
    </main>
  );
};

export default WorkspaceDashboard;
