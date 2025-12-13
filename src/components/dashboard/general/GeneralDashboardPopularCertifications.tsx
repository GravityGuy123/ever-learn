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
        <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
          Popular Certifications
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
        >
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockCertifications.map((cert) => (
          <Card
            key={cert.id}
            className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900"
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-violet-50 dark:bg-violet-900 rounded-lg">
                  <Award className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {cert.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{cert.courses} courses</span>
                <span>{cert.students.toLocaleString()} enrolled</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}