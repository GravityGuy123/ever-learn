import CourseManagement from "@/components/courses/CourseManagement";

export default function Page({ params }: { params: { id: string } }) {
  return <CourseManagement params={params} />;
}