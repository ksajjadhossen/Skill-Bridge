"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createEventAction(formData: {
  title: string;
  description: string;
  category: string;
  location: string;
  maxCapacity: number;
  date: string;
}) {
  try {
    let organizer = await prisma.user.findFirst({
      where: { role: "ORGANIZER" },
    });

    if (!organizer) {
      organizer = await prisma.user.findFirst();
    }

    if (!organizer) {
      return {
        success: false,
        error: "No user found in database to assign as organizer.",
      };
    }

    const newEvent = await prisma.event.create({
      data: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        maxCapacity: formData.maxCapacity,
        date: new Date(formData.date),
        registrationDeadline: new Date(formData.date),
        requiredSkills: ["General Support"],
        organizerId: organizer.id,
        isPublished: true,
      },
    });

    revalidatePath("/dashboard/organizer");
    return { success: true, data: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: "Failed to create event" };
  }
}
