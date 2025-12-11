"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { mockCourses } from "./TutorDashboardPage";

export function TutorDashboardEarningsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Earnings Overview</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">$8,450</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payout</p>
                <p className="text-2xl font-bold">$2,340</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">All Time</p>
                <p className="text-2xl font-bold">$53,600</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </div>
          <Button className="w-full">Request Payout</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Revenue by Course</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCourses.filter(c => c.status === "published").map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate flex-1">{course.title}</span>
                  <span className="text-sm font-bold">${course.revenue.toLocaleString()}</span>
                </div>
                <Progress value={(course.revenue / 24500) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}