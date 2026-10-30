import { prisma } from "@/lib/db";
import OrganizerStats from "@/components/dashboard/OrganizerStats";
import OrganizerAnalytics from "@/components/dashboard/OrganizerAnalytics";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Event, EventRegistration } from "@prisma/client";

type EventWithRegs = Event & {
  registrations: EventRegistration[];
};

export default async function OrganizerOverviewPage() {
  const events: EventWithRegs[] = await prisma.event.findMany({
    include: { registrations: true },
  });

  const totalEvents = events.length;
  const completedEvents = events.filter(
    (e: EventWithRegs) => new Date(e.date) < new Date(),
  ).length;

  const capacityData = events.map((e: EventWithRegs) => ({
    name: e.title,
    registered: e.registrations.length,
    capacity: e.maxCapacity,
  }));

  const totalVolunteers = capacityData.reduce(
    (
      acc: number,
      curr: { name: string; registered: number; capacity: number },
    ) => acc + curr.registered,
    0,
  );
  const availableSlots = capacityData.reduce(
    (
      acc: number,
      curr: { name: string; registered: number; capacity: number },
    ) => acc + Math.max(0, curr.capacity - curr.registered),
    0,
  );

  const categoryMap: { [key: string]: number } = {};
  events.forEach((e: EventWithRegs) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + 1;
  });
  const eventsCategoryData = Object.keys(categoryMap).map((name) => ({
    name,
    count: categoryMap[name],
  }));

  const stats = {
    totalEvents,
    totalVolunteers,
    availableSlots,
    completedEvents,
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Dashboard / Overview
          </p>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Organizer Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Monitor overall event capacity, analytics, and platform activities
            in real-time.
          </p>
        </div>

        <Link
          href="/dashboard/organizer/create-event"
          className="px-4 py-2.5 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-md shadow-teal-500/20 transition-all text-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </Link>
      </div>

      <OrganizerStats stats={stats} />

      <OrganizerAnalytics
        eventsCategoryData={eventsCategoryData}
        capacityData={capacityData}
      />
    </div>
  );
}
