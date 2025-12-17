"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

interface PublicCourse {
  id: string;
  title: string;
  description?: string;
  level: string;
  price: number;
  duration?: string;
  image?: string | null;
  student_count?: number;
  category: string;
  tutor?: {
    id: string;
    full_name: string;
    username: string;
  };
}

export default function PublicCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<PublicCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<PublicCourse[]>("/courses");
        setCourses(res.data);
        setError(null);
      } catch {
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
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          {/* IMAGE */}
          {/* {course.image && (
            <div className="relative h-44 w-full">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )} */}

          {/* IMAGE + CATEGORY BADGE */}
          {course.image && (
            <div className="relative h-44 w-full">
              <Image
                src={course.image}
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
            {/* LEVEL */}
            <span className="inline-block text-xs text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
              {course.level}
            </span>

            <h2 className="text-lg font-semibold">{course.title}</h2>

            {/* TUTOR */}
            {course.tutor && (
              <p className="text-xs text-gray-500">
                By <span className="font-medium">{course.tutor.full_name}</span>
              </p>
            )}

            {/* DESCRIPTION */}
            {course.description && (
              <p className="text-sm text-gray-600">
                {course.description.slice(0, 100)}...
              </p>
            )}

            {/* META */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              {course.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
              )}
              {course.student_count !== undefined && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />{course.student_count}{" "}
                  {course.student_count === 1 ? "student" : "students"}
                </div>
              )}
            </div>

            <p className="text-sm font-bold mt-2">
              ₦{Number(course.price).toLocaleString()}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-3">
              <Button
                onClick={() => router.push(`/courses/${course.id}`)}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
              >
                View Course
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push(`/courses/${course.id}/enroll`)}
                className="flex-1"
              >
                Enroll
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}