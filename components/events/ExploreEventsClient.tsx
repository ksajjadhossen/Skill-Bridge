"use client";

import { useState, useTransition } from "react";
import EventCard, { EventItemType } from "@/components/events/EventCard";
import { Loader2, Search } from "lucide-react";

interface ExploreEventsClientProps {
  initialEvents: EventItemType[];
  categories: string[];
}

export default function ExploreEventsClient({
  initialEvents,
  categories,
}: ExploreEventsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (cat: string) => {
    startTransition(() => {
      setSelectedCategory(cat);
    });
  };

  const filteredEvents = initialEvents.filter((ev: EventItemType) => {
    const matchesCategory =
      selectedCategory === "All" || ev.category === selectedCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Explore Community Events
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Join high-impact volunteer programs around you.
          </p>
        </div>

        {isPending && (
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-3 py-1.5 rounded-xl">
            <Loader2 className="w-4 h-4 animate-spin" />
            Filtering events...
          </div>
        )}
      </div>

      <div className="mb-6 relative max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by title or location..."
          className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 shadow-sm focus:outline-teal-500 backdrop-blur-md transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            disabled={isPending}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 ${
              selectedCategory === cat
                ? "bg-linear-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 border border-teal-100/50 dark:border-slate-700/50 backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isPending ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading events...
          </p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
            No events found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No community events matched your search or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: EventItemType) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
