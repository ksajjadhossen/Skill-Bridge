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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Organizer Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your community events, capacity, and volunteers seamlessly.
          </p>
        </div>

        <Link
          href="/dashboard/organizer/create-event"
          className="px-5 py-2.5 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Total Events
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalEvents}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Total Volunteers
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalVolunteers}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Available Slots
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.availableSlots}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Completed Events
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.completedEvents}
            </p>
          </div>
        </div>
      </div>

      <OrganizerAnalytics
        eventsCategoryData={eventsCategoryData}
        capacityData={capacityData}
      />

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Manage Event Volunteers
        </h2>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {events.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">No events found.</p>
          ) : (
            events.map((event: any) => (
              <div
                key={event.id}
                className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Category: {event.category}</span>
                    <span>•</span>
                    <span>Date: {event.date}</span>
                    <span>•</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
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
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl flex items-center gap-2 transition cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                  View Registered Volunteers ({event.registrations.length})
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Platform Users & Role Management
        </h2>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {platformUsers.map((u: any) => (
            <div
              key={u.id}
              className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <button
                  onClick={() => setSelectedUserForHistory(u)}
                  className="font-semibold text-gray-900 dark:text-gray-100 text-base hover:text-blue-600 transition text-left cursor-pointer"
                >
                  {u.name}
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {u.email}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-semibold">
                  {u.role}
                </span>
                <button
                  onClick={() => setSelectedUserForRole(u)}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-xs font-medium rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Manage Role
                </button>
              </div>
            </div>
          ))}
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
