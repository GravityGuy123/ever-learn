"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { CourseCard } from "@/components/dashboard/shared/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  Shield, 
  ShieldCheck, 
  Award,
  Megaphone,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: string;
  category_id: string | null;
  thumbnail_url: string | null;
  price: number;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

// Mock data for demo
const mockCertifications = [
  { id: 1, title: "Full Stack Developer", courses: 12, students: 2500 },
  { id: 2, title: "Data Science Professional", courses: 8, students: 1800 },
  { id: 3, title: "Cloud Architecture Expert", courses: 10, students: 1200 },
  { id: 4, title: "UI/UX Design Master", courses: 6, students: 950 },
];

const mockAnnouncements = [
  { id: 1, title: "New Python Bootcamp launching next week!", date: "Dec 5, 2025", type: "new" },
  { id: 2, title: "Platform maintenance scheduled for Dec 15", date: "Dec 3, 2025", type: "update" },
  { id: 3, title: "Holiday discounts on all courses - 30% off!", date: "Dec 1, 2025", type: "promo" },
];

const GeneralDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [coursesRes, categoriesRes] = await Promise.all([
        supabase.from("courses").select("*").limit(6),
        supabase.from("categories").select("*").limit(8),
      ]);
      if (coursesRes.data) setCourses(coursesRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      setLoading(false);
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" /> Platform Updates
            </CardTitle>
            <Button variant="ghost" size="sm">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnnouncements.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant={a.type === "new" ? "default" : a.type === "promo" ? "secondary" : "outline"}>
                      {a.type}
                    </Badge>
                    <span className="font-medium">{a.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{a.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Browse Categories</h2>
            <Button variant="ghost" size="sm" asChild>
              <a href="/courses">View all <ChevronRight className="h-4 w-4 ml-1" /></a>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="animate-pulse"><CardContent className="p-4 h-20" /></Card>
              ))
            ) : (
              categories.map(c => (
                <Card key={c.id} className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Featured Courses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Featured Courses</h2>
            <Button variant="ghost" size="sm" asChild>
              <a href="/courses">View all <ChevronRight className="h-4 w-4 ml-1" /></a>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-40 bg-muted relative w-full" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardContent>
                </Card>
              ))
            ) : (
              courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  thumbnail={course.thumbnail_url ? (
                    <Image
                      src={course.thumbnail_url}
                      alt={course.title}
                      width={400}
                      height={240}
                      className="rounded-lg object-cover"
                    />
                  ) : undefined}
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
              ))
            )}
          </div>
        </section>

        {/* Popular Certifications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Popular Certifications</h2>
            <Button variant="ghost" size="sm">View all <ChevronRight className="h-4 w-4 ml-1" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCertifications.map(cert => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm">{cert.title}</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{cert.courses} courses</span>
                    <span>{cert.students.toLocaleString()} enrolled</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Apply for Role Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-heading">
                  Ready to Share Your Expertise?
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Join our community of educators and help thousands of students achieve their learning goals. Apply to become a tutor, moderator, or administrator.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" size="lg">
                  <GraduationCap className="h-5 w-5" /> Become a Tutor <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" /> Apply as Moderator
                </Button>
                <Button variant="outline" className="gap-2">
                  <ShieldCheck className="h-4 w-4" /> Admin Role
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default GeneralDashboard;
