import { prisma } from "@/lib/db";
import VolunteerApprovalManager from "@/components/dashboard/VolunteerApprovalManager";

export default async function VolunteersRoutePage() {
  const events = await prisma.event.findMany({
    include: {
      registrations: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
    },
  });

  return (
    <div className="w-full">
      <VolunteerApprovalManager initialEvents={events} />
    </div>
  );
}
