"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  X,
  FileText,
  CheckCircle2,
} from "lucide-react";
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
    registered: number;
    organizerName?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("General Support");
  const [loading, setLoading] = useState(false);

  const percentage = Math.min(
    Math.round((event.registered / event.capacity) * 100),
    100,
  );

  const handleConfirmRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    // Simulate registration API call or redirect directly to payment/success
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful! Redirecting to payment...");
      setIsModalOpen(false);

      // পেমেন্ট পেজ বা গেটওয়েতে রিডাইরেক্ট করার রাউট
      router.push(`/payment?eventId=${event.id}&skill=${selectedSkill}`);
    }, 1000);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-xl text-xs font-bold">
              {event.category}
            </span>
          </div>

          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-2">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-teal-500" /> {event.date}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" /> {event.location}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Slots Filled
              </span>
              <span>
                {event.registered} / {event.capacity} ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-500/20 transition cursor-pointer flex items-center justify-center gap-2"
          >
            Join Initiative →
          </button>
        </div>
      </div>

      {/* Terms & Conditions / Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col relative">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  Event Registration & Terms
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {event.title}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body (Description & Terms Form) */}
            <form
              onSubmit={handleConfirmRegistration}
              className="overflow-y-auto flex-1 py-4 pr-1 space-y-5"
            >
              {/* Event Description Section */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                  Event Overview
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description ||
                    "Join this community-driven initiative to create positive social impact. Your active participation helps us build a better and greener neighborhood."}
                </p>
              </div>

              {/* Skill Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Your Volunteer Role / Skill
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-teal-500"
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

              {/* Terms and Conditions Box */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-500" /> Terms &
                  Conditions
                </h4>
                <div className="h-32 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-[11px] text-slate-500 dark:text-slate-400 overflow-y-auto space-y-2 leading-relaxed">
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

              {/* Agreement Checkbox */}
              <div className="flex items-center gap-3 pt-2">
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

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-2xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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
