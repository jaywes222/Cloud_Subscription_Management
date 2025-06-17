import React from "react";
import { Outlet } from "react-router-dom";
import Asidebar from "../components/asidebar/asidebar";
import Header from "../components/ui/header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AuthProvider } from "../context/auth-provider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset className="overflow-x-hidden">
          <div className="w-full">
            <>
              <Header />
              <div className="px-3 lg:px-20 py-3">
                <Outlet />
              </div>
            </>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
