import { Card, CardContent } from "@/components/ui/card";
import { Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demo
const mockCertifications = [
  { id: 1, title: "Full Stack Developer", courses: 12, students: 2500 },
  { id: 2, title: "Data Science Professional", courses: 8, students: 1800 },
  { id: 3, title: "Cloud Architecture Expert", courses: 10, students: 1200 },
  { id: 4, title: "UI/UX Design Master", courses: 6, students: 950 },
];

export default function GeneralDashboardPopularCertifications() {

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Popular Certifications</h2>
            <Button variant="ghost" size="sm">View all <ChevronRight className="h-4 w-4 ml-1" /></Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCertifications.map(cert => (
                <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                        <Award className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm">{cert.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{cert.courses} courses</span>
                    <span>{cert.students.toLocaleString()} enrolled</span>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>
    )
}