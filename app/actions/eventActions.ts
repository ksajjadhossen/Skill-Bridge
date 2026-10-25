"use server";

import { prisma as db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

interface EventData {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  maxCapacity: number;
  registrationDeadline: string;
  requiredSkills: string[];
}

// Create a new event
export async function createEvent(data: EventData) {
  const session = await auth();

  // Ensure only ORGANIZER can create events
  if (!session?.user || session.user.role !== "ORGANIZER") {
    throw new Error("Unauthorized: Only organizers can create events.");
  }

  try {
    const newEvent = await db.event.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        date: new Date(data.date),
        maxCapacity: Number(data.maxCapacity),
        registrationDeadline: new Date(data.registrationDeadline),
        requiredSkills: data.requiredSkills,
        organizerId: session.user.id as string,
        isPublished: true,
      },
    });

    // Revalidate public events and organizer dashboard
    revalidatePath("/events");
    revalidatePath("/dashboard/organizer");
    revalidatePath("/", "layout");

    return { success: true, event: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: "Failed to create event in database." };
  }
}

// Delete an event
export async function deleteEvent(eventId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ORGANIZER") {
    throw new Error("Unauthorized action.");
  }

  try {
    await db.event.delete({
      where: {
        id: eventId,
        organizerId: session.user.id, // Ensure organizer owns this event
      },
    });

    // Revalidate public events and organizer dashboard
    revalidatePath("/events");
    revalidatePath("/dashboard/organizer");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: "Failed to delete event." };
  }
}
