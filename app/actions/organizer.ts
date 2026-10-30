"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Register for an event & Volunteer Request
export async function registerForEvent(
  eventId: string,
  selectedSkill?: string,
  isVolunteer: boolean = true,
) {
  try {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return { success: false, message: "You must be logged in to register." };
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!currentUser) {
      return { success: false, message: "User not found in database." };
    }

    const existing = await prisma.eventRegistration.findFirst({
      where: { eventId, userId: currentUser.id },
    });

    if (existing) {
      return {
        success: false,
        message: "You have already registered for this event.",
      };
    }

    await prisma.eventRegistration.create({
      data: {
        eventId,
        userId: currentUser.id,
        selectedSkill: selectedSkill || "General Support",
        status: "REGISTERED",
      },
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/organizer");
    revalidatePath("/dashboard/organizer/volunteers");
    revalidatePath("/dashboard/volunteer");
    return { success: true };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return { success: false, message: "Failed to register for event." };
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
    revalidatePath("/dashboard/volunteer");
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
      data: { role: newRole as any },
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
    await prisma.eventRegistration.deleteMany({
      where: { eventId },
    });

    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/dashboard/organizer/events");
    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}
