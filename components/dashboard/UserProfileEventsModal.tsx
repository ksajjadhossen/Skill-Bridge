"use client";

import { useState } from "react";
import { Shield, Search } from "lucide-react";
import { updateUserRole } from "@/app/actions/organizer";
import UserRoleModal from "@/components/dashboard/UserRoleModal";

interface HierarchyProps {
  initialUsers: any[];
}

export default function UserHierarchyManager({ initialUsers }: HierarchyProps) {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserForRole, setSelectedUserForRole] = useState<any | null>(
    null,
  );

  // Sorting: ORGANIZER -> VOLUNTEER -> USER
  const sortedUsers = [...users].sort((a, b) => {
    const score = (role: string) => {
      if (role === "ORGANIZER") return 3;
      if (role === "VOLUNTEER") return 2;
      return 1;
    };
    return score(b.role) - score(a.role);
  });

  const filteredUsers = sortedUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    const res = await updateUserRole(userId, newRole);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
      setSelectedUserForRole(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
            Platform Users & Hierarchy
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Organizers are listed first, followed by Volunteers and standard
            Users.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-teal-500"
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {filteredUsers.map((u: any) => (
          <div
            key={u.id}
            className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-extrabold flex items-center justify-center text-sm border border-teal-200/50 dark:border-teal-800/50">
                {u.name ? u.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                  {u.name || "Unnamed User"}
                </p>
                <p className="text-[11px] text-slate-400">{u.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${
                  u.role === "ORGANIZER"
                    ? "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                    : u.role === "VOLUNTEER"
                      ? "bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                {u.role}
              </span>

              {/* Manage Role Button opening the Modal */}
              <button
                onClick={() => setSelectedUserForRole(u)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-teal-600 dark:bg-slate-800 dark:hover:bg-teal-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Shield size={14} />
                Manage Role
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Role Modal Component */}
      {selectedUserForRole && (
        <UserRoleModal
          isOpen={!!selectedUserForRole}
          onClose={() => setSelectedUserForRole(null)}
          user={selectedUserForRole}
          onRoleUpdate={handleRoleUpdate}
        />
      )}
    </div>
  );
}
