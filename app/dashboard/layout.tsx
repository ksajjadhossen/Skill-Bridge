import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Shield } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Fixed Left Sidebar - Always visible */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between sticky top-0 h-screen shrink-0">
        <div className="space-y-6">
          {/* Brand/Logo */}
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              SB
            </div>
            <span className="text-xl font-bold tracking-tight">
              SkillBridge
            </span>
          </div>

          {/* Navigation Links for Routing */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Organizer Panel
            </p>
            <Link
              href="/dashboard/organizer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              <LayoutDashboard size={16} />
              <span>Overview & Stats</span>
            </Link>
            <Link
              href="/dashboard/organizer/volunteers"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              <Users size={16} />
              <span>Volunteer Requests</span>
            </Link>
            <Link
              href="/dashboard/organizer/users"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              <Shield size={16} />
              <span>User Roles & Hierarchy</span>
            </Link>
          </nav>
        </div>

        <div className="text-xs text-slate-400 px-3">
          <p>© 2026 SkillBridge</p>
        </div>
      </aside>

      {/* Main Dynamic Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-6 sm:p-10 w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
