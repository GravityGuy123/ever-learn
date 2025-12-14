"use client";

import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

export function TutorDashboardStats() {
  const formatCurrency = (value: number) =>
    value.toLocaleString("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Students"
        value="5,360"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
        className="dark:bg-gray-800"
      />
      <StatsCard
        title="Active Courses"
        value="3"
        icon={BookOpen}
        subtitle="1 draft"
        className="dark:bg-gray-800"
      />
      <StatsCard
        title="Total Revenue"
        value={formatCurrency(53600)}
        icon={DollarSign}
        trend={{ value: 8, isPositive: true }}
        className="dark:bg-gray-800"
      />
      <StatsCard
        title="Avg. Completion"
        value="62%"
        icon={TrendingUp}
        trend={{ value: 5, isPositive: true }}
        className="dark:bg-gray-800"
      />
    </div>
  );
}