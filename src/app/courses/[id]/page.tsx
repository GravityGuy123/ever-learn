"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  description?: string;
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

export default function PublicCourseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    (async () => {
      try {
        const res = await axiosInstance.get<CourseDetails>(`/courses/${id}`);
        if (mounted) setCourse(res.data);
      } catch {
        if (mounted) setMsg("Failed to load course.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const enroll = async () => {
    if (!id) return;

    try {
      await axiosInstance.post(`/courses/${id}/enroll`);
      setMsg("Enrolled successfully");
    } catch (error: unknown) {
      let message = "Enroll failed";

      if (typeof error === "object" && error !== null) {
        const axiosError = error as { response?: { data?: { detail?: string } }; message?: string };
        if (axiosError.response?.data?.detail) message = axiosError.response.data.detail;
        else if (axiosError.message) message = axiosError.message;
      }

      setMsg(message);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-500">Loading course...</div>;

  if (!course)
    return <div className="p-6 text-center text-gray-500">Course not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* ---------------- HERO SECTION ---------------- */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Course Image */}
        {course.image && (
          <div className="relative h-72 w-full rounded-xl overflow-hidden shadow-md">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Course Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {course.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 text-sm rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200">
              {course.level}
            </span>
            {course.duration && (
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {course.duration}
              </span>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {course.description}
          </p>

          <div className="pt-4 space-y-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              ₦{Number(course.price).toLocaleString()}
            </p>

            <Button
              onClick={enroll}
              className="w-full md:w-auto px-8 py-4 text-lg bg-violet-600 hover:bg-violet-700 text-white"
            >
              Enroll Now
            </Button>

            {msg && <div className="text-sm text-center text-gray-600">{msg}</div>}
          </div>
        </div>
      </div>

      {/* ---------------- LESSONS SECTION ---------------- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Course Lessons
        </h2>

        {course.lessons.length === 0 ? (
          <p className="text-gray-500">No lessons added yet.</p>
        ) : (
          <ul className="space-y-4">
            {course.lessons.map((lesson, idx) => (
              <li
                key={lesson.id}
                className="p-5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {idx + 1}. {lesson.title}
                    </p>
                    {lesson.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {lesson.description}
                      </p>
                    )}
                  </div>

                  {lesson.video_url && (
                    <a
                      href={lesson.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 underline whitespace-nowrap"
                    >
                      Watch
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}