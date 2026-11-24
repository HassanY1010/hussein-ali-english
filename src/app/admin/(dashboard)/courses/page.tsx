import { getCourses } from "@/lib/data/repository";
import AdminCoursesClient from "@/components/admin/AdminCoursesClient";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getCourses();
  return <AdminCoursesClient courses={courses} />;
}
