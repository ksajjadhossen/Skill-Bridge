"use client";

import { useState } from "react";
import { X, Trash2, Calendar, MapPin, AlertTriangle } from "lucide-react";
import { deleteEvent } from "@/app/actions/organizer";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface UserProfileEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEvents: {
    id: string;
    title: string;
    date: string;
    location: string;
    category: string;
  }[];
  onEventDeleted?: (eventId: string) => void;
}

export default function UserProfileEventsModal({
  isOpen,
  onClose,
  userName,
  userEvents,
  onEventDeleted,
}: UserProfileEventsModalProps) {
  const router = useRouter();
  const [events, setEvents] = useState(userEvents);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [eventToDelete, setEventToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  if (!isOpen) return null;

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    setLoadingId(eventToDelete.id);
    const res = await deleteEvent(eventToDelete.id);
    setLoadingId(null);

    if (res.success) {
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));

      if (onEventDeleted) {
        onEventDeleted(eventToDelete.id);
      }

      setEventToDelete(null);
      toast.success("Event deleted successfully!");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete event.");
      setEventToDelete(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <Toaster position="top-right" />

      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 max-h-[85vh] flex flex-col relative">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {userName}&apos;s Created Events
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Total Posts: {events.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700 flex-1 pr-1 space-y-3">
          {events.length === 0 ? (
            <p className="text-sm text-gray-500 py-12 text-center">
              This user has not created any events yet.
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="pt-3 flex justify-between items-center gap-4"
              >
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-500" />{" "}
                      {event.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />{" "}
                      {event.location}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setEventToDelete({ id: event.id, title: event.title })
                  }
                  disabled={loadingId === event.id}
                  className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:hover:bg-red-950/50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {loadingId === event.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
          >
            Close
          </button>
        </div>

        {eventToDelete && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 rounded-3xl animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Delete Event?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  &quot;{eventToDelete.title}&quot;
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEventToDelete(null)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={loadingId === eventToDelete.id}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-red-500/20 transition cursor-pointer disabled:opacity-50"
                >
                  {loadingId === eventToDelete.id
                    ? "Deleting..."
                    : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
