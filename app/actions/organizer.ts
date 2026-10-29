"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Register for an event
export async function registerForEvent(
  eventId: string,
  userId: string,
  selectedSkill?: string,
) {
  try {
    const existing = await prisma.eventRegistration.findFirst({
      where: { eventId, userId },
    });

    if (existing) {
      return { success: false, error: "Already registered for this event." };
    }

    await prisma.eventRegistration.create({
      data: {
        eventId,
        userId,
        selectedSkill: selectedSkill || "General",
        status: "REGISTERED",
      },
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/organizer");
    return { success: true };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return { success: false, error: "Failed to register for event." };
  }
}

// Update Volunteer Registration Status (Accept / Reject)
export async function updateRegistrationStatus(
  registrationId: string,
  newStatus: "CONFIRMED" | "REJECTED",
) {
  try {
    await prisma.eventRegistration.update({
      where: { id: registrationId },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard/organizer/volunteers");
    return { success: true };
  } catch (error) {
    console.error("Failed to update registration status:", error);
    return { success: false, error: "Failed to update registration status" };
  }
}

// Update User Role & Hierarchy
export async function updateUserRole(userId: string, newRole: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/dashboard/organizer/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

// Delete Event by Organizer (All Platform Events Control)
export async function deleteEventByOrganizer(eventId: string) {
  try {
    // Delete associated registrations first to avoid foreign key constraints
    await prisma.eventRegistration.deleteMany({
      where: { eventId },
    });

    // Delete the event
    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/dashboard/organizer/events");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}
