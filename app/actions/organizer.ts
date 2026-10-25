"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateRegistrationStatus(
  registrationId: string,
  newStatus: any,
) {
  try {
    await prisma.eventRegistration.update({
      where: { id: registrationId },
      data: { status: newStatus },
    });
    revalidatePath("/dashboard/organizer");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateUserRole(userId: string, newRole: any) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath("/dashboard/organizer");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update role" };
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return { success: false, error: "Event not found or already deleted." };
    }

    await prisma.eventRegistration.deleteMany({
      where: { eventId: eventId },
    });

    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/dashboard/organizer");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}
