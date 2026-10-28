"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function AnimatedHowItWorks() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
        >
          How{" "}
          <span className="text-teal-600 dark:text-teal-400">SkillBridge</span>{" "}
          Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 text-sm sm:text-base"
        >
          Designed for organizers to publish missions and volunteers to track
          community impact seamlessly.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Organizer Workflow Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="p-8 rounded-3xl border border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-colors pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-900 flex items-center justify-center font-bold text-lg mb-6 shadow-inner">
            01
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            For Mission Organizers
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
            Publish events, leverage AI assistants to structure requirements,
            and monitor volunteers in real-time.
          </p>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="text-teal-600 dark:text-teal-400 shrink-0"
              />
              <span>Instant AI Event Description & Role Generation</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="text-teal-600 dark:text-teal-400 shrink-0"
              />
              <span>Real-time Volunteer Status Tracking</span>
            </li>
          </ul>
        </motion.div>

        {/* Volunteer Workflow Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="p-8 rounded-3xl border border-cyan-200 dark:border-cyan-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900 flex items-center justify-center font-bold text-lg mb-6 shadow-inner">
            02
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            For Passionate Volunteers
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
            Discover meaningful causes, filter by location and category, and
            claim secure digital ticket passes.
          </p>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="text-cyan-600 dark:text-cyan-400 shrink-0"
              />
              <span>Secure Digital Ticket Passes with QR Code</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="text-cyan-600 dark:text-cyan-400 shrink-0"
              />
              <span>Personal 'My Events' Portfolio Management</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
