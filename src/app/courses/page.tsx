"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { axiosInstance, baseUrl } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

interface PublicCourse {
  id: string;
  title: string;
  description?: string;
  level: string;
  price: number;
  duration?: string;
  image?: string | null;
  student_count?: number;
  category: string;
  tutor?: {
    id: string;
    full_name: string;
    username: string;
  };
  is_deleted?: boolean;
  is_active?: boolean;
}

interface CurrentUser {
  id: string;
  is_tutor: boolean;
}

type TabFilter = "all" | "active" | "archived" | "mine";

export default function PublicCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<PublicCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<PublicCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TabFilter>("all");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const MEDIA_BASE = baseUrl.replace("/api", "");

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axiosInstance.get<CurrentUser>("/auth/me");
        setCurrentUser(res.data);
      } catch {
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<PublicCourse[]>("/courses");
        setCourses(res.data);
        setFilteredCourses(res.data);
        setError(null);
      } catch {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on tab
  useEffect(() => {
    if (filter === "all") setFilteredCourses(courses);
    if (filter === "active") setFilteredCourses(courses.filter(c => !c.is_deleted));
    if (filter === "archived") setFilteredCourses(courses.filter(c => c.is_deleted));
    if (filter === "mine" && currentUser)
      setFilteredCourses(courses.filter(c => c.tutor?.id === currentUser.id));
  }, [filter, courses, currentUser]);

  const handleRestoreCourse = async (courseId: string) => {
    try {
      setLoading(true);
      // Correct endpoint
      await axiosInstance.post(`/tutor/courses/${courseId}/restore/`);
      setCourses(prev =>
        prev.map(c => (c.id === courseId ? { ...c, is_deleted: false } : c))
      );
    } catch {
      setError("Failed to restore course.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (courses.length === 0) return <p className="text-center mt-10">No courses found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* TABS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "active", "archived"].map((tab) => {
          const labels: Record<string, string> = {
            all: "All",
            active: "Active",
            archived: "Archived",
          };
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab as TabFilter)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}

        {/* Only show "Mine" tab if user is a tutor */}
        {currentUser?.is_tutor && (
          <button
            onClick={() => setFilter("mine")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "mine"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Mine
          </button>
        )}
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const imageUrl =
            course.image?.startsWith("http")
              ? course.image
              : course.image
              ? `${MEDIA_BASE}${course.image}`
              : null;

          return (
            <div
              key={course.id}
              className={`border rounded-lg overflow-hidden shadow hover:shadow-lg transition relative ${
                course.is_deleted ? "opacity-70" : ""
              }`}
            >
              {/* IMAGE + CATEGORY BADGE */}
              {imageUrl && (
                <div className="relative h-44 w-full">
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {course.category && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg z-10">
                      {course.category}
                    </span>
                  )}
                </div>
              )}

              <div className="p-4 space-y-2">
                {/* LEVEL */}
                <span className="inline-block text-xs text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                  {course.level}
                </span>

                <h2 className="text-lg font-semibold">{course.title}</h2>

                {/* TUTOR */}
                {course.tutor && (
                  <p className="text-xs text-gray-500">
                    By <span className="font-medium">{course.tutor.full_name}</span>
                  </p>
                )}

                {/* DESCRIPTION */}
                {course.description && (
                  <p className="text-sm text-gray-600">{course.description.slice(0, 100)}...</p>
                )}

                {/* META */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  {course.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  )}
                  {course.student_count !== undefined && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.student_count} {course.student_count === 1 ? "student" : "students"}
                    </div>
                  )}

                  {/* STATUS / ARCHIVED BADGE */}
                  {course.is_deleted ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-400 text-white font-semibold">
                      Archived
                    </span>
                  ) : course.is_active !== undefined ? (
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        course.is_active
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {course.is_active ? "Active" : "Inactive"}
                    </span>
                  ) : null}
                </div>

                <p className="text-sm font-bold mt-2">
                  ₦{Number(course.price).toLocaleString()}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-3 flex-wrap">
                  <Button
                    onClick={() => router.push(`/courses/${course.id}`)}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    View Course
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.push(`/courses/${course.id}/enroll`)}
                    className="flex-1"
                  >
                    Enroll
                  </Button>

                  {/* Restore button only if archived & user is the tutor */}
                  {course.is_deleted && course.tutor?.id === currentUser?.id && (
                    <Button
                      onClick={() => handleRestoreCourse(course.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}