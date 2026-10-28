"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  QrCode,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
} from "lucide-react";

export default function TicketPassPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-md mx-auto p-6 rounded-3xl bg-white dark:bg-linear-to-br dark:from-slate-900 dark:via-teal-950/60 dark:to-slate-900 border border-slate-200 dark:border-teal-500/30 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300"
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-dashed border-slate-200 dark:border-teal-500/30 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Ticket className="text-teal-600 dark:text-teal-400" size={20} />
          <span className="text-xs font-bold tracking-wider text-teal-700 dark:text-teal-300 uppercase">
            Official Volunteer Ticket
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          CONFIRMED
        </span>
      </div>

      {/* Ticket Details */}
      <div className="space-y-3">
        <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
          City-Wide Tree Plantation Drive
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-teal-600 dark:text-teal-400" />
            <span>Nov 15, 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-teal-600 dark:text-teal-400" />
            <span>Central Park, Dhaka</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <User size={14} className="text-teal-600 dark:text-teal-400" />
          <span>Ticket Holder: Registered Volunteer</span>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-teal-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm">
            <QrCode size={42} />
          </div>
          <div>
            <p className="text-[11px] font-mono font-semibold text-teal-700 dark:text-teal-300">
              PASS-#SKB-2026-89
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Scan at entrance for check-in
            </p>
          </div>
        </div>
        <CheckCircle2 size={24} className="text-teal-600 dark:text-teal-400" />
      </div>
    </motion.div>
  );
}
