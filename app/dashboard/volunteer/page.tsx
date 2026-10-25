"use client";

import { Calendar, MapPin, XCircle } from "lucide-react";

export default function VolunteerDashboard() {
  const registeredEvents = [
    {
      id: "reg-1",
      eventTitle: "Clean Dhaka Green City Movement",
      date: "2026-11-05",
      location: "Dhanmondi Lake",
      category: "Environment",
      status: "CONFIRMED",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
        My Registered Events
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Track your participation and upcoming volunteer commitments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {registeredEvents.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                  Status: {item.status}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {item.eventTitle}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                <MapPin className="w-4 h-4 text-red-500" />
                {item.location}
              </p>
            </div>

            <button className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer">
              <XCircle className="w-4 h-4" />
              Cancel Registration
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
