import { db } from "@/lib/db";
import Link from "next/link";

export default async function EventsPage() {
  const events = await db.event.findMany({
    where: { isPublished: true },
    orderBy: { date: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Community Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No events available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-5 shadow-sm bg-white dark:bg-gray-800"
            >
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                {event.category}
              </span>
              <h2 className="text-xl font-semibold mt-2 mb-2">{event.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                {event.description}
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <p>📍 {event.location}</p>
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
              </div>
              <Link
                href={`/events/${event.id}`}
                className="inline-block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
