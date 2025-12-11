import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GeneralDashboardRoleApplication() {

    return (
        <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-heading">
                  Ready to Share Your Expertise?
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Join our community of educators and help thousands of students achieve their learning goals. Apply to become a tutor, moderator, or administrator.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" size="lg">
                  <GraduationCap className="h-5 w-5" /> Become a Tutor <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" /> Apply as Moderator
                </Button>
                <Button variant="outline" className="gap-2">
                  <ShieldCheck className="h-4 w-4" /> Admin Role
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
    )
}