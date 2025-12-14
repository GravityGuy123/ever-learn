"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminOverviewTab from "@/components/dashboard/admin/AdminOverviewTab";
import AdminApplicationsTab from "@/components/dashboard/admin/AdminApplicationsTab";
import AdminUsersTab from "@/components/dashboard/admin/AdminUsersTab";
import AdminCoursesTab from "@/components/dashboard/admin/AdminCoursesTab";
import AdminAnalyticsTab from "@/components/dashboard/admin/AdminAnalyticsTab";
import AdminSettingsTab from "@/components/dashboard/admin/AdminSettingsTab";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { AdminApplication } from "@/lib/types";
import { AnalyticsRow } from "@/components/dashboard/admin/AdminAnalyticsTab";

// ----- Typed Models -----
interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  isActive?: boolean;
}

interface Course {
  id: string;
  title: string;
  students: number;
  completionRate: number;
  revenue: number;
  status: string;
}

type Tab = "overview" | "applications" | "users" | "courses" | "analytics" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [analyticsRows, setAnalyticsRows] = useState<AnalyticsRow[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => router.replace("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router]);

  // ----- Not Logged In State -----
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-semibold">Not logged in</h2>
        <p className="text-muted-foreground">Please log in to access the admin dashboard.</p>
        <Button onClick={() => router.push("/login")}>Go to Login</Button>
        <p className="text-xs text-muted-foreground">Redirecting automatically…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Tabs Navigation */}
      <div className="overflow-x-auto">
        <div className="flex flex-nowrap gap-2 sm:gap-4 border-b border-gray-300 dark:border-gray-600 pb-2 w-max min-w-full">
          {["overview", "applications", "users", "courses", "analytics", "settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-t-lg font-medium transition-colors duration-150
                ${activeTab === tab
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div>
        {activeTab === "overview" && <AdminOverviewTab analyticsRows={analyticsRows} />}
        {activeTab === "applications" && <AdminApplicationsTab />}
        {activeTab === "users" && <AdminUsersTab />}
        {activeTab === "courses" && <AdminCoursesTab />}
        {activeTab === "analytics" && <AdminAnalyticsTab />}
        {activeTab === "settings" && <AdminSettingsTab />}
      </div>
    </div>
  );
}