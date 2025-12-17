import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardRoleApplication() {
  return (
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Text Section */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-gray-900 dark:text-white">
              Ready to Share Your Expertise?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Join our community of educators and help thousands of students achieve their learning goals. Apply to become a tutor, moderator, or administrator.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600" size="lg">
              <GraduationCap className="h-5 w-5" />
              <Link href="/apply/tutor">
                Become a Tutor
              </Link>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Shield className="h-4 w-4" />
              <Link href="/apply/moderator">
                Apply as Moderator
              </Link>
            </Button>
            {/* <Button variant="outline" className="gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShieldCheck className="h-4 w-4" /> 
              <Link href="/apply/admin">
                Admin Role
              </Link>
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}