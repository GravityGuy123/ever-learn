"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CoursePageDetails } from "@/lib/types";
import { CourseOwnerActions } from "./CourseOwnerActions";

interface Props {
  course: CoursePageDetails & { student_count?: number };
  isOwner: boolean;
  enroll: () => void;
  msg: string;
  handleDeleteRedirect: () => void;
}

export const CourseHeroSection = ({
  course,
  isOwner,
  enroll,
  msg,
  handleDeleteRedirect,
}: Props) => {
  return (
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
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {course.title}
          </h1>

          {isOwner && (
            <CourseOwnerActions
              courseId={course.id}
              handleDeleteRedirect={handleDeleteRedirect}
            />
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
            {course.student_count < 2 ? "student" : "students"} enrolled
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
            className="w-full md:w-auto px-8 py-4 text-lg bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-md cursor-pointer"
          >
            Enroll Now
          </Button>

          {msg && (
            <p className="text-sm text-center text-gray-600">{msg}</p>
          )}
        </div>
      </div>
    </div>
  );
};