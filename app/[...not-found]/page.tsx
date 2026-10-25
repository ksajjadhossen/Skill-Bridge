import Link from "next/link";
import { Compass, Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-16 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-teal-100 dark:border-teal-900/50 shadow-xl shadow-teal-500/5 relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Error Icon / Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60 shadow-inner">
          <AlertCircle size={40} className="animate-pulse" />
        </div>

        {/* Error Code & Message */}
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Oops! The page you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-500/20 transition-all active:scale-95"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
          >
            <Compass size={16} />
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}
