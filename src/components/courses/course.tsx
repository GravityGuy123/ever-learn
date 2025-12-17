"use client";

import { useState } from "react";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { CoursePageDetails } from "@/lib/types";

export interface CourseComponentProps {
  course: CoursePageDetails & { student_count?: number }; // student count added
}

export const CourseComponent = ({ course }: CourseComponentProps) => {
  const [msg, setMsg] = useState<string>("");

  const enroll = async () => {
    try {
      await axiosInstance.post(`/courses/${course.id}/enroll`);
      setMsg("Enrolled successfully");
    } catch (error: unknown) {
      let message = "Enroll failed";
      if (typeof error === "object" && error !== null) {
        const axiosError = error as {
          response?: { data?: { detail?: string } };
          message?: string;
        };
        if (axiosError.response?.data?.detail) {
          message = axiosError.response.data.detail;
        } else if (axiosError.message) {
          message = axiosError.message;
        }
      }
      setMsg(message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* ---------- HERO SECTION ---------- */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {course.image && (
          <div className="relative h-72 w-full rounded-xl overflow-hidden shadow-lg">
            {/* CATEGORY BADGE */}
            {course.category && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm px-3 py-1 rounded-full shadow-lg z-10">
                {course.category}
              </span>
            )}

            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="space-y-5">
          {/* TITLE + TUTOR + STUDENT COUNT */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {course.title}
            </h1>

            {course.tutor && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By <span className="font-medium">{course.tutor.full_name}</span>
              </p>
            )}

            {course.student_count !== undefined && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {course.student_count} {course.student_count === 1 ? "student" : "students"} enrolled
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 text-sm rounded-full bg-violet-100 text-violet-700">
              {course.level}
            </span>

            {course.duration && (
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
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
              type="button"
              onClick={enroll}
              className="w-full md:w-auto px-8 py-4 text-lg bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-md"
            >
              Enroll Now
            </Button>

            {msg && <p className="text-sm text-center text-gray-600">{msg}</p>}
          </div>
        </div>
      </div>

      {/* ---------- LESSONS ---------- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Course Lessons</h2>

        {course.lessons.length === 0 ? (
          <p className="text-gray-500">No lessons added yet.</p>
        ) : (
          <ul className="space-y-4">
            {course.lessons.map((lesson, idx) => (
              <li
                key={lesson.id}
                className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium">
                  {idx + 1}. {lesson.title}
                </p>

                {lesson.content && (
                  <p className="text-sm text-gray-600 mt-1">{lesson.content}</p>
                )}

                {lesson.video_url && (
                  <a
                    href={lesson.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 underline"
                  >
                    Watch
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};