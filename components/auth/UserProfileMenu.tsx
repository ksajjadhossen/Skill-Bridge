"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";

interface UserProfileMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function UserProfileMenu({ user }: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAvatar = () => {
    if (user.image) {
      return user.image;
    }
    const identifier = user.name || user.email;
    if (identifier) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        identifier,
      )}&background=0D9488&color=fff&bold=true`;
    }
    return null;
  };

  const avatarUrl = getAvatar();
  const userRole = user.role || "USER";
  const showRole = userRole !== "USER";

  const dashboardPath =
    userRole === "ORGANIZER" ? "/dashboard/organizer" : "/dashboard/volunteer";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-teal-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-teal-200 dark:hover:border-teal-900 transition-all cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-linear-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-teal-500/20">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm">
              {user.name?.[0] || user.email?.[0] || "U"}
            </span>
          )}
        </div>
        <div className="hidden xl:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {user.name || "User"}
          </span>
          {showRole && (
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-teal-600 dark:text-teal-400">
              {userRole}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-teal-100 dark:border-teal-900/60 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Signed in as
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            {userRole !== "USER" && (
              <Link
                href={dashboardPath}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}

            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <Settings size={16} />
              Edit Profile
            </Link>
          </div>

          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
