import { Suspense } from "react";
import { prisma } from "@/lib/db";
import UserHierarchyManager from "@/components/dashboard/UserHierarchyManager";

async function UsersContent() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { createdAt: "desc" },
  });

  return <UserHierarchyManager initialUsers={users} />;
}

export default function UsersRoutePage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[60vh] w-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">
                Loading Users & Roles...
              </p>
            </div>
          </div>
        }
      >
        <UsersContent />
      </Suspense>
    </div>
  );
}
