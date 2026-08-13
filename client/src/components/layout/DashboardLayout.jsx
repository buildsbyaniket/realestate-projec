// src/components/layout/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children, isSidebarOpen, onSidebarClose, onMenuClick }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f5f8f9]">
      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} />

      {/* RIGHT SIDE */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* HEADER */}
        <Header onMenuClick={onMenuClick} />

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;