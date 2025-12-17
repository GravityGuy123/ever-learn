"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle, BookOpen } from "lucide-react";
import { CourseProgressCardProps } from "@/lib/types";

export const CourseProgressCard = ({
  title,
  instructor,
  thumbnail,
  progress,
  lessonsCompleted,
  totalLessons,
  duration,
  category,
  onContinue,
}: CourseProgressCardProps) => {
  return (
    <Card
      className="
        group overflow-hidden border border-border/60
        bg-background dark:bg-gray-900
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <BookOpen className="h-12 w-12 text-white/70" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category */}
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground text-xs">
          {category}
        </Badge>
      </div>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
            {instructor}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <PlayCircle className="h-4 w-4" />
            <span>
              {lessonsCompleted}/{totalLessons} lessons
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={onContinue}
          size="sm"
          className="
            w-full font-medium
            bg-gradient-to-r from-violet-600 to-indigo-600
            hover:from-violet-700 hover:to-indigo-700
            shadow-md hover:shadow-lg
            transition-all duration-300
          "
        >
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
};