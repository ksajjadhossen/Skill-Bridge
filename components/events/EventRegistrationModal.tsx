"use client";

import { X, FileText } from "lucide-react";

interface EventRegistrationModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  agreed: boolean;
  setAgreed: (agreed: boolean) => void;
  isVolunteer: boolean;
  setIsVolunteer: (val: boolean) => void;
  loading: boolean;
}

export default function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onSubmit,
  selectedSkill,
  setSelectedSkill,
  agreed,
  setAgreed,
  isVolunteer,
  setIsVolunteer,
  loading,
}: EventRegistrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col relative">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Event Registration & Terms
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {event.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="overflow-y-auto flex-1 py-4 pr-1 space-y-4"
        >
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
            <h4 className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              Event Overview
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {event.description ||
                "Join this community-driven initiative to create positive social impact."}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Your Volunteer Role / Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-teal-500"
            >
              <option value="General Support">General Support</option>
              <option value="First Aid & Medical">First Aid & Medical</option>
              <option value="Logistics & Coordination">
                Logistics & Coordination
              </option>
              <option value="Crowd Management">Crowd Management</option>
            </select>
          </div>

          {/* Volunteer Request Checkbox with State */}
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50">
            <input
              type="checkbox"
              id={`volunteer-req-${event.id}`}
              checked={isVolunteer}
              onChange={(e) => setIsVolunteer(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
            />
            <label
              htmlFor={`volunteer-req-${event.id}`}
              className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Also send a request to join as an active volunteer for this event
            </label>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-500" /> Terms &
              Conditions
            </h4>
            <div className="h-24 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-[11px] text-slate-500 dark:text-slate-400 overflow-y-auto space-y-2 leading-relaxed">
              <p>
                1. Volunteers must arrive at the designated location at least 15
                minutes prior.
              </p>
              <p>
                2. Participants are expected to behave professionally and
                maintain decorum.
              </p>
              <p>
                3. Safety guidelines provided by lead organizers must be
                followed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id={`terms-${event.id}`}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
            />
            <label
              htmlFor={`terms-${event.id}`}
              className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              I have read and agree to all the terms, conditions, and code of
              conduct.
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-md shadow-teal-500/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : "Confirm & Get Pass"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
