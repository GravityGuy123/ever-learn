import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlayCircle } from "lucide-react";
import { RecommendedCourse } from "@/lib/types";

const mockRecommendedCourses: RecommendedCourse[] = [
  { id: 4, title: "Advanced TypeScript Patterns", category: "Web Development", duration: "6h 00m", rating: 4.8, tutor: { full_name: "Mike Chen" } },
  { id: 5, title: "Node.js Backend Development", category: "Backend", duration: "15h 00m", rating: 4.7, tutor: { full_name: "Alex Rivera" } },
  { id: 6, title: "Machine Learning Basics", category: "AI/ML", duration: "20h 00m", rating: 4.9, tutor: { full_name: "Dr. Lisa Wang" } },
];


export default function StudentDashboardRecommendations() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recommended For You</CardTitle>
            <Button variant="ghost" size="sm" className="flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            </CardHeader>

            <CardContent>
            <div className="space-y-3">
                {mockRecommendedCourses.map(course => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <PlayCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-medium text-sm">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">
                        {course.tutor?.full_name} • {course.duration}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Button size="sm" variant="outline">Enroll</Button>
                    </div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
    )
}