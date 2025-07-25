import React from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarRail, useSidebar } from "../../components/ui/sidebar";
import Logo from "../../components/logo";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { Separator } from "../ui/separator";
import useWorkspaceId from "../../hooks/use-workspace-id";

const Asidebar = () => {
  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="!py-0 dark:bg-background">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
              phAMAcore
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="!mt-0 dark:bg-background">
        <SidebarGroup className="!py-0">
          <SidebarGroupContent >
            <WorkspaceSwitcher />
            <Separator />
            <NavMain />
            <Separator />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default Asidebar;
