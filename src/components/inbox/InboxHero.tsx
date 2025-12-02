"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreVertical,
  Reply,
  Forward,
  Archive,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const messages = [
  {
    id: 1,
    sender: "Leonardo Genial",
    subject: "New Assignment: Advanced React Components",
    preview: "Hi there! I've just posted a new assignment for the React course. Please check the detailed requirements...",
    time: "2 hours ago",
    unread: true,
    type: "assignment",
    avatar: "/man1"
  },
  {
    id: 2,
    sender: "Raya Safitri",
    subject: "Feedback on Your UI/UX Project",
    preview: "Great work on your latest design submission! I particularly liked your approach to the user flow...",
    time: "5 hours ago",
    unread: true,
    type: "feedback",
    avatar: "/woman2"
  },
  {
    id: 3,
    sender: "Course Platform",
    subject: "Weekly Progress Report",
    preview: "Here's your learning progress for this week. You've completed 3 lessons and earned 2 badges...",
    time: "1 day ago",
    unread: false,
    type: "system",
    avatar: "/woman1"
  },
  {
    id: 4,
    sender: "Padcateg Selrita",
    subject: "Group Project Discussion",
    preview: "The team has made significant progress on the branding project. Let's schedule a meeting to discuss...",
    time: "2 days ago",
    unread: false,
    type: "collaboration",
    avatar: "/man2"
  },
  {
    id: 5,
    sender: "Study Group",
    subject: "Weekly Study Session Reminder",
    preview: "Don't forget about our weekly study session tomorrow at 7 PM. We'll be covering advanced JavaScript concepts...",
    time: "3 days ago",
    unread: false,
    type: "reminder",
    avatar: "/woman2"
  }
];

const typeColors = {
  assignment: "bg-violet-500 text-white",
  feedback: "bg-green-500 text-white",
  system: "bg-blue-500 text-white",
  collaboration: "bg-purple-500 text-white",
  reminder: "bg-orange-500 text-white"
};

export default function InboxHero() {
  return (
    <section className="w-full flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">Inbox</h1>
        <p className="text-muted-foreground dark:text-gray-400">
          Manage your course communications and notifications
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-gray-400 w-4 h-4" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-violet-500">12</div>
            <div className="text-sm text-muted-foreground dark:text-gray-400">Unread</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">8</div>
            <div className="text-sm text-muted-foreground dark:text-gray-400">Assignments</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">24</div>
            <div className="text-sm text-muted-foreground dark:text-gray-400">Total</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">5</div>
            <div className="text-sm text-muted-foreground dark:text-gray-400">Starred</div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-muted/50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                  message.unread ? "bg-violet-100/20 dark:bg-violet-500/20" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${message.unread ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-gray-300"}`}>
                        {message.sender}
                      </h3>
                      <Badge className={`text-xs ${typeColors[message.type as keyof typeof typeColors]}`}>
                        {message.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground dark:text-gray-400 ml-auto">
                        {message.time}
                      </span>
                    </div>

                    <h4 className={`font-medium mb-2 ${message.unread ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-gray-300"}`}>
                      {message.subject}
                    </h4>

                    <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
                      {message.preview}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {message.unread && <div className="w-2 h-2 bg-violet-500 rounded-full"></div>}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button className="bg-violet-500 hover:bg-violet-600 text-white flex items-center gap-2">
          <Reply className="w-4 h-4" /> Reply All
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Forward className="w-4 h-4" /> Forward
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Archive className="w-4 h-4" /> Archive
        </Button>
        <Button variant="outline" className="flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>
    </section>
  );
}