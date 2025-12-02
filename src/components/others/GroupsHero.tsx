"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users } from "lucide-react";

// Sample groups data
const groups = [
  {
    id: 1,
    name: "React Enthusiasts",
    description: "Discuss and share your React projects with fellow learners.",
    type: "Study",
    members: 24,
    joined: true,
  },
  {
    id: 2,
    name: "Frontend Masters",
    description: "Collaborate on front-end design and development challenges.",
    type: "Project",
    members: 18,
    joined: false,
  },
  {
    id: 3,
    name: "Node.js Ninjas",
    description: "A community for backend enthusiasts to share ideas.",
    type: "Community",
    members: 30,
    joined: false,
  },
  {
    id: 4,
    name: "UI/UX Designers",
    description: "Exchange tips and feedback on design projects.",
    type: "Study",
    members: 12,
    joined: true,
  },
];

export default function GroupsHero() {
  return (
    <section className="w-full flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Groups</h1>
        <p className="text-muted-foreground">
          Explore and join groups to collaborate and learn together.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search groups..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-foreground">{group.name}</h2>
              <Badge
                className={`${
                  group.type === "Study"
                    ? "bg-blue-500 text-white"
                    : group.type === "Project"
                    ? "bg-green-500 text-white"
                    : "bg-purple-500 text-white"
                } text-xs`}
              >
                {group.type}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{group.description}</p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {group.members} members
              </span>
              <Users className="w-5 h-5 text-gray-400 dark:text-gray-300" />
            </div>

            {/* Join/Leave Button */}
            <Button
              className={`${
                group.joined
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400"
                  : "bg-course-primary text-white hover:bg-course-primary-dark"
              }`}
            >
              {group.joined ? "Leave Group" : "Join Group"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
