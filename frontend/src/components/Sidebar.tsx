"use client";

import React from "react";
import MobileSidebar from "./mobile/MobileSidebar";
import DesktopSidebar from "./desktop/DesktopSidebar";

interface SidebarProps {
  empty?: string;
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <>
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
    </>
  );
};

export default Sidebar;
