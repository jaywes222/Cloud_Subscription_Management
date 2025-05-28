import React from "react";
import { CalendarSync, UserRoundPen, LogOut } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "../../hooks/use-workspace-id";
import LogoutDialog from "./logout-dialog";

export function NavMain() {
  const workspaceId = useWorkspaceId();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {/* Subscriptions */}
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === `/workspace/${workspaceId}`}
              asChild
            >
              <Link to={`/workspace/${workspaceId}`} className="!text-[15px]">
                <CalendarSync />
                <span>Subscriptions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Profile */}
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === `/workspace/${workspaceId}/profile`}
              asChild
            >
              <Link to={`/workspace/${workspaceId}/profile`} className="!text-[15px]">
                <UserRoundPen />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setIsOpen(true)}>
              <LogOut />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
