"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleEvent } from "@/lib/types";
import { Calendar, FileText, Video } from "lucide-react";

// Mock schedule data
const mockSchedule: ScheduleEvent[] = [
  { id: 1, title: "React Advanced Patterns", type: "Live Session", time: "10:00 AM", date: "Today", tutor: "John Smith" },
  { id: 2, title: "Python Office Hours", type: "Q&A", time: "2:00 PM", date: "Today", tutor: "Sarah Johnson" },
  { id: 3, title: "Design Review", type: "Workshop", time: "11:00 AM", date: "Tomorrow", tutor: "Emily Brown" },
  { id: 4, title: "Weekly Coding Challenge", type: "Challenge", time: "3:00 PM", date: "Dec 12", tutor: "Platform" },
];

export default function StudentDashboardSchedule() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      {/* Header */}
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-5 flex items-center gap-2">
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base sm:text-lg">
          <Calendar className="h-5 w-5 text-accent" />
          Upcoming Schedule
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          {mockSchedule.map((event) => (
            <div
              key={event.id}
              className="
                flex items-center gap-3 p-4 sm:p-5
                bg-gray-50 dark:bg-gray-900
                rounded-xl
                shadow-sm hover:shadow-md
                transition-all duration-300
                cursor-pointer
              "
            >
              {/* Event Icon */}
              <div className="p-3 bg-primary/10 rounded-lg flex items-center justify-center">
                {event.type === "Live Session" ? (
                  <Video className="h-5 w-5 text-primary" />
                ) : event.type === "Q&A" ? (
                  <FileText className="h-5 w-5 text-primary" />
                ) : (
                  <Calendar className="h-5 w-5 text-primary" />
                )}
              </div>

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">
                  {event.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {event.tutor} • {event.type}
                </p>
              </div>

              {/* Time & Date */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{event.time}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}