"use client";

import { useState, useTransition } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  Mail,
  Calendar,
} from "lucide-react";
import { updateRegistrationStatus } from "@/app/actions/organizer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegistrationItem {
  id: string;
  volunteerName: string;
  volunteerEmail: string;
  eventTitle: string;
  eventDate: string;
  selectedSkill: string;
  status: string;
  registeredAt: string;
}

interface OrganizerVolunteersClientProps {
  initialRegistrations: RegistrationItem[];
  stats: {
    total: number;
    confirmed: number;
    pending: number;
  };
}

export default function OrganizerVolunteersClient({
  initialRegistrations,
  stats,
}: OrganizerVolunteersClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("ALL");

  const handleStatusUpdate = async (
    id: string,
    newStatus: "CONFIRMED" | "REJECTED",
  ) => {
    startTransition(async () => {
      const res = await updateRegistrationStatus(id, newStatus);
      if (res.success) {
        toast.success(
          `Volunteer request ${newStatus.toLowerCase()} successfully!`,
        );
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update status.");
      }
    });
  };

  const filteredRegistrations = initialRegistrations.filter((reg) => {
    if (filter === "ALL") return true;
    if (filter === "PENDING") return reg.status === "REGISTERED";
    if (filter === "CONFIRMED") return reg.status === "CONFIRMED";
    if (filter === "REJECTED") return reg.status === "REJECTED";
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Volunteer Requests & Approval
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review, confirm, or reject volunteer applications for all your
          community events.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Requests
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
              {stats.total}
            </h3>
          </div>
          <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/60 text-teal-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Confirmed Volunteers
            </p>
            <h3 className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">
              {stats.confirmed}
            </h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending Approval
            </p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">
              {stats.pending}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 text-amber-500 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {["ALL", "PENDING", "CONFIRMED", "REJECTED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === tab
                ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Volunteers Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredRegistrations.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No volunteer requests found
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              When users register for events, their requests will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4">Volunteer</th>
                  <th className="p-4">Event Details</th>
                  <th className="p-4">Requested Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition"
                  >
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        {reg.volunteerName}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {reg.volunteerEmail}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {reg.eventTitle}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" /> {reg.eventDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold rounded-md border border-teal-200/50 dark:border-teal-800/50">
                        {reg.selectedSkill}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          reg.status === "CONFIRMED"
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                            : reg.status === "REJECTED"
                              ? "bg-red-500/10 text-red-500 border border-red-500/20"
                              : "bg-amber-50 dark:bg-amber-950/60 text-amber-500 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {reg.status === "CONFIRMED" && (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        )}
                        {reg.status === "REGISTERED" && (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {reg.status === "REJECTED" && (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {reg.status === "REGISTERED"
                          ? "Pending Approval"
                          : reg.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {reg.status === "REGISTERED" && (
                        <>
                          <button
                            disabled={isPending}
                            onClick={() =>
                              handleStatusUpdate(reg.id, "CONFIRMED")
                            }
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition shadow-sm cursor-pointer disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button
                            disabled={isPending}
                            onClick={() =>
                              handleStatusUpdate(reg.id, "REJECTED")
                            }
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white font-bold rounded-lg transition border border-red-500/20 cursor-pointer disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {reg.status === "CONFIRMED" && (
                        <span className="text-[11px] font-bold text-emerald-600">
                          Approved
                        </span>
                      )}
                      {reg.status === "REJECTED" && (
                        <span className="text-[11px] font-bold text-red-500">
                          Rejected
                        </span>
                      )}
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
