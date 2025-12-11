"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { DataTable, type Column } from "../shared/DataTable";
import { Application } from "@/app/dashboard/tutor/mockData";


export function TutorDashboardApplicationsTab({
  applications,
}: {
  applications: Application[];
}) {
  const applicationColumns: Column<Application>[] = [
    {
      key: "name",
      label: "Applicant",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },

    {
      key: "expertise",
      label: "Expertise",
      sortable: true,
    },

    {
      key: "experience",
      label: "Experience",
      sortable: true,
    },

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
      key: "actions", // virtual key, allowed
      label: "Actions",
      render: (item) =>
        item.status === "pending" ? (
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-green-600"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-destructive"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutor Applications</CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable<Application>
          data={applications}
          columns={applicationColumns}
          searchKey="name"
          searchPlaceholder="Search applications..."
        />
      </CardContent>
    </Card>
  );
}