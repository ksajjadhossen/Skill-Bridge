import { prisma } from "@/lib/db";
import UserHierarchyManager from "@/components/dashboard/UserHierarchyManager";

export default async function UsersRoutePage() {
  // Fetch users with explicit fresh data query
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full">
      <UserHierarchyManager initialUsers={users} />
    </div>
  );
}
