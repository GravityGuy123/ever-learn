"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Play, CheckCircle } from "lucide-react";

// Sample lessons data
const lessons = [
  {
    id: 1,
    title: "Introduction to Programming",
    category: "Programming",
    progress: 100,
    status: "Completed",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    category: "JavaScript",
    progress: 45,
    status: "In Progress",
  },
  {
    id: 3,
    title: "React Basics",
    category: "Frontend",
    progress: 0,
    status: "Not Started",
  },
  {
    id: 4,
    title: "Backend APIs with Node.js",
    category: "Backend",
    progress: 0,
    status: "Not Started",
  },
];

export default function LessonsHero() {
  return (
    <section className="w-full flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Lessons</h1>
        <p className="text-muted-foreground">
          Browse and manage your lessons. Track progress and start learning.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search lessons..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-foreground">{lesson.title}</h2>
              <Badge
                className={`${
                  lesson.status === "Completed"
                    ? "bg-green-500 text-white"
                    : lesson.status === "In Progress"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-800 dark:text-gray-200"
                } text-xs`}
              >
                {lesson.status}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{lesson.category}</p>

            {/* Inline Tailwind progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  lesson.status === "Completed"
                    ? "bg-green-500"
                    : lesson.status === "In Progress"
                    ? "bg-yellow-500"
                    : "bg-gray-400 dark:bg-gray-500"
                }`}
                style={{ width: `${lesson.progress}%` }}
              />
            </div>

            <div className="flex gap-2 mt-auto">
              {lesson.status === "Completed" ? (
                <Button variant="outline" className="flex-1 gap-2">
                  <CheckCircle className="w-4 h-4" /> Review
                </Button>
              ) : (
                <Button className="flex-1 gap-2 bg-course-primary hover:bg-course-primary-dark">
                  <Play className="w-4 h-4" /> Start
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}