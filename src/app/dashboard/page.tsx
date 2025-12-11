"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";
import { Category, DashboardCourse } from "@/lib/types";
import { CourseCard } from "@/components/dashboard/general/CourseCard";
import GeneralDashboardAnnouncements from "@/components/dashboard/general/GeneralDashboardAnnouncements";
import GeneralDashboardPopularCertifications from "@/components/dashboard/general/GeneralDashboardPopularCertifications";
import GeneralDashboardRoleApplication from "@/components/dashboard/general/GeneralDashboardRoleApplication";
import { axiosInstance } from "@/lib/axios.config";

export default function GeneralDashboard() {
  const [courses, setCourses] = useState<DashboardCourse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          axiosInstance.get("/courses/?limit=6"),
          axiosInstance.get("/categories/?limit=8"),
        ]);

        // Assuming your Django API returns data in "results" key
        setCourses(coursesRes.data.results || []);
        setCategories(categoriesRes.data.results || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout currentRole="general">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10 rounded-2xl p-6 md:p-8 text-primary-foreground">
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">Welcome to Learnix!</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Discover thousands of courses from expert instructors. Start your learning journey today and unlock your potential.
          </p>
        </div>

        {/* Announcements */}
        <GeneralDashboardAnnouncements />

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Browse Categories</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/courses">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4 h-20" />
                  </Card>
                ))
              : categories.map((c) => (
                  <Card
                    key={c.id}
                    className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{c.name}</span>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Featured Courses</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/courses">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-40 bg-muted relative w-full" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))
              : courses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    tutor={course.tutor}
                    thumbnail={course.thumbnail_url}
                    category="Technology"
                    level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                    duration={course.duration}
                    price={course.price}
                    featured={index === 0}
                    studentCount={Math.floor(Math.random() * 5000) + 500}
                    rating={4 + Math.random()}
                    onEnroll={() => {}}
                    onView={() => {}}
                  />
                ))}
          </div>
        </section>

        {/* Popular Certifications */}
        <GeneralDashboardPopularCertifications />

        {/* Apply for Role Section */}
        <GeneralDashboardRoleApplication />
      </div>
    </DashboardLayout>
  );
}