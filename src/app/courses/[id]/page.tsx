"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios.config";
import { Course, Lesson } from "@/lib/types";

export default function CourseDetailPage() {
  const params = useParams();
  const rawId = params?.id;

  // Normalize ID
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    (async () => {
      try {
        const res = await axiosInstance.get<Course>(`/courses/${id}`);
        if (mounted) setCourse(res.data);
      } catch (error: unknown) {
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

    // Type-safe narrowing
    if (typeof error === "object" && error !== null) {
      // Check if it's an AxiosError-like shape
      const axiosError = error as { response?: { data?: { detail?: string } }; message?: string };

      if (axiosError.response?.data?.detail) {
        message = axiosError.response.data.detail;
      } else if (axiosError.message) {
        message = axiosError.message;
      }
    }

    setMsg(message);
  }
};

  if (loading) return <div className="p-4">Loading...</div>;
  if (!course) return <div className="p-4">Course not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <div className="text-gray-600 mb-4">{course.description}</div>

      <div className="mb-4">
        <button
          onClick={enroll}
          className="px-4 py-2 bg-violet-600 text-white rounded"
        >
          Enroll
        </button>

        {msg && <div className="mt-2 text-sm">{msg}</div>}
      </div>

      <h2 className="font-semibold mb-2">Lessons</h2>

      <ul className="space-y-2">
        {(course.lessons || []).map((lesson: Lesson) => (
          <li key={lesson.id} className="p-3 border rounded bg-white">
            <a
              href={`/courses/${id}/lessons/${lesson.id}`}
              className="text-violet-600 hover:underline"
            >
              {lesson.title}
            </a>

            <div className="text-sm text-gray-600">
              {lesson.content?.slice(0, 120) || ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}