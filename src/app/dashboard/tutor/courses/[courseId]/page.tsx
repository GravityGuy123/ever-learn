"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance, baseUrl } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";

// -----------------------------
// Types
// -----------------------------
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

interface AxiosErrorShape {
  response?: {
    data?: {
      detail?: string;
    };
  };
  message: string;
}

// -----------------------------
// API Helper
// -----------------------------
const api = {
  getCourse: (uuid: string) =>
    axiosInstance.get<CourseDetails>(`${baseUrl}/courses/${uuid}`),
};


export default function CourseDetailPage() {
  const params = useParams();
  const courseid = Array.isArray(params.courseid) ? params.courseid[0] : params.courseid;
  
  const router = useRouter();



  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseid) return;

    const fetchCourse = async () => {
      console.log("Fetching course UUID:", courseid); // sanity check
      try {
        setLoading(true);
        const res = await api.getCourse(courseid);
        setCourse(res.data);
        setError(null);
      } catch (err: unknown) {
        const axiosErr = err as AxiosErrorShape;
        console.error("Failed to fetch course:", axiosErr);
        setError(
          axiosErr.response?.data?.detail || "Failed to load course. Please try again."
        );
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseid]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading course...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!course)
    return <p className="text-center mt-10 text-gray-500">Course not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-300">
      {course.image && (
        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-sm">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{course.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            Level: {course.level}
          </span>
          {course.duration && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              Duration: {course.duration}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{course.description}</p>

      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        ₦{Number(course.price).toLocaleString()}
      </p>

      <Button
        onClick={() => router.push(`/courses/${courseid}/enroll`)}
        className="w-full py-3 text-lg font-medium"
      >
        Enroll Now
      </Button>

      {course.lessons.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Lessons</h2>
          <ul className="space-y-3">
            {course.lessons.map((lesson, idx) => (
              <li key={lesson.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {idx + 1}. {lesson.title}
                  </span>
                  {lesson.video_url && (
                    <a
                      href={lesson.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      Watch
                    </a>
                  )}
                </div>
                {lesson.description && <p className="text-gray-600 dark:text-gray-300 mt-1">{lesson.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}