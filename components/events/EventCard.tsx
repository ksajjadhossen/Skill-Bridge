"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, AlertCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import { registerForEvent } from "@/app/actions/organizer";
import EventRegistrationModal from "./EventRegistrationModal";
import EventPassModal from "./EventPassModal";

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
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isAlreadyRegisteredModal, setIsAlreadyRegisteredModal] =
    useState(false);
  const [isLoginRequiredModal, setIsLoginRequiredModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("General Support");
  const [isVolunteer, setIsVolunteer] = useState(true); // ভলান্টিয়ার রিকোয়েস্ট চেকবক্সের স্টেট
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  const registeredCount = event.registered ?? 0;
  const capacityCount = event.capacity ?? 1;
  const percentage = Math.min(
    Math.round((registeredCount / capacityCount) * 100),
    100,
  );
  const isFull = registeredCount >= capacityCount;

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session || !session.user) {
      setIsLoginRequiredModal(true);
      return;
    }
    if (isFull) {
      toast.error("This event is fully booked!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    // এখানে isVolunteer স্টেটটি সার্ভার অ্যাকশনে পাস করা হলো
    const res = await registerForEvent(event.id, selectedSkill, isVolunteer);
    setLoading(false);

    if (!res.success) {
      setIsModalOpen(false);
      if (res.message?.includes("already registered")) {
        setIsAlreadyRegisteredModal(true);
      } else if (res.message?.includes("log in")) {
        setIsLoginRequiredModal(true);
      } else {
        toast.error(res.message || "Registration failed.");
      }
      return;
    }

    toast.success("Registration successful! Pass generated.");
    router.refresh();

    setTicketData({
      ticketId: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
      title: event.title,
      date: event.date,
      location: event.location,
      skill: selectedSkill,
      organizer: event.organizerName || "Community Organizer",
    });

    setIsModalOpen(false);
    setIsTicketOpen(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("SkillBridge Volunteer Pass", 20, 25);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(12);
    doc.text(`Ticket ID: ${ticketData.ticketId}`, 20, 55);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text(`Event: ${ticketData.title}`, 20, 75);

    doc.setFontSize(12);
    doc.text(`Assigned Role / Skill: ${ticketData.skill}`, 20, 90);
    doc.text(`Date: ${ticketData.date}`, 20, 105);
    doc.text(`Location: ${ticketData.location}`, 20, 120);
    doc.text(`Organizer: ${ticketData.organizer}`, 20, 135);

    doc.setLineWidth(0.5);
    doc.line(20, 150, 190, 150);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "Thank you for contributing to the community! Please present this pass at arrival.",
      20,
      165,
    );

    doc.save(`Volunteer-Pass-${ticketData.ticketId}.pdf`);
    toast.success("PDF Pass downloaded successfully!");
    setIsTicketOpen(false);
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
              <span
                className={
                  isFull
                    ? "text-red-500 font-extrabold"
                    : "text-teal-600 dark:text-teal-400"
                }
              >
                {registeredCount} / {capacityCount} ({percentage}%){" "}
                {isFull && "• Full"}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
              <div
                className={`h-full rounded-full transition-all duration-700 shadow-xs ${
                  isFull
                    ? "bg-red-500"
                    : "bg-linear-to-r from-teal-500 to-cyan-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className={`w-full py-3 rounded-lg text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer ${
              isFull
                ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white"
                : "bg-slate-900 hover:bg-teal-600 dark:bg-slate-800 dark:hover:bg-teal-600 text-white shadow-teal-500/25"
            }`}
          >
            {isFull ? "Slots Full (Closed)" : "Join Initiative →"}
          </button>
        </div>
      </div>

      {/* Login Required Modal */}
      {isLoginRequiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-teal-500/30 text-center relative">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/60 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-teal-200 dark:border-teal-800">
              <LogIn className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">
              Login Required!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              You need to log in to your account before registering for{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {event.title}
              </span>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/login")}
                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
              >
                Log In Now
              </button>
              <button
                onClick={() => setIsLoginRequiredModal(false)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Already Registered Modal */}
      {isAlreadyRegisteredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-amber-500/30 text-center relative">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-200 dark:border-amber-800">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">
              Already Registered!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              You have already taken a pass for{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {event.title}
              </span>
              . You cannot register twice for the same event.
            </p>
            <button
              onClick={() => setIsAlreadyRegisteredModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      <EventRegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleConfirmRegistration}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        agreed={agreed}
        setAgreed={setAgreed}
        isVolunteer={isVolunteer}
        setIsVolunteer={setIsVolunteer}
        loading={loading}
      />

      <EventPassModal
        ticketData={ticketData}
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        onDownloadPDF={handleDownloadPDF}
      />
    </>
  );
}
