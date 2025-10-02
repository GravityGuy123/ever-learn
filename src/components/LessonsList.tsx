"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LessonCard from "./LessonCard";

export default function LessonsList() {
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle>All Lessons</CardTitle>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-border">
        <LessonCard
          index={0}
          lesson={{
            id: 1,
            title: "Introduction to React",
            description: "Learn the basics of React components and JSX.",
            instructor: "Alice",
            duration: "10 min",
            difficulty: "Beginner",
            progress: 100,
            completed: true,
            rating: 4.5,
            thumbnail: "/images/react-intro.jpg",
            category: "React",
          }}
        />
        <LessonCard
          index={1}
          lesson={{
            id: 2,
            title: "State and Props",
            description: "Understand state management and passing props.",
            instructor: "Bob",
            duration: "15 min",
            difficulty: "Beginner",
            progress: 50,
            completed: false,
            rating: 4.2,
            thumbnail: "/images/state-props.jpg",
            category: "React",
          }}
        />
        <LessonCard
          index={2}
          lesson={{
            id: 3,
            title: "Event Handling",
            description: "Learn how to handle events and user input.",
            instructor: "Carla",
            duration: "12 min",
            difficulty: "Intermediate",
            progress: 0,
            completed: false,
            rating: 4.0,
            thumbnail: "/images/event-handling.jpg",
            category: "React",
          }}
        />
        <LessonCard
          index={3}
          lesson={{
            id: 4,
            title: "Conditional Rendering",
            description: "Render components conditionally based on state.",
            instructor: "David",
            duration: "8 min",
            difficulty: "Intermediate",
            progress: 75,
            completed: false,
            rating: 4.3,
            thumbnail: "/images/conditional.jpg",
            category: "React",
          }}
        />
        <LessonCard
          index={4}
          lesson={{
            id: 5,
            title: "Lists and Keys",
            description: "Render lists efficiently using keys in React.",
            instructor: "Emma",
            duration: "10 min",
            difficulty: "Advanced",
            progress: 20,
            completed: false,
            rating: 4.1,
            thumbnail: "/images/lists-keys.jpg",
            category: "React",
          }}
        />
      </CardContent>
    </Card>
  );
}
