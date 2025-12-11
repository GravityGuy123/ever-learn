"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TutorDashboardHeader() {
  return (
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
  );
}