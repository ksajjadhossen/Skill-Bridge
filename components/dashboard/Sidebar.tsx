"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Users, LayoutDashboard, Shield } from "lucide-react";

interface SidebarProps {
  userRole: "ORGANIZER" | "VOLUNTEER";
}

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const organizerLinks = [
    {
      href: "/dashboard/organizer",
      label: "Overview & Stats",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/organizer/events",
      label: "All Events Control",
      icon: Calendar,
    },
    {
      href: "/dashboard/organizer/volunteers",
      label: "Volunteer Requests",
      icon: Users,
    },
    {
      href: "/dashboard/organizer/users",
      label: "User Roles & Hierarchy",
      icon: Shield,
    },
  ];

  const volunteerLinks = [
    {
      href: "/dashboard/volunteer",
      label: "My Dashboard",
      icon: LayoutDashboard,
    },
    { href: "/events", label: "Browse Events", icon: Calendar },
  ];

  const links = userRole === "ORGANIZER" ? organizerLinks : volunteerLinks;

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 hidden md:block min-h-screen">
      <div className="mb-8">
        <h2 className="text-sm font-black uppercase tracking-wider text-teal-400">
          {userRole === "ORGANIZER" ? "Organizer Panel" : "Volunteer Panel"}
        </h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "text-slate-400 hover:bg-teal-50/10 hover:text-teal-400"
              }`}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
