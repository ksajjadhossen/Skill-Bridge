"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // NextAuth v5 style auth import

// Register volunteer for an event and save to database
export async function registerForEvent(eventId: string, selectedSkill: string) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Please log in first to register!" };
    }

    // Get user id from session or database email lookup
    const userEmail = session.user.email;
    const user = userEmail
      ? await prisma.user.findUnique({ where: { email: userEmail } })
      : null;

    // @ts-ignore
    const userId = user?.id || session?.user?.id;

    if (!userId) {
      return {
        success: false,
        message: "User not found. Please log in again.",
      };
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { registrations: true },
    });

    if (!event) {
      return { success: false, message: "Event not found." };
    }

    // Check capacity limit
    if (event.registrations.length >= event.maxCapacity) {
      return { success: false, message: "Event slots are fully booked!" };
    }

    // Check duplicate registration
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: { eventId, userId },
    });

    if (existingRegistration) {
      return {
        success: false,
        message: "You are already registered for this event.",
      };
    }

    // Save registration permanently in PostgreSQL database
    await prisma.eventRegistration.create({
      data: {
        eventId,
        userId,
        selectedSkill,
        status: "REGISTERED",
      },
    });

    revalidatePath("/events");
    return { success: true, message: "Registration successful!" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong." };
  }
}

// Delete an event
export async function deleteEvent(eventId: string) {
  try {
    await prisma.eventRegistration.deleteMany({
      where: { eventId },
    });

    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/dashboard/organizer");
    revalidatePath("/events");
    return { success: true, message: "Event deleted successfully." };
  } catch (error) {
    console.error("Delete event error:", error);
    return { success: false, message: "Failed to delete event." };
  }
}
