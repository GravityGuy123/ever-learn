"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url?: string;
  created_at: string;
}

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  level: string;
  duration?: string;
  price: number;
  image?: string;
  lessons: Lesson[];
}

export default function TutorCourseDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const courseId =
    typeof params.id === "string" ? params.id : null;

  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get<CourseDetails>(
          `/tutor/courses/${courseId}`,
          {
            withCredentials: true, // 🔴 REQUIRED FIX
          }
        );

        setCourse(res.data);
        setError(null);
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const err = error as {
            response?: { data?: { detail?: string } };
          };

          setError(
            err.response?.data?.detail ||
              "Failed to load course."
          );
        } else {
          setError("Failed to load course.");
        }

        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <p className="text-center mt-16 text-gray-500">
        Loading course...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-16 text-red-500 font-medium">
        {error}
      </p>
    );
  }

  if (!course) {
    return (
      <p className="text-center mt-16 text-gray-500">
        Course not found.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        {course.image && (
          <div className="relative h-72 w-full rounded-xl overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            {course.title}
          </h1>

          <span className="inline-block px-3 py-1 text-sm rounded-full bg-violet-100">
            {course.level}
          </span>

          <p>{course.description}</p>

          <p className="text-3xl font-bold">
            ₦{Number(course.price).toLocaleString()}
          </p>

          <Button
            onClick={() =>
              router.push(
                `/dashboard/tutor/courses/${courseId}/enroll`
              )
            }
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}