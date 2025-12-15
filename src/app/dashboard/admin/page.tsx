"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminOverviewTab from "@/components/dashboard/admin/AdminOverviewTab";
import AdminApplicationsTab from "@/components/dashboard/admin/AdminApplicationsTab";
import AdminUsersTab from "@/components/dashboard/admin/AdminUsersTab";
import AdminCoursesTab from "@/components/dashboard/admin/AdminCoursesTab";
import AdminAnalyticsTab from "@/components/dashboard/admin/AdminAnalyticsTab";
import AdminSettingsTab from "@/components/dashboard/admin/AdminSettingsTab";
import { useAuth } from "@/context/auth-context";
import { AnalyticsRow } from "@/components/dashboard/admin/AdminAnalyticsTab";

type Tab = "overview" | "applications" | "users" | "courses" | "analytics" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const { isLoggedIn, user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [analyticsRows, setAnalyticsRows] = useState<AnalyticsRow[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Show loading while auth is being determined
  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center px-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Loading admin dashboard…
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Fetching your user data…</p>
      </div>
    );
  }

  if (!isLoggedIn) return null; // Redirect already triggered

  return (
    <div className="space-y-6 p-4 sm:p-6">
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
      <div className="space-y-6">
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
