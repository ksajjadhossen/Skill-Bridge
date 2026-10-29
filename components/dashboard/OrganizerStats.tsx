import { Calendar, Users, Clock, CheckCircle2 } from "lucide-react";

interface StatsProps {
  stats: {
    totalEvents: number;
    totalVolunteers: number;
    availableSlots: number;
    completedEvents: number;
  };
}

export default function OrganizerStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Total Events
          </p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">
            {stats.totalEvents}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Total Volunteers
          </p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">
            {stats.totalVolunteers}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Available Slots
          </p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">
            {stats.availableSlots}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Completed Events
          </p>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">
            {stats.completedEvents}
          </p>
        </div>
      </div>
    </div>
  );
}
