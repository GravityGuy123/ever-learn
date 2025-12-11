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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
            </CardTitle>
            <Badge variant="secondary">{mockNotifications.length}</Badge>
            </CardHeader>

            <CardContent>
            <div className="space-y-3">
                {mockNotifications.map(n => (
                <div
                    key={n.id}
                    className={`p-3 rounded-lg border-l-4 ${
                    n.urgent ? "border-l-destructive bg-destructive/5" : "border-l-primary/50 bg-muted/50"
                    }`}
                >
                    <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-medium text-sm">{n.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                    </div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
    )
}