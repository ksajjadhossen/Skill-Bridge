import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-linear-to-tr from-teal-500/20 to-cyan-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles size={14} className="text-teal-500" />
          <span>Empowering Communities Through Skills</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Connect Your Expertise with{" "}
          <span className="bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Meaningful Missions
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
          SkillBridge is the premier platform bridging passionate volunteers and
          impactful organizers to build stronger, skill-driven communities.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            Explore Missions
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800/80 hover:bg-teal-100 dark:hover:bg-slate-800 transition-all"
          >
            Join as Organizer
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Role-Based Access",
              desc: "Dedicated control panels tailored specifically for Volunteers and Mission Organizers.",
            },
            {
              title: "Real-Time Tracking",
              desc: "Seamless application tracking, status updates, and impact hours monitoring.",
            },
            {
              title: "Modern Aqua Aesthetic",
              desc: "Sleek glass-morphism UI crafted with precision for an elite user experience.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-teal-100 dark:border-teal-900/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold mb-4 border border-teal-100 dark:border-teal-900">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
