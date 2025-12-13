"use client";

import React from "react";
import DashboardsList from "./DashboardsList";
import Account from "@/components/shared/Account";

export default function DashboardLayout({
  children,
  currentRole,
}: {
  children: React.ReactNode;
  currentRole?: string;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-6">
        
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-6 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-2xl p-4 md:p-6">
            <DashboardsList currentRole={currentRole} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}