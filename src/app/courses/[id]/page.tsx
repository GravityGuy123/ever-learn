import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import { CoursePageProps } from "@/lib/types";
import { GetCourseComponent } from "@/components/courses/GetCourseComponent";

export default async function PublicCourseDetailsPage({
  params,
}: CoursePageProps) {
  // Must use await even when u are told not to because the request needs to be waited for
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-96">
              <Spinner className="w-12 h-12 text-violet-600" />
            </div>
          }
        >
          <div>
            <GetCourseComponent id={id} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
