import React from "react";
import { useState, useEffect} from "react";
import { Check, ChevronDown, Loader, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "../../hooks/use-workspace-id";
import { getAllWorkspacesUserIsMemberQueryFn } from "../../lib/api";

export function WorkspaceSwitcher() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const workspaceId = useWorkspaceId();

  const [activeWorkspace, setActiveWorkspace] = useState();

  const { data, isPending } = useQuery({
    queryKey: ["userWorkspaces"],
    queryFn: getAllWorkspacesUserIsMemberQueryFn,
    staleTime: 1,
    refetchOnMount: true,
  });

  const workspaces = data?.workspaces || [];

  useEffect(() => {
    if (workspaces.length) {
      const workspace = workspaceId
        ? workspaces.find((ws) => ws.code === workspaceId)
        : workspaces[0];
      
      if (workspace) {
        setActiveWorkspace(workspace);
        if (!workspaceId) {
          navigate(`/workspace/${workspace.code}`);
        }
      }
    }
  }, [workspaceId, workspaces, navigate]);

  const onSelect = (workspace) => {
    setActiveWorkspace(workspace);
    navigate(`/workspace/${workspace.code}`);
  };

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Subscriptions</span>
      </SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-10"
              >
                {activeWorkspace ? (
                  <>
                    <div className="flex aspect-square size-8 items-center font-semibold justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      {activeWorkspace?.name?.split(" ")?.[0]?.charAt(0)}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {activeWorkspace?.name}
                      </span>
                      <span
                        className={`truncate text-xs ${["Deactivated", "Inactive"].includes(activeWorkspace?.description)
                          ? "text-red-600"
                          : "text-[#28A745]"}`}
                      >
                        {activeWorkspace?.description || "Active"}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      No Active Subscription
                    </span>
                  </div>
                )}
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Subscriptions
              </DropdownMenuLabel>
              {isPending && <Loader className="w-5 h-5 animate-spin" />}

              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.code}
                  onClick={() => onSelect(workspace)}
                  className="gap-2 p-2 !cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {workspace.name.split(" ")[0]?.charAt(0)}
                  </div>
                  {workspace.name}
                  {workspace.code === workspaceId && (
                    <DropdownMenuShortcut className="tracking-normal !opacity-100">
                      <Check className="w-4 h-4" />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="gap-2 p-2 opacity-50 cursor-not-allowed pointer-events-none"
                disabled
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add subscription <span className="ml-1 text-xs text-caramel">(v2)</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

