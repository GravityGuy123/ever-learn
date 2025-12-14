"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCourses, mockStudents, mockApplications } from "./mockData";
import { TutorDashboardHeader } from "@/components/dashboard/tutor/TutorDashboardHeader";
import { TutorDashboardStats } from "@/components/dashboard/tutor/TutorDashboardStats";
import { TutorDashboardApplicationsTab } from "@/components/dashboard/tutor/TutorDashboardApplicationsTab";
import { TutorDashboardEarningsTab } from "@/components/dashboard/tutor/TutorDashboardEarningsTab";
import { TutorDashboardStudentsTab } from "@/components/dashboard/tutor/TutorDashboardStudentsTab";
import { TutorDashboardCoursesTab } from "@/components/dashboard/tutor/TutorDashboardCoursesTab";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function TutorDashboardPage() {
  const [activeTab, setActiveTab] = useState("courses");

  const { isLoggedIn } = useAuth();
    const router = useRouter();
  
    /* ---------- AUTH GUARD ---------- */
    useEffect(() => {
      if (!isLoggedIn) {
        const timer = setTimeout(() => {
          router.replace("/login");
        }, 2000);
  
        return () => clearTimeout(timer);
      }
    }, [isLoggedIn, router]);
  
    if (!isLoggedIn) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-xl font-semibold">Not logged in</h2>
          <p className="text-muted-foreground">
            Please log in to access the tutor dashboard.
          </p>
          <Button onClick={() => router.push("/login")}>
            Go to Login
          </Button>
          <p className="text-xs text-muted-foreground">
            Redirecting automatically…
          </p>
        </div>
      );
    }

  return (
    <div className="space-y-6">
      {/* Header */}
      <TutorDashboardHeader />

      {/* Stats */}
      <TutorDashboardStats />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <TutorDashboardCoursesTab courses={mockCourses} />
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students">
          <TutorDashboardStudentsTab students={mockStudents} />
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <TutorDashboardApplicationsTab applications={mockApplications} />
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings">
          <TutorDashboardEarningsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}