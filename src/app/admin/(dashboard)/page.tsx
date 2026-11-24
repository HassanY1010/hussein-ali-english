import { getAdminStats, getCourses } from "@/lib/data/repository";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, courses] = await Promise.all([
    getAdminStats(),
    getCourses(),
  ]);

  return <AdminDashboardClient stats={stats} courses={courses} />;
}
