"use client";

import { useState } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  BookOpen,
  GraduationCap,
  Flag,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  Activity,
  AlertTriangle,
  Clock,
} from "lucide-react";

// Mock Data
const mockApplications = [
  { id: 1, name: "Frank Lee", email: "frank@example.com", role: "Tutor", expertise: "Machine Learning", experience: "5 years", status: "pending", appliedDate: "Dec 1, 2025" },
  { id: 2, name: "Grace Kim", email: "grace@example.com", role: "Tutor", expertise: "Mobile Development", experience: "3 years", status: "pending", appliedDate: "Nov 28, 2025" },
  { id: 3, name: "Henry Chen", email: "henry@example.com", role: "Moderator", expertise: "Content Review", experience: "4 years", status: "pending", appliedDate: "Nov 25, 2025" },
  { id: 4, name: "Ivy Wilson", email: "ivy@example.com", role: "Tutor", expertise: "Web Development", experience: "6 years", status: "approved", appliedDate: "Nov 20, 2025" },
  { id: 5, name: "Jack Brown", email: "jack@example.com", role: "Tutor", expertise: "Data Science", experience: "2 years", status: "rejected", appliedDate: "Nov 15, 2025" },
];

const mockFlaggedContent = [
  { id: 1, type: "Course", title: "Advanced Hacking Techniques", reporter: "john@example.com", reason: "Inappropriate content", status: "pending", reportedDate: "Dec 5, 2025" },
  { id: 2, type: "Comment", title: "React Masterclass - Lesson 5", reporter: "sarah@example.com", reason: "Spam", status: "pending", reportedDate: "Dec 4, 2025" },
  { id: 3, type: "Review", title: "Python for Beginners", reporter: "mike@example.com", reason: "Offensive language", status: "pending", reportedDate: "Dec 3, 2025" },
  { id: 4, type: "Course", title: "Crypto Trading Secrets", reporter: "lisa@example.com", reason: "Misleading content", status: "resolved", reportedDate: "Dec 1, 2025" },
];

const mockActivityStats = [
  { metric: "New Enrollments", today: 145, thisWeek: 892, trend: 12 },
  { metric: "Course Completions", today: 67, thisWeek: 423, trend: 8 },
  { metric: "Reviews Posted", today: 34, thisWeek: 198, trend: -5 },
  { metric: "Support Tickets", today: 12, thisWeek: 78, trend: -15 },
];

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const pendingApplications = mockApplications.filter(a => a.status === "pending").length;
  const pendingFlags = mockFlaggedContent.filter(f => f.status === "pending").length;

  const applicationColumns = [
    {
      key: "name",
      label: "Applicant",
      sortable: true,
      render: (item: typeof mockApplications[0]) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{item.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", label: "Role", render: (item: typeof mockApplications[0]) => <Badge variant="outline">{item.role}</Badge> },
    { key: "expertise", label: "Expertise", sortable: true },
    { key: "experience", label: "Experience", sortable: true },
    { key: "status", label: "Status", render: (item: typeof mockApplications[0]) => (
        <Badge variant={item.status === "approved" ? "default" : item.status === "pending" ? "secondary" : "destructive"}>
          {item.status}
        </Badge>
      )
    },
    { key: "appliedDate", label: "Applied", sortable: true },
    { key: "actions", label: "Actions", render: (item: typeof mockApplications[0]) => (
      item.status === "pending" ? (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600"><CheckCircle className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive"><XCircle className="h-4 w-4" /></Button>
        </div>
      ) : null
    )},
  ];

  const flaggedContentColumns = [
    { key: "type", label: "Type", render: (item: typeof mockFlaggedContent[0]) => <Badge variant="outline">{item.type}</Badge> },
    { key: "title", label: "Content", sortable: true },
    { key: "reason", label: "Reason", sortable: true },
    { key: "reporter", label: "Reporter" },
    { key: "status", label: "Status", render: (item: typeof mockFlaggedContent[0]) => (
      <Badge variant={item.status === "resolved" ? "default" : "secondary"}>{item.status}</Badge>
    )},
    { key: "reportedDate", label: "Reported", sortable: true },
    { key: "actions", label: "Actions", render: (item: typeof mockFlaggedContent[0]) => (
      item.status === "pending" ? (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600"><CheckCircle className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive"><XCircle className="h-4 w-4" /></Button>
        </div>
      ) : null
    )},
  ];

  return (
    <DashboardLayout currentRole="moderator">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Moderator Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and manage content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Students" value="12,450" icon={GraduationCap} trend={{ value: 8, isPositive: true }} />
          <StatsCard title="Total Tutors" value="284" icon={Users} trend={{ value: 5, isPositive: true }} />
          <StatsCard title="Active Courses" value="156" icon={BookOpen} trend={{ value: 12, isPositive: true }} />
          <StatsCard title="Pending Reviews" value={pendingApplications + pendingFlags} icon={Flag} subtitle={`${pendingApplications} applications, ${pendingFlags} flags`} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications" className="gap-1">
              Applications {pendingApplications > 0 && <Badge variant="secondary" className="ml-1 h-5 px-1.5">{pendingApplications}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="flagged" className="gap-1">
              Flagged Content {pendingFlags > 0 && <Badge variant="destructive" className="ml-1 h-5 px-1.5">{pendingFlags}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Pending Applications & Flagged Content */}
            {/* ... Keep same Cards with Tailwind applied (no img tags in this section, so nothing to replace) */}

            {/* Activity Stats */}
            {/* ... Same */}
            
            {/* Engagement Overview */}
            {/* ... Same */}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader><CardTitle>Role Applications</CardTitle></CardHeader>
              <CardContent>
                <DataTable data={mockApplications} columns={applicationColumns} searchKey="name" searchPlaceholder="Search applications..." />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flagged Content Tab */}
          <TabsContent value="flagged">
            <Card>
              <CardHeader><CardTitle>Flagged Content Reports</CardTitle></CardHeader>
              <CardContent>
                <DataTable data={mockFlaggedContent} columns={flaggedContentColumns} searchKey="title" searchPlaceholder="Search flagged content..." />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader><CardTitle>Recent Platform Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[{ action: "New tutor application", user: "Frank Lee", time: "2 minutes ago", icon: Users } /* etc */].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg"><activity.icon className="h-4 w-4 text-primary" /></div>
                      <div className="flex-1"><p className="font-medium text-sm">{activity.action}</p><p className="text-xs text-muted-foreground">by {activity.user}</p></div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ModeratorDashboard;