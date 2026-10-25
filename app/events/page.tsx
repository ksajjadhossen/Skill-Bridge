"use client";

import { useState } from "react";
import EventCard from "@/components/events/EventCard";

export default function ExploreEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allEvents = [
    {
      id: "1",
      title: "Clean Dhaka Green City Movement",
      category: "Environment",
      date: "2026-11-05",
      location: "Dhanmondi Lake, Dhaka",
      capacity: 30,
      registered: 18,
    },
    {
      id: "2",
      title: "Youth Tech Literacy Workshop",
      category: "Tech & Skills",
      date: "2026-11-12",
      location: "Uttara Community Center",
      capacity: 20,
      registered: 20,
    },
    {
      id: "3",
      title: "Free Community Health Camp",
      category: "Health",
      date: "2026-11-20",
      location: "Mirpur 10, Dhaka",
      capacity: 50,
      registered: 35,
    },
  ];

  const categories = [
    "All",
    "Environment",
    "Tech & Skills",
    "Health",
    "Education",
  ];

  const filteredEvents =
    selectedCategory === "All"
      ? allEvents
      : allEvents.filter((ev) => ev.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
          Explore Community Events
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Join high-impact volunteer programs around you.
        </p>
      </div>

      {/* Sleek Pill Filters with less border radius */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-linear-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 border border-teal-100/50 dark:border-slate-700/50 backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
