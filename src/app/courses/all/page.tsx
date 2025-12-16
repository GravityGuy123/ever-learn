"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";

interface PublicCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  price: number;
  image?: string;
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
      } catch (err) {
        console.error("Failed to fetch public courses:", err);
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
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border rounded p-4 shadow hover:shadow-lg transition"
        >
          {course.image && (
            <div className="relative h-40 w-full mb-3 rounded overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <h2 className="text-lg font-semibold mb-2">{course.title}</h2>

          <p className="text-sm text-gray-600 mb-2">
            {course.description.slice(0, 100)}...
          </p>

          <p className="text-sm font-medium mb-2">
            Level: {course.level}
          </p>

          <p className="text-sm font-bold mb-4">
            ₦{course.price}
          </p>

          {/* ✅ ACTION BUTTONS */}
          <div className="flex gap-3">
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
      ))}
    </div>
  );
}