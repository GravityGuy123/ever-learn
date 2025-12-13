"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseCardProps } from "@/lib/types";

const levelColors = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export const CourseCard = ({
  title,
  description,
  tutor,
  thumbnail,
  category,
  level,
  duration,
  studentCount,
  rating,
  price,
  featured = false,
  onEnroll,
  onView,
  className,
}: CourseCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-all group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-accent/5 dark:from-primary/20 dark:via-primary/10 dark:to-accent/10">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={240}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary/50 dark:text-primary/40" />
          </div>
        )}

        {featured && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}

        <Badge className="absolute top-2 left-2" variant="secondary">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3 text-gray-900 dark:text-gray-100">
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", levelColors[level])}>{level}</Badge>
          {rating && (
            <div className="flex items-center gap-1 text-sm text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold font-heading line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground dark:text-gray-300">{tutor}</p>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          {studentCount !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{studentCount.toLocaleString()} students</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {price !== undefined && (
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {price === 0 ? "Free" : `₦${price.toLocaleString()}`}
          </span>
        )}
        <div className="flex gap-2">
          {onView && (
            <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-100" onClick={onView}>
              View
            </Button>
          )}
          {onEnroll && (
            <Button size="sm" className="bg-violet-600 dark:text-white hover:bg-violet-500" onClick={onEnroll}>
              Enroll
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};