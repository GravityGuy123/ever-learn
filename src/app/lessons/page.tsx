"use client";

import React from "react";
import CategoryFilter from "@/components/CategoryFilter";
import CurrentLessonHighlight from "@/components/CurrentLessonHighlight";
import LessonsHeader from "@/components/LessonsHeader";
import LessonsList from "@/components/LessonsList";
import LessonsSearchFilter from "@/components/LessonsSearchFilter";
import ProgressOverview from "@/components/ProgressOverview";

// Define Lesson type
export interface Lesson {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  completed: boolean;
  rating: number;
  thumbnail: string;
  category: string;
}

// Lessons data
const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to React Components",
    description: "Learn the fundamentals of React components and how to create reusable UI elements",
    instructor: "Leonardo Genial",
    duration: "45 min",
    difficulty: "Beginner",
    progress: 100,
    completed: true,
    rating: 4.9,
    thumbnail: "/woman1.jpg",
    category: "React Development",
  },
  {
    id: 2,
    title: "State Management with React Hooks",
    description: "Master useState, useEffect, and other React hooks for effective state management",
    instructor: "Leonardo Genial",
    duration: "1h 15min",
    difficulty: "Intermediate",
    progress: 65,
    completed: false,
    rating: 4.8,
    thumbnail: "/woman1.jpg",
    category: "React Development",
  },
  {
    id: 3,
    title: "Advanced UI/UX Design Principles",
    description: "Explore advanced design concepts, user psychology, and create stunning interfaces",
    instructor: "Raya Safitri",
    duration: "2h 30min",
    difficulty: "Advanced",
    progress: 30,
    completed: false,
    rating: 4.7,
    thumbnail: "/woman1.jpg",
    category: "UI/UX Design",
  },
];

export default function LessonsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <LessonsHeader />
      <LessonsSearchFilter />
      <CategoryFilter />
      <ProgressOverview />
      <CurrentLessonHighlight />
      <LessonsList />
    </div>
  );
}