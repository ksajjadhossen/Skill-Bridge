"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { Search } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  capacity: number;
  maxCapacity?: number;
}

export default function EventList({ events }: { events: EventItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", ...Array.from(new Set(events.map((e) => e.category)))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "All" || event.category === selectedTag;

    return matchesSearch && matchesTag;
  });

  return (
    <div>
      {/* Search Bar & Tag Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Search Input with Icon */}
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100 shadow-sm transition"
          />
        </div>

        {/* Tag Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                selectedTag === tag
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No events found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
