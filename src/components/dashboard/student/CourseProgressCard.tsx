"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle, BookOpen } from "lucide-react";
import { CourseProgressCardProps } from "@/lib/types";


export const CourseProgressCard = ({ title, instructor, thumbnail, progress, lessonsCompleted, totalLessons, duration, category, onContinue, }: CourseProgressCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary-foreground/50" />
          </div>
        )}
        <Badge className="absolute top-2 left-2 bg-background/90 text-foreground">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-400">{instructor}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <PlayCircle className="h-3 w-3" />
            <span>
              {lessonsCompleted}/{totalLessons} lessons
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>

        <Button onClick={onContinue} className="w-full" size="sm">
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
};