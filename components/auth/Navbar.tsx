"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, UserPlus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import UserProfileMenu from "./UserProfileMenu";
import { getUserAvatar } from "@/utils/getAvatar"; // হেল্পার ফাংশন ইমপোর্ট

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextState = !darkMode;
    setDarkMode(nextState);
    if (nextState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Events", href: "/events" },
  ];

  const userRole = session?.user?.role;
  const showDashboard = userRole === "ORGANIZER" || userRole === "VOLUNTEER";

  const navLinks = [
    ...baseNavLinks,
    ...(showDashboard ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  // ইউজারের সঠিক ছবি পাওয়ার জন্য
  const userAvatar = session?.user ? getUserAvatar(session.user) : null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-teal-100 dark:border-teal-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform">
                SB
              </div>
              <span className="text-xl font-extrabold bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                SkillBridge
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60 shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2.5 rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-slate-800/50 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            ) : (
              <div className="w-9.5 h-9.5 rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-slate-800/50 animate-pulse" />
            )}

            {status === "loading" ? (
              <div className="w-24 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            ) : session?.user ? (
              <UserProfileMenu user={session.user} />
            ) : (
              <Link
                href="/join"
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all active:scale-95"
              >
                <UserPlus size={16} />
                Join
              </Link>
            )}
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-lg border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 cursor-pointer"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-teal-100 dark:border-teal-900 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {session?.user && (
            <div className="flex items-center gap-3 p-3 mb-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-100 dark:border-teal-900">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-teal-600 text-white flex items-center justify-center font-bold">
                {userAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userAvatar}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  session.user.name?.[0] || session.user.email?.[0] || "U"
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {session.user.name || session.user.email}
                </p>
                {/* USER রোল হলে দেখাবে না, অন্য রোলগুলো দেখাবে */}
                {session.user.role && session.user.role !== "USER" && (
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold uppercase">
                    {session.user.role}
                  </p>
                )}
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 dark:hover:text-teal-400"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            {session ? (
              <div className="space-y-2">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 text-white font-semibold shadow-md shadow-red-500/20 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/join"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-linear-to-r from-teal-600 to-cyan-600 text-white font-semibold shadow-md shadow-teal-500/20"
              >
                <UserPlus size={16} />
                Join
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
