"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  eventTitle: string;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
            <div className="p-2 bg-rose-50 dark:bg-rose-950/60 rounded-xl">
              <AlertTriangle size={20} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Confirm Event Deletion
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="py-6 space-y-2">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Are you sure you want to delete{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              &quot;{eventTitle}&quot;
            </strong>
            ?
          </p>
          <p className="text-[11px] text-rose-500 font-medium">
            This action is permanent and will also remove all associated
            volunteer registrations.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition shadow-md shadow-rose-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading ? "Deleting..." : "Yes, Delete Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
