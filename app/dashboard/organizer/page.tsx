import { Suspense } from "react";
import OrganizerDashboardClient from "@/components/dashboard/OrganizerDashboardClient";
import { prisma } from "@/lib/db";

async function OrganizerDashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ organizerId?: string }>;
}) {
  const resolvedParams = await searchParams;

  let organizerId = resolvedParams.organizerId;

  if (!organizerId) {
    const firstOrganizer = await prisma.user.findFirst({
      where: { role: "ORGANIZER" },
    });
    organizerId = firstOrganizer ? firstOrganizer.id : "default-organizer-id";
  }

  const events = await prisma.event.findMany({
    where: { organizerId },
    include: {
      registrations: {
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      },
    },
    orderBy: { date: "desc" },
  });

  const platformUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { createdAt: "desc" },
  });

  const totalEvents = events.length;
  const completedEvents = events.filter(
    (e) => new Date(e.date) < new Date(),
  ).length;

  const capacityData = events.map((e) => {
    const registered = e.registrations.length;
    return { name: e.title, registered, capacity: e.maxCapacity };
  });

  const totalVolunteers = capacityData.reduce(
    (acc, curr) => acc + curr.registered,
    0,
  );
  const availableSlots = capacityData.reduce(
    (acc, curr) => acc + Math.max(0, curr.capacity - curr.registered),
    0,
  );

  const categoryMap: { [key: string]: number } = {};
  events.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + 1;
  });
  const eventsCategoryData = Object.keys(categoryMap).map((name) => ({
    name,
    count: categoryMap[name],
  }));

  const formattedEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    category: e.category,
    capacity: e.maxCapacity,
    registeredCount: e.registrations.length,
    date: e.date.toISOString().split("T")[0],
    organizerId: e.organizerId,
    registrations: e.registrations.map((r) => ({
      id: r.id,
      user: r.user,
      createdAt: r.registeredAt.toISOString().split("T")[0],
      selectedSkill: r.selectedSkill,
      status: r.status,
    })),
  }));

  const formattedUsers = platformUsers.map((u) => {
    const userEvents = events.filter((e) => e.organizerId === u.id);
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      events: userEvents.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date.toISOString().split("T")[0],
        location: e.location,
        category: e.category,
      })),
    };
  });

  const stats = {
    totalEvents,
    totalVolunteers,
    availableSlots,
    completedEvents,
  };

  return (
    <OrganizerDashboardClient
      initialEvents={formattedEvents}
      initialUsers={formattedUsers}
      stats={stats}
      eventsCategoryData={eventsCategoryData}
      capacityData={capacityData}
    />
  );
}

export default function OrganizerDashboardPage(props: {
  searchParams: Promise<{ organizerId?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-slate-500">
          Loading Dashboard...
        </div>
      }
    >
      <OrganizerDashboardContent {...props} />
    </Suspense>
  );
}
