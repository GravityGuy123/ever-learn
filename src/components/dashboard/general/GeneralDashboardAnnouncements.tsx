import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockAnnouncements = [
  { id: 1, title: "New Python Bootcamp launching next week!", date: "Dec 5, 2025", type: "new" },
  { id: 2, title: "Platform maintenance scheduled for Dec 15", date: "Dec 3, 2025", type: "update" },
  { id: 3, title: "Holiday discounts on all courses - 30% off!", date: "Dec 1, 2025", type: "promo" },
];

export default function GeneralDashboardAnnouncements() {

     return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" /> Platform Updates
            </CardTitle>
            <Button variant="ghost" size="sm">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnnouncements.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant={a.type === "new" ? "default" : a.type === "promo" ? "secondary" : "outline"}>
                      {a.type}
                    </Badge>
                    <span className="font-medium">{a.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{a.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
     )
}