"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Tag,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

interface VolunteerDashboardClientProps {
  initialRegistrations: any[];
  availableEvents: any[];
  stats: {
    totalRegistered: number;
    confirmedEvents: number;
    pendingEvents: number;
  };
}

export default function VolunteerDashboardClient({
  initialRegistrations,
  availableEvents,
  stats,
}: VolunteerDashboardClientProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Volunteer Requests & Approval
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Review, confirm, or reject volunteer applications for all your
            community events.
          </p>
        </div>

        <Link
          href="/events"
          className="px-5 py-2.5 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-teal-500/20 transition cursor-pointer"
        >
          Browse More Events
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Total Registered
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalRegistered}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Confirmed Events
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.confirmedEvents}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Pending Approval
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.pendingEvents}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          My Registered Events
        </h2>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {registrations.length === 0 ? (
            <p className="text-sm text-gray-500 py-6 text-center">
              You haven&apos;t registered for any events yet. Explore events and
              join community drives!
            </p>
          ) : (
            registrations.map((reg) => (
              <div
                key={reg.id}
                className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    {reg.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-500" />{" "}
                      {reg.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />{" "}
                      {reg.location}
                    </span>
                    <span>•</span>
                    <span>Skill: {reg.selectedSkill}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      reg.status === "CONFIRMED"
                        ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {reg.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Upcoming Community Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableEvents.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">
              No upcoming events available.
            </p>
          ) : (
            availableEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col justify-between"
              >
                <div>
                  <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg text-xs font-semibold">
                    {ev.category}
                  </span>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-base mt-2">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {ev.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {ev.date.toISOString().split("T")[0]}
                  </span>
                  <Link
                    href={`/events/${ev.id}`}
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    View Details & Join <ArrowRight className="w-3 h-3" />
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
