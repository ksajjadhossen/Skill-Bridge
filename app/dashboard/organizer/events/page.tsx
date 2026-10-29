import { Suspense } from "react";
import { prisma } from "@/lib/db";
import ManageAllEvents from "@/components/dashboard/ManageAllEvents";

export const instant = false;

async function EventsContent() {
  const events = await prisma.event.findMany({
    include: {
      organizer: { select: { name: true, email: true } },
      registrations: { select: { id: true } },
    },
    orderBy: { date: "desc" },
  });

  return <ManageAllEvents initialEvents={events} />;
}

export default function AllEventsRoutePage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[60vh] w-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">
                Loading Events Control...
              </p>
            </div>
          </div>
        }
      >
        <EventsContent />
      </Suspense>
    </div>
  );
}
