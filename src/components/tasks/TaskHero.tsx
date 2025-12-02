"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, Play } from "lucide-react";

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: "Complete React Project",
    course: "React Basics",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Submit JavaScript Assignment",
    course: "Advanced JS",
    progress: 100,
    status: "Completed",
  },
  {
    id: 3,
    title: "Join Study Group",
    course: "Frontend Fundamentals",
    progress: 0,
    status: "To Do",
  },
  {
    id: 4,
    title: "Backend API Design",
    course: "Node.js",
    progress: 20,
    status: "In Progress",
  },
];

export default function TaskHero() {
  return (
    <section className="w-full flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
        <p className="text-muted-foreground">
          Manage your course tasks and track progress.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search tasks..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-foreground">{task.title}</h2>
              <Badge
                className={`${
                  task.status === "Completed"
                    ? "bg-green-500 text-white"
                    : task.status === "In Progress"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-800 dark:text-gray-200"
                } text-xs`}
              >
                {task.status}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{task.course}</p>

            {/* Inline Tailwind progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-500"
                    : task.status === "In Progress"
                    ? "bg-yellow-500"
                    : "bg-gray-400 dark:bg-gray-500"
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              {task.status === "Completed" ? (
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