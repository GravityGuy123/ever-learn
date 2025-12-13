"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCourses, mockStudents, mockApplications } from "./mockData";
import { TutorDashboardHeader } from "@/components/dashboard/tutor/TutorDashboardHeader";
import { TutorDashboardStats } from "@/components/dashboard/tutor/TutorDashboardStats";
import { TutorDashboardApplicationsTab } from "@/components/dashboard/tutor/TutorDashboardApplicationsTab";
import { TutorDashboardEarningsTab } from "@/components/dashboard/tutor/TutorDashboardEarningsTab";
import { TutorDashboardStudentsTab } from "@/components/dashboard/tutor/TutorDashboardStudentsTab";
import { TutorDashboardCoursesTab } from "@/components/dashboard/tutor/TutorDashboardCoursesTab";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";

export default function TutorDashboardPage() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <DashboardLayout currentRole="tutor">
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
    </DashboardLayout>
  );
}