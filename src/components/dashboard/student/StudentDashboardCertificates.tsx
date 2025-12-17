"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ChevronRight, Download } from "lucide-react";

const mockCertificates = [
  { id: 1, title: "JavaScript Fundamentals", issueDate: "Nov 15, 2025", instructor: "John Smith" },
  { id: 2, title: "HTML & CSS Mastery", issueDate: "Oct 28, 2025", instructor: "Emily Brown" },
  { id: 3, title: "Git & GitHub Essentials", issueDate: "Sep 10, 2025", instructor: "Alex Rivera" },
];

export default function StudentDashboardCertificates() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4 px-4 sm:px-5">
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base sm:text-lg">
          <Award className="h-5 w-5 text-accent" />
          My Certificates
        </CardTitle>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>

      {/* Certificate Cards */}
      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="
                p-4 sm:p-5
                border border-border/30 dark:border-gray-700
                rounded-xl
                text-center
                bg-gray-50 dark:bg-gray-900
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-300
                flex flex-col items-center
              "
            >
              <Award className="h-10 w-10 text-accent mb-3" />
              <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white line-clamp-2">
                {cert.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {cert.issueDate}
              </p>

              <Button
                size="sm"
                className="mt-4 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg w-full sm:w-auto " >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}