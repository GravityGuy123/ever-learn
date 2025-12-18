"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CoursePageDetails } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { createCourseSchema } from "@/lib/schema";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

interface EditCoursePayload {
  title: string;
  description: string;
  category_id: string;
  level: string;
  duration: string;
  price: number;
}

export default function UpdateCoursePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user } = useAuth();

  const [course, setCourse] = useState<CoursePageDetails | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<EditCoursePayload>({
    title: "",
    description: "",
    category_id: "",
    level: "Beginner",
    duration: "",
    price: 0,
  });

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, categoryRes] = await Promise.all([
          axiosInstance.get<CoursePageDetails>(`/courses/${params.id}`),
          axiosInstance.get("/courses/categories"),
        ]);

        if (!user || String(user.id) !== String(courseRes.data.tutor?.id)) {
          router.replace("/403");
          return;
        }

        const fetchedCategories = categoryRes.data;
        const matchedCategory = fetchedCategories.find(
          (c: { id: string; name: string }) => c.name === courseRes.data.category
        );

        setCourse(courseRes.data);
        setCategories(fetchedCategories);

        setForm({
          title: courseRes.data.title,
          description: courseRes.data.description,
          category_id: matchedCategory?.id ?? "",
          level: courseRes.data.level,
          duration: courseRes.data.duration || "",
          price: Number(courseRes.data.price),
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || err.response?.data?.error || "Failed to load course data");
        } else {
          setError("Failed to load course data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router, user]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");

    // ✅ Validate using createCourseSchema
    const payload = { ...form, price: form.price.toString() }; // price must be string for schema
    const parseResult = createCourseSchema.omit({ image: true }).safeParse(payload);
    if (!parseResult.success) {
      const firstError = Object.values(parseResult.error.flatten().fieldErrors)
        .flat()
        .find(Boolean);
      setError(firstError || "Please fix the form errors");
      setSaving(false);
      return;
    }

    try {
      await axiosInstance.patch(`/tutor/course/${params.id}/update/`, form);
      router.push(`/dashboard/tutor/courses/${params.id}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || err.response?.data?.error || "Failed to update course");
      } else {
        setError("Failed to update course");
      }
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="w-10 h-10 text-violet-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <p className="text-center text-red-500 mt-10">Course not found</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Course</h1>
        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/tutor/courses/${course.id}`)}
        >
          Cancel
        </Button>
      </div>

      {/* IMAGE PREVIEW */}
      {course.image && (
        <div className="relative w-full max-h-[320px] aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image src={course.image} alt={course.title} fill className="object-contain" unoptimized />
        </div>
      )}

      {/* META */}
      <div className="text-sm text-gray-500 flex gap-4">
        {course.tutor && <span>By {course.tutor.full_name}</span>}
        {course.student_count !== undefined && (
          <span>{course.student_count} students enrolled</span>
        )}
      </div>

      {/* FORM */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <Input name="title" className="dark:bg-gray-800" value={form.title} onChange={handleChange} />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            aria-label="description"
            name="description"
            rows={7}
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-800 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category *</label>
          <select
            aria-label="category"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm bg-gray-800"
          >
            <option value="" disabled>Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block mb-1 font-medium">Level *</label>
          <select
            aria-label="level"
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800"
          >
            {LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <Input name="duration" className="dark:bg-gray-800" value={form.duration} onChange={handleChange} placeholder="e.g. 12 weeks" />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price (₦) *</label>
          <Input type="number" name="price" className="dark:bg-gray-800" value={form.price} onChange={handleChange} />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full text-white bg-violet-600 hover:bg-violet-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-all duration-300"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}