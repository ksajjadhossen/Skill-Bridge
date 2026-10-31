"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import {
  Calendar,
  MapPin,
  Users,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import type { EventItemType } from "./EventCard";

interface EventRegistrationModalProps {
  event: EventItemType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  selectedSkill: string;
  setSelectedSkill: Dispatch<SetStateAction<string>>;
  agreed: boolean;
  setAgreed: Dispatch<SetStateAction<boolean>>;
  isVolunteer: boolean;
  setIsVolunteer: Dispatch<SetStateAction<boolean>>;
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

  const skills = [
    "General Support",
    "Event Management",
    "Technical Support",
    "Communication",
    "Design & Creativity",
    "Photography",
    "Content Writing",
    "Other",
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="inline-block px-3 py-1 mb-3 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-[10px] font-extrabold tracking-wider uppercase border border-teal-200/50 dark:border-teal-800/50">
              Event Registration
            </span>

            <h2
              id="registration-modal-title"
              className="text-xl font-black text-slate-900 dark:text-slate-100"
            >
              Join Initiative
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Complete the form below to register for this event.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-6 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
          <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-slate-100">
            {event.title}
          </h3>

          {event.description && (
            <p className="mb-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {event.description}
            </p>
          )}

          <div className="flex flex-col gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-500" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-500" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-teal-500" />
              <span>
                {event.registered ?? 0} / {event.capacity} registered
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="relative space-y-5">
          <div>
            <label
              htmlFor="selectedSkill"
              className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Select Your Skill / Role
            </label>

            <select
              id="selectedSkill"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isVolunteer}
                onChange={(e) => setIsVolunteer(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-teal-600"
              />

              <span>
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                  Register as a Volunteer
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  I want to participate and contribute as a volunteer.
                </span>
              </span>
            </label>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-teal-600"
              />

              <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                I agree to the event rules and regulations. I confirm that the
                information provided during registration is correct.
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-teal-600 px-4 py-3 text-xs font-extrabold text-white shadow-md shadow-teal-500/20 transition hover:bg-teal-600 dark:hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm Registration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
