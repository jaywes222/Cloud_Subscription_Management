import React from "react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarRail,
  useSidebar,
} from "../../components/ui/sidebar";

import Logo from "../../components/logo";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { Separator } from "../ui/separator";
import useWorkspaceId from "../../hooks/use-workspace-id";

const Asidebar = () => {
  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="!py-0 dark:bg-background">
          <div className="flex h-[50px] items-center justify-start w-full px-1">
            <Logo url={`/workspace/${workspaceId}`} />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="hidden md:flex ml-2 items-center gap-2 self-center font-medium"
              >
                CoreBase Solutions.
              </Link>
            )}
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
    </>
  );
};

export default Asidebar;
