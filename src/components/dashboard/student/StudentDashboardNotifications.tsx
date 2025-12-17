"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  { id: 1, type: "assignment", title: "Assignment Due Tomorrow", message: "React Project submission deadline", time: "2 hours ago", urgent: true },
  { id: 2, type: "course", title: "New Content Available", message: "Python for Data Science: Module 5 released", time: "5 hours ago", urgent: false },
  { id: 3, type: "live", title: "Live Session Starting", message: "UI/UX Q&A session in 30 minutes", time: "30 min", urgent: true },
  { id: 4, type: "certificate", title: "Certificate Ready", message: "Your JavaScript certificate is ready to download", time: "1 day ago", urgent: false },
];

export default function StudentDashboardNotifications() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4 px-4 sm:px-5">
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base sm:text-lg">
          <Bell className="h-5 w-5 text-accent" />
          Notifications
        </CardTitle>
        <Badge variant="secondary" className="text-sm sm:text-base text-white bg-violet-600 hover:bg-violet-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-all duration-300">
          {mockNotifications.length}
        </Badge>
      </CardHeader>

      {/* Notification List */}
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          {mockNotifications.map((n) => (
            <div
              key={n.id}
              className={`
                p-4 sm:p-5
                rounded-xl
                border-l-4
                flex flex-col sm:flex-row sm:justify-between
                items-start sm:items-center
                transition-all duration-300
                cursor-pointer
                ${
                  n.urgent
                    ? "border-l-destructive bg-destructive/10 hover:bg-destructive/20 shadow-sm hover:shadow-md"
                    : "border-l-primary/50 bg-primary/5 hover:bg-primary/10 shadow-sm hover:shadow-md"
                }
              `}
            >
              <div className="flex flex-col sm:flex-1">
                <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white">
                  {n.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{n.message}</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-0 whitespace-nowrap">
                {n.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}