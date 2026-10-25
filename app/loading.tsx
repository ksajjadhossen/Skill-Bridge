export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Animation */}
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-600 rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
          Loading content, please wait...
        </p>
      </div>
    </div>
  );
}
