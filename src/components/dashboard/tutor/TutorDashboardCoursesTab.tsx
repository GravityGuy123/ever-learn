"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Users, BarChart3, MoreHorizontal, Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance, baseUrl } from "@/lib/axios.config";

interface TutorDashboardCourse {
  id: string;
  title: string;
  description?: string;
  level?: string;
  duration?: string;
  price?: number;
  category?: string;
  tutor?: { id: string; full_name: string; username: string };
  student_count?: number;
  is_published?: boolean;
  created_at?: string;
  revenue?: number;
  completionRate?: number;
  image?: string;
}

const MEDIA_BASE = baseUrl.replace("/api", "");

export default function TutorDashboardCoursesTab() {
  const [courses, setCourses] = useState<TutorDashboardCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formatCurrency = (value?: number) =>
    (value ?? 0).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<TutorDashboardCourse[]>("/tutor/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch tutor courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (courses.length === 0) return <p className="text-center mt-10">No courses found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const studentCount = course.student_count ?? 0;
        const revenue = course.revenue ?? course.price ?? 0;
        const completionRate = course.completionRate ?? 0;

        const imageUrl =
          course.image?.startsWith("http") ? course.image : course.image ? `${MEDIA_BASE}${course.image}` : null;

        return (
          <Card
            key={course.id}
            className="dark:bg-gray-800 hover:shadow-lg transition-shadow flex flex-col w-full overflow-hidden"
          >
            {imageUrl && (
              <div className="relative w-full h-40 sm:h-36 md:h-44">
                <Image
                  src={imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {course.category && (
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg z-10">
                    {course.category}
                  </span>
                )}
              </div>
            )}

            <CardContent className="flex flex-col gap-2 p-4">
              {/* Title + Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="font-semibold text-sm sm:text-base truncate">{course.title}</h3>
                <Badge
                  variant={course.is_published ? "default" : "secondary"}
                  className="uppercase text-xs sm:text-sm self-start"
                >
                  {course.is_published ? "Published" : "Draft"}
                </Badge>
              </div>

              {course.level && <p className="text-xs text-muted-foreground">Level: {course.level}</p>}
              {course.tutor && (
                <p className="text-xs text-muted-foreground">
                  By <span className="font-medium">{course.tutor.full_name}</span>
                </p>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{course.description ?? ""}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {studentCount} {studentCount === 1 ? "student" : "students"}
                </div>

                <div className="flex items-center gap-1 text-primary font-medium">
                  <BookOpen className="h-4 w-4" /> {formatCurrency(revenue)}
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-medium">
                  <BarChart3 className="h-4 w-4" /> {completionRate}%
                </div>

                {/* Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="bg-popover dark:bg-gray-800 min-w-[130px]">
                    <DropdownMenuItem
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/courses/${course.id}`)}
                    >
                      <Eye className="h-4 w-4" /> View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/courses/${course.id}/analytics`)}
                    >
                      <BarChart3 className="h-4 w-4" /> Analytics
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}