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
    <section className="w-full flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tasks</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your course tasks and track progress.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search tasks..." className="pl-10" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">Filter</Button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
          // Determine progress bar width class
          const progressWidth = task.progress === 100 ? "w-full" :
            task.progress >= 75 ? "w-3/4" :
            task.progress >= 50 ? "w-2/3" :
            task.progress >= 25 ? "w-1/3" :
            task.progress > 0 ? "w-1/6" : "w-0";

          // Determine progress bar color
          const progressColor = task.status === "Completed"
            ? "bg-green-500"
            : task.status === "In Progress"
            ? "bg-yellow-500"
            : "bg-gray-400 dark:bg-gray-600";

          // Badge color
          const badgeColor = task.status === "Completed"
            ? "bg-green-500 text-white"
            : task.status === "In Progress"
            ? "bg-yellow-500 text-white"
            : "bg-gray-300 text-gray-800 dark:text-gray-200";

          return (
            <div
              key={task.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{task.title}</h2>
                <Badge className={`text-xs ${badgeColor}`}>
                  {task.status}
                </Badge>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{task.course}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                <div className={`h-2 rounded-full ${progressColor} ${progressWidth} transition-all duration-500`} />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto">
                {task.status === "Completed" ? (
                  <Button variant="outline" className="flex-1 gap-2">
                    <CheckCircle className="w-4 h-4" /> Review
                  </Button>
                ) : (
                  <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <Play className="w-4 h-4" /> Start
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}