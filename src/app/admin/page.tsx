import { pageMetadata } from "@/lib/metadata";
import { assertAdminAccess } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = pageMetadata({
  title: "Admin (demo)",
  description: "Demo administration dashboard for SUPGS content.",
  path: "/admin",
  noIndex: true,
});

// Read ADMIN_DEMO_ENABLED at request time, not at build time.
export const dynamic = "force-dynamic";

export default function AdminPage() {
  assertAdminAccess();
  return <AdminDashboard />;
}
