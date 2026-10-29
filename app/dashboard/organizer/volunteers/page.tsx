import { Suspense } from "react";
import VolunteerDashboardClient from "@/components/dashboard/OrganizerDashboardClient";
import { prisma } from "@/lib/db";

// Allow blocking route to prevent un-cached navigation warning in Next.js 16
export const instant = false;

async function VolunteerDashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ volunteerId?: string }>;
}) {
  const resolvedParams = await searchParams;

  let volunteerId = resolvedParams.volunteerId;

  if (!volunteerId) {
    const firstVolunteer = await prisma.user.findFirst({
      where: { role: "VOLUNTEER" },
    });
    volunteerId = firstVolunteer ? firstVolunteer.id : "default-volunteer-id";
  }

  const registrations = await prisma.eventRegistration.findMany({
    where: { userId: volunteerId },
    include: {
      event: {
        include: {
          organizer: { select: { name: true, email: true } },
        },
      },
    },
    orderBy: { registeredAt: "desc" },
  });

  const availableEvents = await prisma.event.findMany({
    where: { isPublished: true, date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 5,
  });

  const totalRegistered = registrations.length;
  const confirmedEvents = registrations.filter(
    (r) => r.status === "CONFIRMED",
  ).length;
  const pendingEvents = registrations.filter(
    (r) => r.status === "REGISTERED",
  ).length;

  const formattedRegistrations = registrations.map((r) => ({
    id: r.id,
    eventId: r.event.id,
    title: r.event.title,
    category: r.event.category,
    location: r.event.location,
    date: r.event.date.toISOString().split("T")[0],
    organizerName: r.event.organizer.name,
    selectedSkill: r.selectedSkill,
    status: r.status,
    registeredAt: r.registeredAt.toISOString().split("T")[0],
  }));

  const stats = {
    totalRegistered,
    confirmedEvents,
    pendingEvents,
  };

  return (
    <VolunteerDashboardClient
      initialRegistrations={formattedRegistrations}
      availableEvents={availableEvents}
      stats={stats}
    />
  );
}

export default function VolunteerDashboardPage(props: {
  searchParams: Promise<{ volunteerId?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[70vh] w-full">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Loading Volunteer Dashboard...
            </p>
          </div>
        </div>
      }
    >
      <VolunteerDashboardContent {...props} />
    </Suspense>
  );
}
