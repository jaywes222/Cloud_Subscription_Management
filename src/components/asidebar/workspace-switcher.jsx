import React from "react";
import { useState, useEffect} from "react";
import { Check, ChevronDown, Plus } from "lucide-react";

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
import useWorkspaceId from "../../hooks/use-workspace-id";
import useCreateWorkspaceDialog from "../../hooks/use-create-workspace-dialog";

export function WorkspaceSwitcher() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { onOpen } = useCreateWorkspaceDialog();
  const workspaceId = useWorkspaceId();

  const [activeWorkspace, setActiveWorkspace] = useState();

  const workspaces = [
    {
      id: "my-wo8483727",
      name: "phAMAcore Cloud",
      plan: "Active",
    },
    {
      id: "ym28483727",
      name: "CliniCore",
      plan: "Deactivated",
    },
    {
      id: "cc88483727",
      name: "CorePay",
      plan: "Inactive",
    },
  ];

  useEffect(() => {
    if (workspaceId && workspaces.length) {
      const workspace = workspaces.find((w) => w.id === workspaceId);
      if (workspace) {
        setActiveWorkspace(workspace);
        return;
      }
    }

    if (workspaces.length) {
      const first = workspaces[0];
      setActiveWorkspace(first);
      navigate(`/workspace/${first.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const onSelect = (workspace) => {
    setActiveWorkspace(workspace);
    navigate(`/workspace/${workspace.id}`);
  };

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Subscriptions</span>
        <button
          onClick={onOpen}
          className="flex size-5 items-center justify-center rounded-full border"
        >
          <Plus className="size-3.5" />
        </button>
      </SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-10"
              >
                <div className="flex aspect-square size-8 items-center font-semibold justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {activeWorkspace?.name?.split(" ")?.[0]?.charAt(0)}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeWorkspace?.name}
                  </span>
                  <span
                    className={`truncate text-xs ${["Deactivated", "Inactive"].includes(activeWorkspace?.plan)
                        ? "text-red-600"
                        : "text-[#28A745]"
                      }`}
                  >
                    {activeWorkspace?.plan}
                  </span>

                </div>
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

              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => onSelect(workspace)}
                  className="gap-2 p-2 !cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {workspace.name.split(" ")[0]?.charAt(0)}
                  </div>
                  {workspace.name}

                  {workspace.id === workspaceId && (
                    <DropdownMenuShortcut className="tracking-normal !opacity-100">
                      <Check className="w-4 h-4" />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="gap-2 p-2 !cursor-pointer"
                onClick={onOpen}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add subscription
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
