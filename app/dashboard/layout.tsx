import { auth } from "@/auth";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userRole = (session?.user as { role?: string })?.role || "VOLUNTEER";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar userRole={userRole as "ORGANIZER" | "VOLUNTEER"} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
