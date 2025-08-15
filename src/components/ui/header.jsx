import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator as BreadcrumbSep,
} from "../../components/ui/breadcrumb";
import { SidebarTrigger } from "../../components/ui/sidebar";
import LogoutDialog from "../../components/asidebar/logout-dialog";
import useWorkspaceId from "../../hooks/use-workspace-id";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "./separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { User, Hospital, LogOut } from "lucide-react";
import { useAuthContext } from "../../context/auth-provider";

const Header = () => {
  const location = useLocation();
  const workspaceId = useWorkspaceId();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();

  const pathname = location.pathname;

  const getPageLabel = (pathname) => {
    if (pathname.includes("/profile")) return "Profile";
    return null;
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const pageHeading = getPageLabel(pathname);

  const handleProfileClick = () =>
    navigate(`/workspace/${workspaceId}/profile`);

  const username = user?.fullname || "Unknown User";
  const companyName = user?.companyName || "Unknown Company";

  return (
    <header className="flex sticky top-0 z-50 bg-white h-12 shrink-0 items-center border-b">
      {/* Left section now visually connects with sidebar */}
      <div className="flex items-center gap-2 px-3 border-r">
        <SidebarTrigger />
      </div>

      {/* Separator that flows across */}
      <Separator orientation="vertical" className="h-full" />

      {/* Breadcrumbs */}
      <div className="flex flex-1 items-center gap-2 px-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block text-[15px]">
              {pageHeading ? (
                <BreadcrumbLink asChild>
                  <Link to={`/workspace/${workspaceId}`}>Subscriptions</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="line-clamp-1">
                  Subscriptions
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {pageHeading && (
              <>
                <BreadcrumbSep className="hidden md:block" />
                <BreadcrumbItem className="text-[15px]">
                  <BreadcrumbPage className="line-clamp-1">
                    {pageHeading}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right section */}
      <div className="pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              {username}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="flex items-center gap-2 text-muted-foreground text-xs">
              <Hospital className="w-3.5 h-3.5" />
              {companyName}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="w-4 h-4" />
              View Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <LogOut className="w-4 h-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
