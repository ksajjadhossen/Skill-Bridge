import { Suspense } from "react";
import { prisma } from "@/lib/db";
import OrganizerVolunteersClient from "@/components/dashboard/OrganizerVolunteersClient";

interface RegistrationRelation {
  id: string;
  selectedSkill: string | null;
  status: string;
  registeredAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  event: {
    id: string;
    title: string;
    date: Date;
    location: string;
  };
}

async function OrganizerVolunteersContent() {
  const registrations = (await prisma.eventRegistration.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      event: {
        select: { id: true, title: true, date: true, location: true },
      },
    },
    orderBy: { registeredAt: "desc" },
  })) as unknown as RegistrationRelation[];

  const formattedRegistrations = registrations.map((r) => ({
    id: r.id,
    volunteerName: r.user.name || "Unknown Volunteer",
    volunteerEmail: r.user.email ?? "",
    eventTitle: r.event.title,
    eventDate: r.event.date.toISOString().split("T")[0],
    selectedSkill: r.selectedSkill || "General",
    status: r.status,
    registeredAt: r.registeredAt.toISOString().split("T")[0],
  }));

  const stats = {
    total: formattedRegistrations.length,
    confirmed: formattedRegistrations.filter((r) => r.status === "CONFIRMED")
      .length,
    pending: formattedRegistrations.filter((r) => r.status === "REGISTERED")
      .length,
  };

  return (
    <OrganizerVolunteersClient
      initialRegistrations={formattedRegistrations}
      stats={stats}
    />
  );
}

export default function OrganizerVolunteersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[70vh] w-full">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">
              Loading Volunteer Requests...
            </p>
          </div>
        </div>
      }
    >
      <OrganizerVolunteersContent />
    </Suspense>
  );
}
