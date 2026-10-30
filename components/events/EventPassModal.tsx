"use client";

import { Ticket, Download } from "lucide-react";

interface EventPassModalProps {
  ticketData: any;
  isOpen: boolean;
  onClose: () => void;
  onDownloadPDF: () => void;
}

export default function EventPassModal({
  ticketData,
  isOpen,
  onClose,
  onDownloadPDF,
}: EventPassModalProps) {
  if (!isOpen || !ticketData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-teal-500/30 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-teal-500 to-cyan-500"></div>

        <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-teal-200 dark:border-teal-800">
          <Ticket className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-1">
          Registration Confirmed!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Your official volunteer pass has been generated successfully.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-left space-y-3 mb-6 relative">
          <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              SkillBridge Event Pass
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {ticketData.ticketId}
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
              {ticketData.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Role:{" "}
              <span className="font-bold text-teal-600">
                {ticketData.skill}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">
                DATE
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {ticketData.date}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">
                LOCATION
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block">
                {ticketData.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDownloadPDF}
            className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF Pass
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
