"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { AdminUser } from "@/lib/auth/session";

interface AdminLayoutClientProps {
  user: AdminUser;
  children: React.ReactNode;
}

export default function AdminLayoutClient({ user, children }: AdminLayoutClientProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper-100 flex flex-col md:flex-row">
      {/* Mobile Backdrop */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          className="fixed inset-0 bg-ink/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop static / Mobile Drawer) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 md:static md:z-auto transition-transform duration-300 transform md:transform-none ${
          mobileDrawerOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <AdminSidebar onCloseMobile={() => setMobileDrawerOpen(false)} />
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        <AdminHeader
          user={user}
          onToggleMobileDrawer={() => setMobileDrawerOpen(!mobileDrawerOpen)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
