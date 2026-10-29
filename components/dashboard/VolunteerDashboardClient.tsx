"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, CheckCircle, Clock, ArrowRight } from "lucide-react";

interface Props {
  initialRegistrations?: any[];
  availableEvents?: any[];
  stats?: {
    totalRegistered: number;
    confirmedEvents: number;
    pendingEvents: number;
  };
}

export default function VolunteerDashboardClient({
  initialRegistrations = [],
  availableEvents = [],
  stats = { totalRegistered: 0, confirmedEvents: 0, pendingEvents: 0 },
}: Props) {
  const [registrations, setRegistrations] = useState(initialRegistrations);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Volunteer Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track your event registrations, schedules, and active participation
            status.
          </p>
        </div>
        <Link
          href="/events"
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          Browse More Events <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">
              Total Registered
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
              {stats.totalRegistered}
            </h3>
          </div>
          <div className="p-3 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-xl">
            <Calendar size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">
              Confirmed Events
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
              {stats.confirmedEvents}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">
              Pending Approval
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
              {stats.pendingEvents}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* My Registered Events */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
        <div className="mb-6">
          <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
            My Registered Events
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            View participation statuses and manage your event schedules.
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400">
            You haven&apos;t registered for any events yet. Explore available
            events to join.
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-200 dark:hover:border-slate-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {reg.title}
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {reg.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-teal-500" />
                      {reg.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-teal-500" />
                      {reg.location || "Online / N/A"}
                    </span>
                    <span>
                      Assigned Skill:{" "}
                      <strong className="text-slate-700 dark:text-slate-200">
                        {reg.selectedSkill}
                      </strong>
                    </span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg ${
                    reg.status === "CONFIRMED"
                      ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                      : reg.status === "REJECTED"
                        ? "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                        : "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Community Opportunities */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
        <h2 className="text-base font-black text-slate-900 dark:text-slate-100 mb-4">
          Upcoming Community Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!availableEvents || availableEvents.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 col-span-full">
              No upcoming events available.
            </p>
          ) : (
            availableEvents.map((ev: any) => (
              <div
                key={ev.id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    {ev.category}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 mt-2">
                    {ev.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {ev.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    {new Date(ev.date).toISOString().split("T")[0]}
                  </span>
                  <Link
                    href={`/events/${ev.id}`}
                    className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                  >
                    View Details & Join &rarr;
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
