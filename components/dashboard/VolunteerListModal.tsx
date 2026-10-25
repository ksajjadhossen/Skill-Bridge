"use client";

import { useState } from "react";
import { X, CheckCircle, Clock, XCircle, UserCheck } from "lucide-react";

export interface VolunteerRegistration {
  id: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: string | Date;
  selectedSkill: string;
  status: "REGISTERED" | "CONFIRMED" | "ATTENDED" | "CANCELLED";
}

interface VolunteerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  registrations: VolunteerRegistration[];
  onStatusChange: (registrationId: string, newStatus: string) => Promise<void>;
}

export default function VolunteerListModal({
  isOpen,
  onClose,
  eventTitle,
  registrations,
  onStatusChange,
}: VolunteerListModalProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    await onStatusChange(id, status);
    setUpdatingId(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "ATTENDED":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-800">
        {/* Red Close Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Registered Volunteers
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Event:{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {eventTitle}
          </span>
        </p>

        {registrations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <p className="text-gray-500 dark:text-gray-400">
              No volunteers registered for this event yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[60vh]">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Volunteer</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Skill</th>
                  <th className="px-4 py-3">Reg. Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                  >
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {reg.user.name}
                    </td>
                    <td className="px-4 py-4">{reg.user.email}</td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                        {reg.selectedSkill || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(reg.status)}`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <select
                        disabled={updatingId === reg.id}
                        value={reg.status}
                        onChange={(e) =>
                          handleStatusUpdate(reg.id, e.target.value)
                        }
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="REGISTERED">REGISTERED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="ATTENDED">ATTENDED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
