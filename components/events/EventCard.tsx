"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, X, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    category: string;
    date: string;
    location: string;
    capacity: number;
    registered?: number;
    organizerName?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("General Support");
  const [loading, setLoading] = useState(false);

  const registeredCount = event.registered ?? 0;
  const capacityCount = event.capacity ?? 1;
  const percentage = Math.min(
    Math.round((registeredCount / capacityCount) * 100),
    100,
  );

  const handleConfirmRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful! Redirecting to payment...");
      setIsModalOpen(false);
      router.push(`/payment?eventId=${event.id}&skill=${selectedSkill}`);
    }, 1000);
  };

  return (
    <>
      <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:border-teal-500/40 dark:hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 dark:bg-teal-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-md text-[11px] font-extrabold tracking-wider uppercase border border-teal-200/50 dark:border-teal-800/50 shadow-xs">
              {event.category}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              By {event.organizerName || "Organizer"}
            </span>
          </div>

          <h3 className="font-black text-slate-900 dark:text-slate-100 text-lg mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
            {event.title}
          </h3>

          <div className="space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-3.5 h-3.5 text-teal-500" /> {event.date}
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" /> {event.location}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5">
            <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Slots Filled
              </span>
              <span className="text-teal-600 dark:text-teal-400">
                {registeredCount} / {capacityCount} ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
              <div
                className="bg-linear-to-r from-teal-500 to-cyan-500 h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-slate-900 hover:bg-teal-600 dark:bg-slate-800 dark:hover:bg-teal-600 text-white rounded-lg text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-teal-500/25 active:scale-[0.98]"
          >
            Join Initiative →
          </button>
        </div>
      </div>

      {isModalOpen && (
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
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleConfirmRegistration}
              className="overflow-y-auto flex-1 py-4 pr-1 space-y-4"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <h4 className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                  Event Overview
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description ||
                    "Join this community-driven initiative to create positive social impact. Your active participation helps us build a better and greener neighborhood."}
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
                  <option value="First Aid & Medical">
                    First Aid & Medical
                  </option>
                  <option value="Logistics & Coordination">
                    Logistics & Coordination
                  </option>
                  <option value="Crowd Management">Crowd Management</option>
                </select>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-500" /> Terms &
                  Conditions
                </h4>
                <div className="h-28 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-[11px] text-slate-500 dark:text-slate-400 overflow-y-auto space-y-2 leading-relaxed">
                  <p>
                    1. Volunteers must arrive at the designated location at
                    least 15 minutes prior to the event start time.
                  </p>
                  <p>
                    2. Participants are expected to behave professionally and
                    maintain community decorum throughout the event.
                  </p>
                  <p>
                    3. Registration fees or material contributions (if
                    applicable) are processed securely and are non-refundable.
                  </p>
                  <p>
                    4. The organizing committee holds the right to reschedule or
                    modify event activities under unavoidable circumstances.
                  </p>
                  <p>
                    5. Safety guidelines and instructions provided by the lead
                    organizers must be strictly followed on-site.
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
                  I have read and agree to all the terms, conditions, and code
                  of conduct.
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-md shadow-teal-500/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Processing..." : "Confirm & Proceed to Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
