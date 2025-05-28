import React from "react";
import { Skeleton } from "../../components/ui/skeleton";
import { Loader } from "lucide-react";
import { WorkspaceLoader } from "./workspace-loader";

export function WorkspaceDashboardSkeleton({ workspaceName }) {
  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3 relative">
      {/* Loader on top */}
      <WorkspaceLoader workspaceName={workspaceName} />

      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" /> {/* Title */}
          <Skeleton className="h-4 w-72" /> {/* Subtitle */}
        </div>
      </div>

      {/* Analytics Card */}
      <div className="w-full h-[calc(100vh-100px)] p-6 rounded-2xl border space-y-6">
        {/* Top Summary */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-6">
          {/* Left: Title + Dropdown */}
          <div className="flex-1 space-y-3 min-w-[140px]">
            <Skeleton className="h-6 w-40" /> {/* Title */}
            <Skeleton className="h-4 w-28" /> {/* Plan name */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Cycle */}
              <Skeleton className="h-4 w-24" /> {/* Branches dropdown */}
              <Skeleton className="h-4 w-20" /> {/* Users */}
            </div>
          </div>

          {/* Middle: Sub Details */}
          <div className="flex-1 space-y-2 min-w-[200px]">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" /> {/* Label */}
                <Skeleton className="h-4 w-28" /> {/* Value */}
              </div>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-6">
          {[1, 2, 3].map((sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <Skeleton className="h-6 w-48" /> {/* Section header */}
              <div className="space-y-2">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
