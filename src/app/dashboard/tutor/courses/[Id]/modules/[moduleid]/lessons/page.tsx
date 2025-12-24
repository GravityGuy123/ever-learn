"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Lesson {
  id: string;
  title: string;
  order: number;
  description: string;
}

export default function LessonListPage() {
  const { id, moduleid } = useParams() as { id: string; moduleid: string };
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get<Lesson[]>(
          `/api/modules/${moduleid}/lessons`
        );
        setLessons(response.data);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [moduleid]);

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div>
      <h1>Lessons</h1>
      <button onClick={() => router.push(`/dashboard/tutor/courses/${id}/modules/${moduleid}/lessons/create`)}>
        Create Lesson
      </button>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <strong>{lesson.order}. {lesson.title}</strong>
            <p>{lesson.description}</p>
            <button onClick={() => router.push(`/dashboard/tutor/courses/${id}/modules/${moduleid}/lessons/${lesson.id}`)}>
              View
            </button>
            <button onClick={() => router.push(`/dashboard/tutor/courses/${id}/modules/${moduleid}/lessons/${lesson.id}/update`)}>
              Edit
            </button>
            <button onClick={() => router.push(`/dashboard/tutor/courses/${id}/modules/${moduleid}/lessons/${lesson.id}/delete`)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}