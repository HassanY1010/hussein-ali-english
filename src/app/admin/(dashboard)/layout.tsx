import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient user={admin}>
      {children}
    </AdminLayoutClient>
  );
}
