"use client";

import React from "react";
import DashboardsList from "./DashboardsList";
import Account from "@/components/shared/Account";

export function DashboardLayout({ children, currentRole } : { children: React.ReactNode; currentRole?: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Account />
            <DashboardsList />
            {/* existing app sidebar or navigation could go here */}
          </div>
        </aside>

        <main className="md:col-span-3">
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
