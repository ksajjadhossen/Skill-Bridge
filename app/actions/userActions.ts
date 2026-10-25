"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";

export async function updateUserRole(targetUserId: string, newRole: Role) {
  const session = await auth();

  // Protect action: Only logged-in ORGANIZERS can manage user roles
  if (!session?.user || session.user.role !== "ORGANIZER") {
    throw new Error("Unauthorized: Only organizers can manage user roles.");
  }

  // Prevent organizers from demoting themselves to avoid lockouts
  if (session.user.id === targetUserId && newRole !== "ORGANIZER") {
    return {
      success: false,
      error: "You cannot demote yourself from Organizer.",
    };
  }

  try {
    await prisma.user.update({
      where: { id: targetUserId },
      data: { role: newRole },
    });

    // Revalidate dashboard and layout paths to clear Next.js data cache
    revalidatePath("/dashboard/organizer");
    revalidatePath("/dashboard");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role in database." };
  }
}
