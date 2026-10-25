"use client";

import { X, Calendar, MapPin } from "lucide-react";

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
}

export default function UserProfileEventsModal({
  isOpen,
  onClose,
  userName,
  userEvents,
}: UserProfileEventsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {userName}&apos;s Activity & Events
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Events created or participated by this user.
        </p>

        {userEvents.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <p className="text-sm text-gray-500">
              No events found for this user.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {userEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {ev.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {ev.location}
                    </span>
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-md font-medium">
                  {ev.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
