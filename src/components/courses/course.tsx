"use client";

import { useState } from "react";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { CoursePageDetails } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";


export interface CourseComponentProps {
  course: CoursePageDetails & { student_count?: number };
}

export const CourseComponent = ({ course }: CourseComponentProps) => {
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  // const isOwner = user?.id === course.tutor?.id;
  const isOwner = user?.id !== undefined && course.tutor?.id !== undefined && String(user.id) === String(course.tutor.id);

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

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/tutor/course/${course.id}/delete/`);
      router.push("/tutor/courses");
    } catch {
      setMsg("Failed to delete course");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* ---------- HERO SECTION ---------- */}
      <div className="grid md:grid-cols-2 gap-10 items-start relative">
        {course.image && (
          <div className="relative h-72 w-full rounded-xl overflow-hidden shadow-lg">
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
          {/* TITLE + ACTIONS */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {course.title}
            </h1>

            {isOwner && (
              <div className="flex gap-2">
                {/* EDIT */}
                <button
                  aria-label="Edit course"
                  onClick={() => router.push(`/dashboard/tutor/courses/${course.id}/update`)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  <Edit className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {/* DELETE */}
                <button
                  aria-label="Delete course"
                  onClick={handleDelete}
                  className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            )}
          </div>

          {course.tutor && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By <span className="font-medium">{course.tutor.full_name}</span>
            </p>
          )}

          {course.student_count !== undefined && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {course.student_count}{" "}
              {course.student_count === 1 ? "student" : "students"} enrolled
            </p>
          )}

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
    </div>
  );
};