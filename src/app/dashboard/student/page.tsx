"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { CourseProgressCard } from "@/components/dashboard/student/CourseProgressCard";
import StudentDashboardRecommendations from "@/components/dashboard/student/StudentDashboardRecommendations";
import StudentDashboardCertificates from "@/components/dashboard/student/StudentDashboardCertificates";
import StudentDashboardNotifications from "@/components/dashboard/student/StudentDashboardNotifications";
import StudentDashboardSchedule from "@/components/dashboard/student/StudentDashboardSchedule";

// --- Mock Data ---
const mockEnrolledCourses = [
  { id: 1, title: "Complete React Masterclass", instructor: "John Smith", progress: 68, lessonsCompleted: 24, totalLessons: 35, duration: "12h 30m", category: "Web Development", thumbnail: null },
  { id: 2, title: "Python for Data Science", instructor: "Sarah Johnson", progress: 45, lessonsCompleted: 18, totalLessons: 40, duration: "18h 00m", category: "Data Science", thumbnail: null },
  { id: 3, title: "UI/UX Design Fundamentals", instructor: "Emily Brown", progress: 92, lessonsCompleted: 23, totalLessons: 25, duration: "8h 45m", category: "Design", thumbnail: null },
];

export default function StudentDashboard() {
  const router = useRouter();
  const { user, isLoggedIn, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("in-progress");

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Show loading while auth is being determined
  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center px-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Loading student dashboard…
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Fetching your user data…
        </p>
      </div>
    );
  }

  if (!isLoggedIn) return null; // Redirect already triggered

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Student Dashboard</h1>
        <p className="text-muted-foreground">Track your learning progress and continue your journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Courses Enrolled" value={12} icon={BookOpen} trend={{ value: 2, isPositive: true }} />
        <StatsCard title="Certificates Earned" value={5} icon={Award} trend={{ value: 1, isPositive: true }} />
        <StatsCard title="Hours Learned" value="48.5" subtitle="This month" icon={Clock} />
        <StatsCard title="Current Streak" value="12 days" icon={TrendingUp} trend={{ value: 20, isPositive: true }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* My Courses */}
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>My Courses</CardTitle>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="h-8">
                  <TabsTrigger value="in-progress" className="text-xs">In Progress</TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {mockEnrolledCourses.map(course => (
                  <CourseProgressCard key={course.id} {...course} onContinue={() => {}} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended */}
          <StudentDashboardRecommendations />

          {/* Certificates */}
          <StudentDashboardCertificates />

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* Notifications */}
          <StudentDashboardNotifications />

          {/* Schedule */}
          <StudentDashboardSchedule />

          {/* Weekly Goal */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Goal
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Learning Hours</span>
                  <span className="font-medium">8.5 / 10 hrs</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Lessons Completed</span>
                  <span className="font-medium">12 / 15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {`You're almost there! Keep it up!`} 🎯
              </p>

            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}