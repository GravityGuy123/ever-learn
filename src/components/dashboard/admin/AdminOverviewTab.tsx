"use client";

import { useEffect, useState } from "react";
import AdminStatCard from "./AdminStatCard";
import AdminAnalyticsChart, { AnalyticsRow } from "./AdminAnalyticsChart";
import { Users, BookOpen, UserCheck, TrendingUp, FileText } from "lucide-react";
import { axiosInstance } from "@/lib/axios.config";

export interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  pendingApplications: number;
  activeUsers: number;
  revenue: number;
}

interface AdminOverviewTabProps {
  analyticsRows?: AnalyticsRow[]; // optional: parent can pass rows
}

export default function AdminOverviewTab({ analyticsRows: parentRows }: AdminOverviewTabProps) {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    pendingApplications: 0,
    activeUsers: 0,
    revenue: 0,
  });
  const [analyticsRows, setAnalyticsRows] = useState<AnalyticsRow[]>(parentRows || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatsAndAnalytics = async () => {
      try {
        setLoading(true);
        const statsRes = await axiosInstance.get<Stats>("/admin/overview-stats");
        setStats(statsRes.data);

        // Only fetch analytics if parent didn't provide
        if (!parentRows) {
          const analyticsRes = await axiosInstance.get<AnalyticsRow[]>("/admin/analytics/site");
          setAnalyticsRows(analyticsRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch overview data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatsAndAnalytics();
  }, [parentRows]);

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading overview...</p>;

  const safeStats: Stats = {
    totalUsers: stats?.totalUsers ?? 0,
    totalCourses: stats?.totalCourses ?? 0,
    totalEnrollments: stats?.totalEnrollments ?? 0,
    pendingApplications: stats?.pendingApplications ?? 0,
    activeUsers: stats?.activeUsers ?? 0,
    revenue: stats?.revenue ?? 0,
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AdminStatCard title="Total Users" value={safeStats.totalUsers} icon={Users} color="blue" />
        <AdminStatCard title="Total Courses" value={safeStats.totalCourses} icon={BookOpen} color="green" />
        <AdminStatCard title="Total Enrollments" value={safeStats.totalEnrollments} icon={UserCheck} color="purple" />
        <AdminStatCard
          title="Pending Applications"
          value={safeStats.pendingApplications}
          icon={FileText}
          color="yellow"
          urgent={safeStats.pendingApplications > 0}
        />
        <AdminStatCard title="Active Users (30d)" value={safeStats.activeUsers} icon={TrendingUp} color="indigo" />
        <AdminStatCard title="Revenue" value={`$${safeStats.revenue.toLocaleString()}`} icon={TrendingUp} color="green" />
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Analytics</h2>
        {analyticsRows.length > 0 ? (
          <AdminAnalyticsChart rows={analyticsRows.slice(0, 7)} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No analytics data available</p>
        )}
      </div>
    </div>
  );
}