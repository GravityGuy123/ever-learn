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
    <Card className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-800 rounded-2xl w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-2 sm:gap-0">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-semibold">
          <Megaphone className="h-5 w-5 text-violet-600 dark:text-violet-400" /> Platform Updates
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
        >
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-3">
          {mockAnnouncements.map((a) => (
            <div
              key={a.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900 transition-colors cursor-pointer gap-2 sm:gap-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Badge
                  variant={
                    a.type === "new"
                      ? "default"
                      : a.type === "promo"
                      ? "secondary"
                      : "outline"
                  }
                  className={`capitalize px-2 py-1 text-xs sm:text-sm ${
                    a.type === "new"
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-600 dark:text-white"
                      : a.type === "promo"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {a.type}
                </Badge>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                  {a.title}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                {a.date}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}