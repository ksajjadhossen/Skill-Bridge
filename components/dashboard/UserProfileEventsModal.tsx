"use client";

import { Role } from "@prisma/client";

interface UserProfileEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: Role;
  };
  onRoleUpdate: (userId: string, newRole: string) => void;
}

export default function UserProfileEventsModal({
  isOpen,
  onClose,
  user,
  onRoleUpdate,
}: UserProfileEventsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h3 className="text-md font-black text-slate-900 dark:text-slate-100 mb-2">
          Manage Role for {user.name || "User"}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Select a new permission role for this platform user.
        </p>

        <div className="space-y-2 mb-6">
          {["ORGANIZER", "VOLUNTEER", "USER"].map((r) => (
            <button
              key={r}
              onClick={() => onRoleUpdate(user.id, r)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition border ${
                user.role === r
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
