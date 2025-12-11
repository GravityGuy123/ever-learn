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
    <Card>
      <CardHeader className="pb-2 flex items-center gap-2">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Schedule
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {mockSchedule.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                {event.type === "Live Session" ? (
                  <Video className="h-4 w-4 text-primary" />
                ) : event.type === "Q&A" ? (
                  <FileText className="h-4 w-4 text-primary" />
                ) : (
                  <Calendar className="h-4 w-4 text-primary" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{event.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {event.tutor} • {event.type}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium">{event.time}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}