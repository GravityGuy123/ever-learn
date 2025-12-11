import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ChevronRight, Download } from "lucide-react";

const mockCertificates = [
  { id: 1, title: "JavaScript Fundamentals", issueDate: "Nov 15, 2025", instructor: "John Smith" },
  { id: 2, title: "HTML & CSS Mastery", issueDate: "Oct 28, 2025", instructor: "Emily Brown" },
  { id: 3, title: "Git & GitHub Essentials", issueDate: "Sep 10, 2025", instructor: "Alex Rivera" },
];

export default function StudentDashboardCertificates() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                My Certificates
            </CardTitle>

            <Button variant="ghost" size="sm" className="flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            </CardHeader>

            <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
                {mockCertificates.map(cert => (
                <div key={cert.id} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                    <Award className="h-10 w-10 text-accent mx-auto mb-2" />
                    <h4 className="font-medium text-sm">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issueDate}</p>

                    <Button size="sm" variant="outline" className="mt-3 gap-1">
                    <Download className="h-3 w-3" />
                    Download
                    </Button>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
    )
}