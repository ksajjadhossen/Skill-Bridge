"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  Eye,
  Shield,
  Search,
} from "lucide-react";
import OrganizerAnalytics from "@/components/dashboard/OrganizerAnalytics";
import VolunteerListModal, {
  VolunteerRegistration,
} from "@/components/dashboard/VolunteerListModal";
import UserRoleModal from "@/components/dashboard/UserRoleModal";
import UserProfileEventsModal from "@/components/dashboard/UserProfileEventsModal";
import Link from "next/link";
import {
  updateRegistrationStatus,
  updateUserRole,
} from "@/app/actions/organizer";

interface ClientProps {
  initialEvents: any[];
  initialUsers: any[];
  stats: {
    totalEvents: number;
    totalVolunteers: number;
    availableSlots: number;
    completedEvents: number;
  };
  eventsCategoryData: { name: string; count: number }[];
  capacityData: { name: string; registered: number; capacity: number }[];
}

export default function OrganizerDashboardClient({
  initialEvents,
  initialUsers,
  stats,
  eventsCategoryData,
  capacityData,
}: ClientProps) {
  const [events, setEvents] = useState(initialEvents);
  const [platformUsers, setPlatformUsers] = useState(initialUsers);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
    registrations: VolunteerRegistration[];
  } | null>(null);

  const [selectedUserForRole, setSelectedUserForRole] = useState<any | null>(
    null,
  );
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<
    any | null
  >(null);

  const handleStatusChange = async (id: string, newStatus: any) => {
    const res = await updateRegistrationStatus(id, newStatus);
    if (res.success) {
      setEvents((prev) =>
        prev.map((ev) => ({
          ...ev,
          registrations: ev.registrations.map((reg: any) =>
            reg.id === id ? { ...reg, status: newStatus } : reg,
          ),
        })),
      );
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: any) => {
    const res = await updateUserRole(userId, newRole);
    if (res.success) {
      setPlatformUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
      setSelectedUserForRole(null);
    }
  };

  // ইউজার ফিল্টার করার জন্য সার্চ লজিক
  const filteredUsers = platformUsers.filter(
    (u: any) =>
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
            Organizer Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage your community events, capacity, and volunteers seamlessly.
          </p>
        </div>

        <Link
          href="/dashboard/organizer/create-event"
          className="px-4 py-2.5 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold rounded-lg flex items-center gap-2 shadow-md shadow-teal-500/20 transition-all active:scale-95 cursor-pointer text-xs"
        >
          <Plus className="w-4 h-4" />
          Create New Event
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Total Events
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-gray-100">
              {stats.totalEvents}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Total Volunteers
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-gray-100">
              {stats.totalVolunteers}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Available Slots
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-gray-100">
              {stats.availableSlots}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Completed Events
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-gray-100">
              {stats.completedEvents}
            </p>
          </div>
        </div>
      </div>

      <OrganizerAnalytics
        eventsCategoryData={eventsCategoryData}
        capacityData={capacityData}
      />

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-6 mb-8">
        <h2 className="text-base font-black text-gray-900 dark:text-gray-100 mb-4">
          Manage Event Volunteers
        </h2>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {events.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 text-center">
              No events found.
            </p>
          ) : (
            events.map((event: any) => (
              <div
                key={event.id}
                className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    <span>Category: {event.category}</span>
                    <span>•</span>
                    <span>Date: {event.date}</span>
                    <span>•</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      Capacity: {event.registeredCount}/{event.capacity}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedEvent({
                      id: event.id,
                      title: event.title,
                      registrations: event.registrations,
                    })
                  }
                  className="px-3.5 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg flex items-center gap-2 transition cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-500" />
                  View Registered Volunteers ({event.registrations.length})
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* প্রিমিয়াম ইউজার ও রোল ম্যানেজমেন্ট সেকশন (সার্চ বার ও সুন্দর ডিজাইন সহ) */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-base font-black text-gray-900 dark:text-gray-100">
              Platform Users & Role Management
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Search users and manage their access permissions.
            </p>
          </div>

          {/* প্রিমিয়াম সার্চ বার */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-teal-500 transition-all"
            />
            {userSearchQuery && (
              <button
                onClick={() => setUserSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No users found matching &quot;{userSearchQuery}&quot;
            </div>
          ) : (
            filteredUsers.map((u: any) => (
              <div
                key={u.id}
                className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
              >
                <div className="flex items-center gap-3">
                  {/* প্রিমিয়াম অ্যাভাটর (নামের প্রথম অক্ষর দিয়ে গ্লসি সার্কেল) */}
                  <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-extrabold flex items-center justify-center text-sm border border-teal-200/50 dark:border-teal-800/50 shadow-2xs">
                    {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <button
                      onClick={() => setSelectedUserForHistory(u)}
                      className="font-bold text-gray-900 dark:text-gray-100 text-xs hover:text-teal-600 dark:hover:text-teal-400 transition text-left cursor-pointer"
                    >
                      {u.name || "Unnamed User"}
                    </button>
                    <p className="text-[11px] text-gray-400 font-medium">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase border ${
                      u.role === "ORGANIZER"
                        ? "bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border-teal-200/50 dark:border-teal-800/50"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {u.role}
                  </span>
                  <button
                    onClick={() => setSelectedUserForRole(u)}
                    className="px-3.5 py-2 bg-gray-900 hover:bg-teal-600 dark:bg-gray-800 dark:hover:bg-teal-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Manage Role
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedEvent && (
        <VolunteerListModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          eventTitle={selectedEvent.title}
          registrations={selectedEvent.registrations}
          onStatusChange={handleStatusChange}
        />
      )}

      {selectedUserForRole && (
        <UserRoleModal
          isOpen={!!selectedUserForRole}
          onClose={() => setSelectedUserForRole(null)}
          user={selectedUserForRole}
          onRoleUpdate={handleRoleUpdate}
        />
      )}

      {selectedUserForHistory && (
        <UserProfileEventsModal
          isOpen={!!selectedUserForHistory}
          onClose={() => setSelectedUserForHistory(null)}
          userName={selectedUserForHistory.name}
          userEvents={selectedUserForHistory.events}
        />
      )}
    </div>
  );
}
