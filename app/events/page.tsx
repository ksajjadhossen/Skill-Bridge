import { Suspense } from "react";
import { prisma } from "@/lib/db";
import ExploreEventsClient from "@/components/events/ExploreEventsClient";
import { Loader2 } from "lucide-react";

async function EventsFetcher() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    include: {
      registrations: true,
      organizer: { select: { name: true } },
    },
    orderBy: { date: "asc" },
  });

  const formattedEvents = events.map((ev) => ({
    id: ev.id,
    title: ev.title,
    description: ev.description ?? "",
    category: ev.category,
    date: ev.date.toISOString().split("T")[0],
    location: ev.location,
    capacity: ev.maxCapacity,
    registered: ev.registrations.length, // Database count
    organizerName: ev.organizer?.name || "Community Organizer",
  }));

  const categories = [
    "All",
    "Environment",
    "Tech & Skills",
    "Health",
    "Education",
    "Social Welfare",
  ];

  return (
    <ExploreEventsClient
      initialEvents={formattedEvents}
      categories={categories}
    />
  );
}

export default function ExploreEventsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading events...
          </p>
        </div>
      }
    >
      <EventsFetcher />
    </Suspense>
  );
}
