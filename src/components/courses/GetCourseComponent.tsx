import { ApiResponse, CoursePageIdProps, CoursePageDetails } from "@/lib/types";
import { CourseComponent } from "../courses/course";
import { axiosInstance } from "@/lib/axios.config";

export async function GetCourseComponent({ id }: CoursePageIdProps) {
  const response = await getCourseById(id);

  if (!response.data) {
    return <div className="text-red-500 text-center mt-6">{response.error}</div>;
  }

  return <CourseComponent course={response.data} />;
}

async function getCourseById(id: string): Promise<ApiResponse> {
  try {
    const res = await axiosInstance.get<CoursePageDetails>(`/courses/${id}`);
    return { data: res.data, error: "" };
  } catch (err: unknown) {
    let message = "An unexpected error occurred";
    if (typeof err === "object" && err !== null) {
      const axiosErr = err as {
        response?: { status?: number; data?: { detail?: string; message?: string } };
        message?: string;
      };
      if (axiosErr.response) {
        switch (axiosErr.response.status) {
          case 404:
            message = "Course does not exist.";
            break;
          case 403:
            message = "You do not have permission to view this course.";
            break;
          default:
            message =
              axiosErr.response.data?.detail ||
              axiosErr.response.data?.message ||
              "An unexpected error occurred.";
        }
      } else if (axiosErr.message) {
        message = axiosErr.message;
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching course:", err);
    }

    return { data: undefined, error: message };
  }
}