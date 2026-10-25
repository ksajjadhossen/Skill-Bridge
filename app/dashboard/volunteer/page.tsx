import VolunteerDashboardClient from "@/components/dashboard/VolunteerDashboardClient";
import { prisma } from "@/lib/db";

export default async function VolunteerDashboardPage({
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
