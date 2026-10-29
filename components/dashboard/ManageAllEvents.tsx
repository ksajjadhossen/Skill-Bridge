"use client";

import { useState } from "react";
import { Trash2, Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { deleteEventByOrganizer } from "@/app/actions/organizer";
import DeleteEventModal from "@/components/dashboard/DeleteEventModal";

interface ManageEventsProps {
  initialEvents: any[];
}

export default function ManageAllEvents({ initialEvents }: ManageEventsProps) {
  const [events, setEvents] = useState(initialEvents);
  const [eventToDelete, setEventToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    setDeletingId(eventToDelete.id);
    try {
      const res = await deleteEventByOrganizer(eventToDelete.id);

      if (res && res.success) {
        setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
        setEventToDelete(null);
      } else {
        alert(res?.error || "Failed to delete the event.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 w-full">
      <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
            All Platform Events Control
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review all events created across the platform and remove invalid or
            outdated ones.
          </p>
        </div>
        <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 text-xs font-bold rounded-xl">
          Total: {events.length} Events
        </span>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400">
            No events found in the system.
          </div>
        ) : (
          events.map((event: any) => (
            <div
              key={event.id}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-200 dark:hover:border-slate-700 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {event.title}
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {event.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-teal-500" />
                    {new Date(event.date).toISOString().split("T")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-teal-500" />
                    {event.location || "Online / N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} className="text-teal-500" />
                    Registered: {event.registrations.length} /{" "}
                    {event.maxCapacity}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Organizer:{" "}
                    <strong className="text-slate-700 dark:text-slate-200">
                      {event.organizer?.name || "Unknown"}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Trigger Delete Modal with individual loading state */}
              <button
                onClick={() =>
                  setEventToDelete({ id: event.id, title: event.title })
                }
                disabled={deletingId === event.id}
                className="px-3.5 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              >
                {deletingId === event.id ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete Event
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <DeleteEventModal
          isOpen={!!eventToDelete}
          onClose={() => setEventToDelete(null)}
          onConfirm={handleConfirmDelete}
          eventTitle={eventToDelete.title}
        />
      )}
    </div>
  );
}
