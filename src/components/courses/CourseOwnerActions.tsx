"use client";

import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string | number;
  handleDeleteRedirect: () => void;
}

export const CourseOwnerActions = ({
  courseId,
  handleDeleteRedirect,
}: Props) => {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        aria-label="Edit course"
        onClick={() =>
          router.push(`/dashboard/tutor/courses/${courseId}/update`)
        }
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
      >
        <Edit className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      <button
        aria-label="Delete course"
        onClick={handleDeleteRedirect}
        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition cursor-pointer"
      >
        <Trash2 className="w-5 h-5 text-red-600" />
      </button>
    </div>
  );
};