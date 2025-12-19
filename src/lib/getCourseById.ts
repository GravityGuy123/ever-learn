import { ApiResponse, CoursePageDetails } from "@/lib/types";

export async function getCourseById(id: string): Promise<ApiResponse<CoursePageDetails>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, { cache: "no-store" });

    if (!res.ok) {
      if (res.status === 404) return { data: undefined, error: "Course does not exist." };
      if (res.status === 403) return { data: undefined, error: "You do not have permission." };
      return { data: undefined, error: "An unexpected error occurred." };
    }

    const data: CoursePageDetails = await res.json();
    return { data, error: "" };
  } catch {
    return { data: undefined, error: "Failed to fetch course." };
  }
}