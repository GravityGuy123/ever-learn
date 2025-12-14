"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { mockCourses } from "@/app/dashboard/tutor/mockData";

export function TutorDashboardEarningsTab() {
  const formatCurrency = (value: number) =>
    value.toLocaleString("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 });

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Earnings Overview */}
      <Card className="dark:bg-gray-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {/* This Month */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4 dark:bg-gray-700/40">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(8450)}</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>

            {/* Pending Payout */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4 dark:bg-gray-700/40">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending Payout</p>
                <p className="text-2xl font-bold">{formatCurrency(2340)}</p>
              </div>
              <div className="rounded-full bg-amber-500/10 p-3">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>

            {/* All Time */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4 dark:bg-gray-700/40">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">All Time</p>
                <p className="text-2xl font-bold">{formatCurrency(53600)}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white shadow-sm transition-all duration-300">
            Request Payout
          </Button>
        </CardContent>
      </Card>

      {/* Revenue by Course */}
      <Card className="dark:bg-gray-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Revenue by Course</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {mockCourses
              .filter((c) => c.status === "published")
              .map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium truncate">
                      {course.title}
                    </span>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCurrency(course.revenue)}
                    </span>
                  </div>

                  <Progress
                    value={(course.revenue / 24500) * 100}
                    className="h-2 bg-muted dark:bg-gray-700"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}