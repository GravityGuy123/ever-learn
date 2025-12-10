"use client";

import { useState } from "react";
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
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  PlusCircle,
  Edit,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockCourses = [
  { id: 1, title: "Complete React Masterclass", students: 2450, completionRate: 68, revenue: 24500, status: "published", rating: 4.8 },
  { id: 2, title: "Advanced TypeScript Patterns", students: 1280, completionRate: 45, revenue: 12800, status: "published", rating: 4.7 },
  { id: 3, title: "Node.js Backend Development", students: 980, completionRate: 52, revenue: 9800, status: "draft", rating: 0 },
  { id: 4, title: "GraphQL Fundamentals", students: 650, completionRate: 72, revenue: 6500, status: "published", rating: 4.9 },
];

const mockStudents = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "React Masterclass", progress: 85, enrolledDate: "Nov 5, 2025" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", course: "TypeScript Patterns", progress: 60, enrolledDate: "Nov 12, 2025" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", course: "React Masterclass", progress: 45, enrolledDate: "Nov 18, 2025" },
  { id: 4, name: "David Brown", email: "david@example.com", course: "GraphQL Fundamentals", progress: 92, enrolledDate: "Oct 28, 2025" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", course: "Node.js Backend", progress: 30, enrolledDate: "Nov 22, 2025" },
];

const mockApplications = [
  { id: 1, name: "Frank Lee", email: "frank@example.com", expertise: "Machine Learning", experience: "5 years", status: "pending", appliedDate: "Dec 1, 2025" },
  { id: 2, name: "Grace Kim", email: "grace@example.com", expertise: "Mobile Development", experience: "3 years", status: "pending", appliedDate: "Nov 28, 2025" },
  { id: 3, name: "Henry Chen", email: "henry@example.com", expertise: "Cloud Computing", experience: "7 years", status: "approved", appliedDate: "Nov 20, 2025" },
];

export default function TutorDashboardPage() {
  const [activeTab, setActiveTab] = useState("courses");

  const studentColumns = [
    {
      key: "name",
      label: "Student",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {item.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    { key: "course", label: "Course", sortable: true },
    {
      key: "progress",
      label: "Progress",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <Progress value={item.progress} className="h-2 flex-1" />
          <span className="text-xs font-medium w-10">{item.progress}%</span>
        </div>
      ),
    },
    { key: "enrolledDate", label: "Enrolled", sortable: true },
  ];

  const applicationColumns = [
    {
      key: "name",
      label: "Applicant",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {item.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    { key: "expertise", label: "Expertise", sortable: true },
    { key: "experience", label: "Experience", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <Badge
          variant={
            item.status === "approved"
              ? "default"
              : item.status === "pending"
              ? "secondary"
              : "destructive"
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) =>
        item.status === "pending" ? (
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
              <CheckCircle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive">
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <DashboardLayout currentRole="tutor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">Tutor Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and track student progress</p>
          </div>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Course
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Students" value="5,360" icon={Users} trend={{ value: 12, isPositive: true }} />
          <StatsCard title="Active Courses" value={3} icon={BookOpen} subtitle="1 draft" />
          <StatsCard title="Total Revenue" value="$53,600" icon={DollarSign} trend={{ value: 8, isPositive: true }} />
          <StatsCard title="Avg. Completion" value="62%" icon={TrendingUp} trend={{ value: 5, isPositive: true }} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Courses */}
          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-4">
              {mockCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{course.title}</h3>
                            <Badge variant={course.status === "published" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {course.students.toLocaleString()} students
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              {course.completionRate}% completion
                            </span>
                            {course.rating > 0 && (
                              <span className="text-amber-500">★ {course.rating}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-lg">${course.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Total Revenue</p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" />
                              View Course
                            </DropdownMenuItem>

                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Edit className="h-4 w-4" />
                              Edit Course
                            </DropdownMenuItem>

                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <BarChart3 className="h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students */}
          <TabsContent value="students">
            <Card>
              <CardHeader><CardTitle>Enrolled Students</CardTitle></CardHeader>
              <CardContent>
                <DataTable
                  data={mockStudents}
                  columns={studentColumns}
                  searchKey="name"
                  searchPlaceholder="Search students..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications">
            <Card>
              <CardHeader><CardTitle>Tutor Applications</CardTitle></CardHeader>
              <CardContent>
                <DataTable
                  data={mockApplications}
                  columns={applicationColumns}
                  searchKey="name"
                  searchPlaceholder="Search applications..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings */}
          <TabsContent value="earnings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Earnings Overview</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold">$8,450</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Payout</p>
                        <p className="text-2xl font-bold">$2,340</p>
                      </div>
                      <Clock className="h-8 w-8 text-amber-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">All Time</p>
                        <p className="text-2xl font-bold">$53,600</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <Button className="w-full">Request Payout</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Revenue by Course</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCourses
                      .filter(c => c.status === "published")
                      .map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate flex-1">
                              {course.title}
                            </span>
                            <span className="text-sm font-bold">
                              ${course.revenue.toLocaleString()}
                            </span>
                          </div>

                          <Progress
                            value={(course.revenue / 24500) * 100}
                            className="h-2"
                          />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
