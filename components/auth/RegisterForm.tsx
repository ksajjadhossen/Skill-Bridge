"use client";

import { useState } from "react";
import { registerUser } from "@/app/join/actions";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, ArrowRight, UserPlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface RegisterFormProps {
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function RegisterForm({
  isHovered,
  onHover,
  onLeave,
}: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await registerUser(formData);
      if (result?.success) {
        toast.success(result.message);
        router.push("/join");
      } else {
        toast.error(result?.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`w-full max-w-md p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border rounded-3xl shadow-xl transition-all duration-500 cursor-pointer ${
        isHovered
          ? "scale-105 border-cyan-500/80 dark:border-cyan-400/80 shadow-cyan-500/20 z-20 ring-1 ring-cyan-500/30"
          : "border-slate-200/80 dark:border-teal-500/20 shadow-slate-950/5 hover:border-cyan-500/40"
      }`}
    >
      <div className="mb-6 text-center space-y-1">
        <div className="inline-flex p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 mb-2">
          <UserPlus size={22} />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Create Account
        </h3>
        <p className="text-xs text-slate-500 dark:text-cyan-200/70">
          Join as a new volunteer today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300/90 mb-1">
            Full Name
          </label>
          <div className="relative flex items-center border-b-2 border-slate-300 dark:border-slate-700 focus-within:border-cyan-500 dark:focus-within:border-cyan-400 transition-colors duration-300 pb-1">
            <span className="text-slate-400 dark:text-slate-500 mr-3">
              <User size={18} />
            </span>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              required
              disabled={loading}
              className="w-full bg-transparent py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300/90 mb-1">
            Email Address
          </label>
          <div className="relative flex items-center border-b-2 border-slate-300 dark:border-slate-700 focus-within:border-cyan-500 dark:focus-within:border-cyan-400 transition-colors duration-300 pb-1">
            <span className="text-slate-400 dark:text-slate-500 mr-3">
              <Mail size={18} />
            </span>
            <input
              name="email"
              type="email"
              placeholder="your email"
              required
              disabled={loading}
              className="w-full bg-transparent py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300/90 mb-1">
            Password
          </label>
          <div className="relative flex items-center border-b-2 border-slate-300 dark:border-slate-700 focus-within:border-cyan-500 dark:focus-within:border-cyan-400 transition-colors duration-300 pb-1">
            <span className="text-slate-400 dark:text-slate-500 mr-3">
              <Lock size={18} />
            </span>
            <input
              name="password"
              type="password"
              placeholder="your Password"
              required
              disabled={loading}
              className="w-full bg-transparent py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-bold text-sm bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 active:scale-[0.99] rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer group mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Sign Up
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all cursor-pointer active:scale-[0.99]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.25 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.99 0 12s.43 3.9 1.19 5.42l4.09-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.25 0 3.17 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
