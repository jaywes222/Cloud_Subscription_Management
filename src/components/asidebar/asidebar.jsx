import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
  useSidebar,
} from "../../components/ui/sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { Separator } from "../ui/separator";
import useWorkspaceId from "../../hooks/use-workspace-id";
import Logo2 from "../logo/phamacore";

const Asidebar = () => {
  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="!py-0 h-12 flex items-center border-b">
        <div className={`flex items-center gap-2 ${open ? "pl-3" : "justify-center w-full"}`}>
          <Logo2 showText={open} />
        </div>
      </SidebarHeader>

      <SidebarContent className="!mt-0 dark:bg-background">
        <SidebarGroup className="!py-0">
          <SidebarGroupContent>
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
