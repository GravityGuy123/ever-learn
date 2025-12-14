"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "../shared/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Student } from "@/lib/types";


export function TutorDashboardStudentsTab({ students }: { students: Student[] }) {
  // Define columns internally with proper types
  const studentColumns: Column<Student>[] = [
  {
    key: "name",
    label: "Student",
    sortable: true,
    render: (item: Student) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{item.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
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
    render: (item: Student) => (
      <div className="flex items-center gap-2 min-w-[120px]">
        <Progress value={item.progress} className="h-2 flex-1" />
        <span className="text-xs font-medium w-10">{item.progress}%</span>
      </div>
    ),
  },
  { key: "enrolledDate", label: "Enrolled", sortable: true },
];


  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Enrolled Students</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={students}
          columns={studentColumns}
          searchKey="name"
          searchPlaceholder="Search students..."
        />
      </CardContent>
    </Card>
  );
}