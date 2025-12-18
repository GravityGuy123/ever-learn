"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios.config";
import { Button } from "@/components/ui/button";

export default function DeleteCoursePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await axiosInstance.delete(
        `/tutor/course/${params.id}/delete/`
      );
      router.push("/tutor/courses");
    } catch {
      setError("Failed to delete course");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 rounded-lg border bg-background space-y-4">
      <h1 className="text-xl font-bold text-red-600">
        Delete Course
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        This action cannot be undone. The course will be removed
        from public view.
      </p>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="flex gap-3">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </Button>

        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}