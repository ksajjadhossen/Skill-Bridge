import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import VolunteerDashboardClient from "@/components/dashboard/VolunteerDashboardClient";

export const instant = false;

async function VolunteerDashboardContent() {
  const session = await auth();
  const userEmail = session?.user?.email;

  const currentUser = await prisma.user.findFirst({
    where: userEmail ? { email: userEmail } : { role: "VOLUNTEER" },
  });

  const volunteerId = currentUser ? currentUser.id : "default-volunteer-id";

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

  // Fetch upcoming available events
  const availableEvents = await prisma.event.findMany({
    where: { isPublished: true, date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 5,
  });

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
    totalRegistered: registrations.length,
    confirmedEvents: registrations.filter((r) => r.status === "CONFIRMED")
      .length,
    pendingEvents: registrations.filter((r) => r.status === "REGISTERED")
      .length,
  };

  return (
    <VolunteerDashboardClient
      initialRegistrations={formattedRegistrations}
      availableEvents={availableEvents || []}
      stats={stats}
    />
  );
}

export default function VolunteerDashboardPage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[70vh] w-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">
                Loading Volunteer Dashboard...
              </p>
            </div>
          </div>
        }
      >
        <VolunteerDashboardContent />
      </Suspense>
    </div>
  );
}
