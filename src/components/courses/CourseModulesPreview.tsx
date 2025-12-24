"use client";

import { Button } from "@/components/ui/button";
import { CoursePageDetails } from "@/lib/types";
import { Edit, Trash2, BookOpen, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string | number;
  modules: CoursePageDetails["modules"];
  loadingModules: boolean;
}

export const CourseModulesPreview = ({
  courseId,
  modules,
  loadingModules,
}: Props) => {
  const router = useRouter();

  return (
    <section className="pt-12 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl font-semibold">Course Modules</h2>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() =>
              router.push(
                `/dashboard/tutor/courses/${courseId}/modules/create`
              )
            }
            className="bg-violet-600 hover:bg-violet-700 cursor-pointer"
          >
            + Add Module
          </Button>

          <Button
            onClick={() =>
              router.push(
                `/dashboard/tutor/courses/${courseId}/modules`
              )
            }
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 cursor-pointer"
          >
            Manage Modules
          </Button>
        </div>
      </div>

      {loadingModules ? (
        <p className="text-sm text-gray-500">Loading modules…</p>
      ) : modules.length === 0 ? (
        <p className="text-sm text-gray-500">
          No modules yet. Start structuring your course by adding one.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {modules.slice(0, 6).map((module) => (
            <div
              key={module.id}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {module.order}. {module.title}
                </h3>

                <span className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                  Module
                </span>
              </div>

              {module.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {module.description}
                </p>
              )}

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/tutor/courses/${courseId}/modules/${module.id}`
                    )
                  }
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>

                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/tutor/courses/${courseId}/modules/${module.id}/lessons`
                    )
                  }
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-md bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900 dark:text-violet-300 transition cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  Lessons
                </button>

                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/tutor/courses/${courseId}/modules/${module.id}/update`
                    )
                  }
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 transition cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/tutor/courses/${courseId}/modules/${module.id}/delete`
                    )
                  }
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};