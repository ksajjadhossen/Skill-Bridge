"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { updateRegistrationStatus } from "@/app/actions/organizer";

interface ManagerProps {
  initialEvents: any[];
}

export default function VolunteerApprovalManager({
  initialEvents,
}: ManagerProps) {
  const [events, setEvents] = useState(initialEvents);

  const handleStatusChange = async (
    registrationId: string,
    newStatus: "CONFIRMED" | "REJECTED",
  ) => {
    const res = await updateRegistrationStatus(registrationId, newStatus);
    if (res.success) {
      setEvents((prev) =>
        prev.map((ev) => ({
          ...ev,
          registrations: ev.registrations.map((reg: any) =>
            reg.id === registrationId ? { ...reg, status: newStatus } : reg,
          ),
        })),
      );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 w-full">
      <div className="mb-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
          Volunteer Join Requests
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review pending volunteer applications and accept or reject them
          directly.
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event: any) => {
          const pendingRegs = event.registrations.filter(
            (r: any) => r.status === "REGISTERED",
          );
          if (pendingRegs.length === 0) return null;

          return (
            <div
              key={event.id}
              className="border border-slate-100 dark:border-slate-800 rounded-xl p-4"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 flex items-center justify-between">
                <span>{event.title}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-semibold">
                  {pendingRegs.length} Pending Request(s)
                </span>
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {pendingRegs.map((reg: any) => (
                  <div
                    key={reg.id}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {reg.user.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {reg.user.email} • Skill:{" "}
                        {reg.selectedSkill || "General"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(reg.id, "CONFIRMED")}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
                      >
                        <Check size={14} /> Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(reg.id, "REJECTED")}
                        className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {events.every(
          (e: any) =>
            e.registrations.filter((r: any) => r.status === "REGISTERED")
              .length === 0,
        ) && (
          <div className="text-center py-10 text-xs text-slate-400">
            No pending volunteer requests found across your events.
          </div>
        )}
      </div>
    </div>
  );
}
