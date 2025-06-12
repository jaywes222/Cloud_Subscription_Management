import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspaceId from "../../hooks/use-workspace-id";
import WorkspaceAnalytics from "../../components/workspace/workspace-analytics";
import { WorkspaceDashboardSkeleton } from "../../components/skeleton-loaders/dashboard-skeleton";
import PayNowDialog from "../../components/workspace/pay-now-dialog";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspacesUserIsMemberQueryFn } from "../../lib/api";

const WorkspaceDashboard = () => {
  const workspaceId = useWorkspaceId();
  const [loading, setLoading] = useState(true);
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

  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subscription Overview
          </h2>
          <p className="text-muted-foreground">
            Here's an overview for this subscription.
          </p>
        </div>
      </div>
      <WorkspaceAnalytics />
      <PayNowDialog />
    </main>
  );
};

export default WorkspaceDashboard;
