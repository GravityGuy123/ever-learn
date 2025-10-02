"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Clock, Star, ChevronRight, CheckCircle2 } from "lucide-react";

// Define Lesson type
export type Lesson = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  completed: boolean;
  rating: number;
  thumbnail: string;
  category: string;
};

export default function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index }}
      whileHover={{ scale: 1.01 }}
      className="p-6 hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Thumbnail with completed badge */}
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <Image
            src="/assets/react1.jpg"
            alt="Lesson Thumbnail"
            width={128}
            height={80}
            className="w-32 h-20 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Play className="w-8 h-8 text-white" />
          </div>
          {lesson.completed && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-stat-green rounded-full p-1 shadow">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Lesson Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Badge variant="outline" className="text-xs mb-2">{lesson.category}</Badge>
              <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{lesson.description}</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.instructor}`} />
                <AvatarFallback>{lesson.instructor?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{lesson.instructor}</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{lesson.duration}</span>
            </div>

            <Badge
              variant="outline"
              className={`text-xs ${
                lesson.difficulty === "Beginner"
                  ? "border-stat-green text-stat-green"
                  : lesson.difficulty === "Intermediate"
                  ? "border-course-primary text-course-primary"
                  : "border-red-500 text-red-500"
              }`}
            >
              {lesson.difficulty}
            </Badge>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{lesson.rating}</span>
            </div>
          </div>

          {/* Progress */}
          {lesson.progress > 0 && (
            <motion.div initial={{ width: 0 }} animate={{ width: `${lesson.progress}%` }} transition={{ duration: 1 }} className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium">{lesson.progress}%</span>
              </div>
              <Progress value={lesson.progress} className="h-1" />
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className={`${lesson.completed ? "bg-stat-green hover:bg-stat-green/90" : "bg-course-primary hover:bg-course-primary-dark"}`}
              >
                <Play className="w-4 h-4 mr-2" />
                {lesson.completed ? "Review" : lesson.progress > 0 ? "Continue" : "Start"}
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Resources
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}