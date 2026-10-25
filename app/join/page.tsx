"use client";

import { useState } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowLeftRight,
} from "lucide-react";

export default function AuthPage() {
  const [hoveredForm, setHoveredForm] = useState<"login" | "register" | null>(
    null,
  );
  const [selectedForm, setSelectedForm] = useState<"login" | "register">(
    "login",
  );

  const currentFocus = hoveredForm || selectedForm;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden p-4 sm:p-6 lg:p-12 transition-colors duration-500">
      {/* Dynamic Background Glowing Orbs */}
      <div
        className={`absolute -top-40 -left-40 w-150 h-150 rounded-full blur-[150px] transition-all duration-700 pointer-events-none ${
          currentFocus === "register"
            ? "bg-cyan-500/20 dark:bg-cyan-500/25"
            : "bg-teal-500/20 dark:bg-teal-500/25"
        }`}
      />
      <div
        className={`absolute -bottom-40 -right-40 w-150 h-150 rounded-full blur-[150px] transition-all duration-700 pointer-events-none ${
          currentFocus === "register"
            ? "bg-teal-500/15 dark:bg-teal-500/20"
            : "bg-cyan-500/15 dark:bg-cyan-500/20"
        }`}
      />

      {/* Main Glass Container */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl border border-teal-100 dark:border-teal-500/20 rounded-[2.5rem] shadow-2xl shadow-teal-950/5 dark:shadow-cyan-950/60 overflow-hidden min-h-175 transition-all duration-500">
        {/* Left Side: Branding & Dynamic Text */}
        <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-between bg-linear-to-br from-teal-50/80 via-white/80 to-teal-100/50 dark:from-teal-950/90 dark:via-slate-900/90 dark:to-slate-950/95 border-b lg:border-b-0 lg:border-r border-teal-100 dark:border-teal-500/10 relative overflow-hidden transition-colors duration-500">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 z-10 w-full">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-cyan-500/30">
              SB
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              SkillBridge
            </span>
          </div>

          {/* Dynamic Content */}
          <div className="my-auto py-12 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-teal-100 dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/20 rounded-full backdrop-blur-md transition-all duration-300">
              <Sparkles
                size={14}
                className="text-teal-600 dark:text-teal-400"
              />
              {currentFocus === "register" ? "Join Community" : "Welcome Back"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] transition-all duration-500">
              {currentFocus === "register"
                ? "Start Your Journey"
                : "Access Your Account"}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-md transition-all duration-500">
              {currentFocus === "register"
                ? "Create a new volunteer account to access global community tasks, earn badges, and make a real impact."
                : "Sign in to manage your active volunteer projects, view impact metrics, and stay connected with your team."}
            </p>

            {/* Switch Control */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  setSelectedForm(
                    currentFocus === "login" ? "register" : "login",
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-500/10 hover:bg-teal-200 dark:hover:bg-teal-500/20 border border-teal-200 dark:border-teal-500/30 rounded-xl transition-all cursor-pointer"
              >
                <ArrowLeftRight size={14} />
                Switch to {currentFocus === "login" ? "Sign Up" : "Login"} View
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-teal-600 dark:text-teal-400"
                />{" "}
                Secure Auth
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake
                  size={16}
                  className="text-cyan-600 dark:text-cyan-400"
                />{" "}
                Active Community
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 z-10">
            © 2026 SkillBridge Platform. Built for change-makers.
          </div>
        </div>

        {/* Right Side: Form Cards Container */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-14 flex flex-col md:flex-row items-center justify-center gap-8 relative bg-slate-100/50 dark:bg-slate-950/40 transition-colors duration-500">
          {/* Register Card */}
          <div
            onClick={() => setSelectedForm("register")}
            className={`w-full flex justify-center transition-all duration-500 ${
              currentFocus === "register"
                ? "scale-105 opacity-100 z-20"
                : "scale-90 blur-[3px] opacity-40 hover:opacity-70 cursor-pointer"
            }`}
          >
            <RegisterForm
              isHovered={currentFocus === "register"}
              onHover={() => {
                setHoveredForm("register");
                setSelectedForm("register");
              }}
              onLeave={() => setHoveredForm(null)}
            />
          </div>

          {/* Login Card */}
          <div
            onClick={() => setSelectedForm("login")}
            className={`w-full flex justify-center transition-all duration-500 ${
              currentFocus === "login"
                ? "scale-105 opacity-100 z-20"
                : "scale-90 blur-[3px] opacity-40 hover:opacity-70 cursor-pointer"
            }`}
          >
            <LoginForm
              isHovered={currentFocus === "login"}
              onHover={() => {
                setHoveredForm("login");
                setSelectedForm("login");
              }}
              onLeave={() => setHoveredForm(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
