"use client";

import { useEffect, useState } from "react";
import { axiosInstance, baseUrl } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { AllCoursesPageProps } from "@/lib/types";
import { Trash2, Clock, Users, RotateCw } from "lucide-react";
import Image from "next/image";
import { ErrorToast, SuccessToast } from "@/lib/toast";
import { useTheme } from "next-themes";
import { AxiosError } from "axios";

const MEDIA_BASE = baseUrl.replace("/api", "");

export default function DeletedCoursesPage() {
  const [deletedCourses, setDeletedCourses] = useState<AllCoursesPageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchDeletedCourses = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/tutor/courses/deleted");
        setDeletedCourses(res.data);
      } catch {
        setError("Failed to load deleted courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeletedCourses();
  }, []);

  const handleRestoreCourse = async (courseId: string) => {
    try {
      await axiosInstance.patch(`/tutor/courses/${courseId}/restore`);
      setDeletedCourses((prev) => prev.filter((c) => c.id !== courseId));
      SuccessToast("Course restored successfully.", isDark, { position: "top-center" });
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 403) {
        ErrorToast("Permission denied. You cannot restore this course.", isDark, { position: "top-center" });
      } else if (error.response?.status === 410) {
        ErrorToast("Restore window expired. Course permanently deleted.", isDark, { position: "top-center" });
      } else {
        ErrorToast("Failed to restore course. Try again.", isDark, { position: "top-center" });
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading deleted courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (deletedCourses.length === 0)
    return <p className="text-center mt-10">No deleted courses found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
        <Trash2 className="w-6 h-6 text-pink-500" /> Deleted Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deletedCourses.map((course) => {
          const imageUrl =
            course.image?.startsWith("http")
              ? course.image
              : course.image
              ? `${MEDIA_BASE}${course.image}`
              : null;

          const daysRemaining = course.days_remaining ?? 0;

          return (
            <div
              key={course.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition relative opacity-70"
            >
              {imageUrl && (
                <div className="relative h-44 w-full">
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {course.category && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg z-10">
                      {course.category}
                    </span>
                  )}
                </div>
              )}

              <div className="p-4 space-y-2">
                {course.level && (
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-violet-100 text-violet-700 mb-1">
                    {course.level}
                  </span>
                )}

                <h2 className="text-lg font-semibold">{course.title}</h2>

                {course.tutor && (
                  <p className="text-xs text-gray-500">
                    By <span className="font-medium">{course.tutor.full_name}</span>
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  {course.description.slice(0, 100)}...
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  {course.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </div>
                  )}
                  {course.student_count !== undefined && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {course.student_count}{" "}
                      {course.student_count === 1 ? "student" : "students"}
                    </div>
                  )}

                  <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-semibold">
                    Deletes in {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}
                  </span>
                </div>

                <p className="text-sm font-bold mt-2">
                  ₦{Number(course.price).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-3">
                  <Button
                    onClick={() => handleRestoreCourse(course.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" /> Restore
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}