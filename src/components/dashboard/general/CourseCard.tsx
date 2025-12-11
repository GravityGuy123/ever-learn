"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseCardProps } from "@/lib/types";



const levelColors = {
  Beginner:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
        "overflow-hidden hover:shadow-md transition-all group",
        featured && "ring-2 ring-primary",
        className
      )}
    >
      {/* Thumbnail Section */}
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-accent/5">
        {thumbnail ? (
          typeof thumbnail === "string" ? (
            <Image
              src={thumbnail}
              alt={title}
              width={400}
              height={240}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
            />
          ) : (
            thumbnail
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary/50" />
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}

        {/* Category Badge */}
        <Badge className="absolute top-2 left-2" variant="secondary">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Level & Rating */}
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", levelColors[level])}>{level}</Badge>

          {rating && (
            <div className="flex items-center gap-1 text-sm text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Title + tutor */}
        <div>
          <h3 className="font-semibold font-heading line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{tutor}</p>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {/* Duration + Students */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
        {price !== undefined ? (
          <span className="font-bold text-lg">
            {price === 0 ? "Free" : `₦${price.toLocaleString()}`}
          </span>
        ) : (
          <span />
        )}

        <div className="flex gap-2">
          {onView && (
            <Button variant="outline" size="sm" onClick={onView}>
              View
            </Button>
          )}

          {onEnroll && (
            <Button size="sm" onClick={onEnroll}>
              Enroll
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};