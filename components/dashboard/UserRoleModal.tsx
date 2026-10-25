"use client";

import { useState } from "react";
import { X, Shield, UserCheck } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem;
  onRoleUpdate: (userId: string, newRole: string) => Promise<void>;
}

export default function UserRoleModal({
  isOpen,
  onClose,
  user,
  onRoleUpdate,
}: UserRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    setLoading(true);
    await onRoleUpdate(user.id, selectedRole);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-teal-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Manage User Role
          </h3>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Role (Promotion / Demotion)
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="USER">USER</option>
              <option value="VOLUNTEER">VOLUNTEER</option>
              <option value="ORGANIZER">ORGANIZER</option>
            </select>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl text-sm transition cursor-pointer"
          >
            {loading ? "Updating..." : "Save Role Change"}
          </button>
        </div>
      </div>
    </div>
  );
}
