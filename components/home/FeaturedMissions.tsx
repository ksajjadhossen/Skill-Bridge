"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight } from "lucide-react";

const missions = [
  {
    title: "City-Wide Tree Plantation Drive",
    category: "Environment",
    date: "Nov 15, 2026",
    location: "Central Park, Dhaka",
    slots: "3 Slots Left",
  },
  {
    title: "Digital Literacy Workshop for Youth",
    category: "Education",
    date: "Nov 22, 2026",
    location: "Gulshan Center",
    slots: "5 Slots Left",
  },
  {
    title: "Community Food Bank Distribution",
    category: "Social Welfare",
    date: "Dec 02, 2026",
    location: "Mirpur Community Hall",
    slots: "Capacity Full",
  },
];

export default function FeaturedMissions() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>Live Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Featured Community{" "}
            <span className="text-teal-600 dark:text-teal-400">Missions</span>
          </h2>
        </div>
        <Link
          href="/events"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group"
        >
          <span>View All Missions & Tickets</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((ev, idx) => {
          const isFull = ev.slots === "Capacity Full";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {ev.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isFull
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {ev.slots}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {ev.title}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar
                      size={14}
                      className="text-teal-600 dark:text-teal-400"
                    />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={14}
                      className="text-teal-600 dark:text-teal-400"
                    />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/events"
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
                  isFull
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 pointer-events-none"
                    : "bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-600 hover:text-white text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 shadow-sm"
                }`}
              >
                <Ticket size={15} />
                <span>{isFull ? "Event Full" : "Claim Ticket Pass"}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
