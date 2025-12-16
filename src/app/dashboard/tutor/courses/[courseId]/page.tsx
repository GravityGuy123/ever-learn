"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { CourseDetailsPageProps } from "@/lib/types";


export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetailsPageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/courses/${id}/`);
        setCourse(res.data);
      } catch {
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading course...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {course.image && (
        <div className="relative h-60 w-full rounded overflow-hidden">
          <Image src={course.image} alt={course.title} fill className="object-cover" unoptimized />
        </div>
      )}
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-sm text-gray-600">Level: {course.level}</p>
      {course.duration && <p className="text-sm text-gray-600">Duration: {course.duration}</p>}
      <p className="text-lg mt-4">{course.description}</p>
      <p className="text-lg font-bold mt-4">₦{course.price}</p>
      <Button onClick={() => router.push("/enroll")}>Enroll Now</Button>
    </div>
  );
}