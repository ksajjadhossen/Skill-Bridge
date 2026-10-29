export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[75vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 animate-pulse uppercase tracking-wider">
          Loading Module...
        </p>
      </div>
    </div>
  );
}
