"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TutorDashboardCourse } from "@/lib/types";
import {
  BookOpen,
  Users,
  BarChart3,
  MoreHorizontal,
  Eye,
  Edit,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function TutorDashboardCoursesTab({
  courses,
}: {
  courses: TutorDashboardCourse[];
}) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 });

  const router = useRouter();

  return (
    <div className="grid gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="dark:bg-gray-800 hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Course Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm md:text-base truncate">
                      {course.title}
                    </h3>
                    <Badge
                      variant={course.status === "published" ? "default" : "secondary"}
                      className="uppercase text-xs md:text-sm"
                    >
                      {course.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students.toLocaleString()} students
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {course.completionRate}% completion
                    </span>
                    {course.rating > 0 && (
                      <span className="flex items-center gap-1 text-amber-500 font-medium">
                        ★ {course.rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Revenue & Actions */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <p className="font-semibold text-lg md:text-xl text-primary">
                    {formatCurrency(course.revenue)}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Total Revenue
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="bg-popover dark:bg-gray-800 min-w-[150px]"
                  >
                    <DropdownMenuItem
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/courses/${course.id}`)} >
                      <Eye className="h-4 w-4" /> View Course
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)} >
                      <Edit className="h-4 w-4" /> Edit Course
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/courses/${course.id}/analytics`)} >
                      <BarChart3 className="h-4 w-4" /> View Analytics
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}