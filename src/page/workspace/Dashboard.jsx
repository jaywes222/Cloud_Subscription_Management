import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspaceId from "../../hooks/use-workspace-id";
import WorkspaceAnalytics from "../../components/workspace/workspace-analytics";
import { WorkspaceDashboardSkeleton } from "../../components/skeleton-loaders/dashboard-skeleton";
import PayNowDialog from "../../components/workspace/pay-now-dialog";

const workspaces = [
  { id: "my-wo8483727", name: "phAMAcore Cloud", plan: "Active" },
  { id: "ym28483727", name: "CliniCore", plan: "Deactivated" },
  { id: "cc88483727", name: "CorePay", plan: "Inactive" },
];

const WorkspaceDashboard = () => {
  const workspaceId = useWorkspaceId();
  const [loading, setLoading] = useState(true);
  const [activeWorkspaceName, setActiveWorkspaceName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!workspaceId) {
      if (workspaces.length > 0) {
        navigate(`/workspace/${workspaces[0].id}`, { replace: true });
      }
      return;
    }

    const workspace = workspaces.find((w) => w.id === workspaceId);

    if (workspace) {
      setActiveWorkspaceName(workspace.name);
      setLoading(true);

      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      if (workspaces.length > 0) {
        navigate(`/workspace/${workspaces[0].id}`, { replace: true });
      }
    }
  }, [workspaceId, navigate]);

  if (!loading && !activeWorkspaceName && workspaces.length === 0) {
    return (
      <main className="flex flex-1 flex-col py-4 md:pt-3">
        <p>No workspaces available.</p>
      </main>
    );
  }

  if (loading)
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
