"use client";

import { useState } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { CourseProgressCard } from "@/components/dashboard/shared/CourseProgressCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Calendar,
  Bell,
  ChevronRight,
  PlayCircle,
  FileText,
  Video,
  Download,
} from "lucide-react";

// --- Mock Data ---
const mockEnrolledCourses = [
  { id: 1, title: "Complete React Masterclass", instructor: "John Smith", progress: 68, lessonsCompleted: 24, totalLessons: 35, duration: "12h 30m", category: "Web Development", thumbnail: null },
  { id: 2, title: "Python for Data Science", instructor: "Sarah Johnson", progress: 45, lessonsCompleted: 18, totalLessons: 40, duration: "18h 00m", category: "Data Science", thumbnail: null },
  { id: 3, title: "UI/UX Design Fundamentals", instructor: "Emily Brown", progress: 92, lessonsCompleted: 23, totalLessons: 25, duration: "8h 45m", category: "Design", thumbnail: null },
];

const mockRecommendedCourses = [
  { id: 4, title: "Advanced TypeScript Patterns", instructor: "Mike Chen", category: "Web Development", duration: "6h 00m", rating: 4.8 },
  { id: 5, title: "Node.js Backend Development", instructor: "Alex Rivera", category: "Backend", duration: "15h 00m", rating: 4.7 },
  { id: 6, title: "Machine Learning Basics", instructor: "Dr. Lisa Wang", category: "AI/ML", duration: "20h 00m", rating: 4.9 },
];

const mockCertificates = [
  { id: 1, title: "JavaScript Fundamentals", issueDate: "Nov 15, 2025", instructor: "John Smith" },
  { id: 2, title: "HTML & CSS Mastery", issueDate: "Oct 28, 2025", instructor: "Emily Brown" },
  { id: 3, title: "Git & GitHub Essentials", issueDate: "Sep 10, 2025", instructor: "Alex Rivera" },
];

const mockNotifications = [
  { id: 1, type: "assignment", title: "Assignment Due Tomorrow", message: "React Project submission deadline", time: "2 hours ago", urgent: true },
  { id: 2, type: "course", title: "New Content Available", message: "Python for Data Science: Module 5 released", time: "5 hours ago", urgent: false },
  { id: 3, type: "live", title: "Live Session Starting", message: "UI/UX Q&A session in 30 minutes", time: "30 min", urgent: true },
  { id: 4, type: "certificate", title: "Certificate Ready", message: "Your JavaScript certificate is ready to download", time: "1 day ago", urgent: false },
];

const mockSchedule = [
  { id: 1, title: "React Advanced Patterns", type: "Live Session", time: "10:00 AM", date: "Today", instructor: "John Smith" },
  { id: 2, title: "Python Office Hours", type: "Q&A", time: "2:00 PM", date: "Today", instructor: "Sarah Johnson" },
  { id: 3, title: "Design Review", type: "Workshop", time: "11:00 AM", date: "Tomorrow", instructor: "Emily Brown" },
  { id: 4, title: "Weekly Coding Challenge", type: "Challenge", time: "3:00 PM", date: "Dec 12", instructor: "Platform" },
];

// --- Component ---
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("in-progress");

  return (
    <DashboardLayout currentRole="student">
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Recommended For You</CardTitle>
                <Button variant="ghost" size="sm" className="flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {mockRecommendedCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <PlayCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{course.title}</h4>
                          <p className="text-xs text-muted-foreground">{(course as any).tutor?.full_name || course.instructor} • {course.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{course.category}</Badge>
                        <Button size="sm" variant="outline">Enroll</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  My Certificates
                </CardTitle>

                <Button variant="ghost" size="sm" className="flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>

              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  {mockCertificates.map(cert => (
                    <div key={cert.id} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                      <Award className="h-10 w-10 text-accent mx-auto mb-2" />
                      <h4 className="font-medium text-sm">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issueDate}</p>

                      <Button size="sm" variant="outline" className="mt-3 gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <Badge variant="secondary">{mockNotifications.length}</Badge>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {mockNotifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        n.urgent ? "border-l-destructive bg-destructive/5" : "border-l-primary/50 bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{n.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader className="pb-2 flex items-center gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Schedule
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {mockSchedule.map(event => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {event.type === "Live Session" ? (
                          <Video className="h-4 w-4 text-primary" />
                        ) : event.type === "Q&A" ? (
                          <FileText className="h-4 w-4 text-primary" />
                        ) : (
                          <Calendar className="h-4 w-4 text-primary" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.type} • {event.tutor || event.instructor}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">{event.time}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
    </DashboardLayout>
  );
};

export default StudentDashboard;