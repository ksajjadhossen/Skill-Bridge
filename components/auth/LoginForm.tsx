"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, LogIn } from "lucide-react";

interface LoginFormProps {
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function LoginForm({
  isHovered,
  onHover,
  onLeave,
}: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
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
          ? "scale-105 border-teal-500/80 dark:border-teal-400/80 shadow-teal-500/20 z-20 ring-1 ring-teal-500/30"
          : "border-slate-200/80 dark:border-teal-500/20 shadow-slate-950/5 hover:border-teal-500/40"
      }`}
    >
      {/* Header */}
      <div className="mb-8 text-center space-y-1">
        <div className="inline-flex p-3 rounded-2xl bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20 mb-2">
          <LogIn size={22} />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Welcome Back
        </h3>
        <p className="text-xs text-slate-500 dark:text-teal-200/70">
          Sign in to your SkillBridge account
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 rounded-xl">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field with Underline Style */}
        <div className="relative group">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300/90 mb-1">
            Email Address
          </label>
          <div className="relative flex items-center border-b-2 border-slate-300 dark:border-slate-700 focus-within:border-teal-500 dark:focus-within:border-teal-400 transition-colors duration-300 pb-1">
            <span className="text-slate-400 dark:text-slate-500 mr-3">
              <Mail size={18} />
            </span>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="w-full bg-transparent py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Password Field with Underline Style */}
        <div className="relative group">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300/90 mb-1">
            Password
          </label>
          <div className="relative flex items-center border-b-2 border-slate-300 dark:border-slate-700 focus-within:border-teal-500 dark:focus-within:border-teal-400 transition-colors duration-300 pb-1">
            <span className="text-slate-400 dark:text-slate-500 mr-3">
              <Lock size={18} />
            </span>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-transparent py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-bold text-sm bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 active:scale-[0.99] rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer group mt-4"
        >
          {loading ? "Signing in..." : "Login Now"}
          {!loading && (
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
        </button>
      </form>

      {/* Google Auth */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
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
          Continue with Google
        </button>
      </div>
    </div>
  );
}
