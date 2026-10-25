"use client";

import { Calendar, MapPin, Users, Tag, ArrowRight, Heart } from "lucide-react";
import { useState } from "react";

export interface EventProps {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  capacity: number;
  registered: number;
  description?: string;
}

export default function EventCard({ event }: { event: EventProps }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const isFull = event.registered >= event.capacity;
  const percentage = Math.min(
    Math.round((event.registered / event.capacity) * 100),
    100,
  );

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "environment":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "tech & skills":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
      case "health":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "education":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
    }
  };

  return (
    <div className="group relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-xl p-5 border border-teal-100/80 dark:border-teal-900/40 shadow-lg shadow-teal-950/5 hover:shadow-xl hover:shadow-teal-500/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Category Badge & Favorite Button */}
        <div className="flex justify-between items-center mb-3 relative z-10">
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold border flex items-center gap-1.5 backdrop-blur-md ${getCategoryColor(
              event.category,
            )}`}
          >
            <Tag className="w-3.5 h-3.5" />
            {event.category}
          </span>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-1.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-90"
            aria-label="Add to Favorites"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        </div>

        {/* Event Title */}
        <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-2.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Date & Location */}
        <div className="space-y-1.5 mb-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-rose-50 dark:bg-slate-800 text-rose-500">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>

      {/* Progress & Action Bottom Bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        {/* Capacity Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-semibold">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-teal-500" /> Slots Filled
            </span>
            <span
              className={
                isFull
                  ? "text-rose-500 font-bold"
                  : "text-slate-700 dark:text-slate-200"
              }
            >
              {event.registered} / {event.capacity} ({percentage}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFull
                  ? "bg-rose-500"
                  : "bg-linear-to-r from-teal-500 to-cyan-400"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* View Button */}
        <button
          disabled={isFull}
          className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md ${
            isFull
              ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none"
              : "bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-teal-500/20 active:scale-95"
          }`}
        >
          {isFull ? (
            "Registration Closed"
          ) : (
            <>
              <span>Join Initiative</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
