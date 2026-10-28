import HeroSlider from "@/components/home/HeroSlider";
import FeaturedMissions from "@/components/home/FeaturedMissions";
import TicketPassPreview from "@/components/home/TicketPassPreview";
import AnimatedHowItWorks from "@/components/home/AnimatedHowItWorks";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <HeroSlider />

      <section className="py-12">
        <FeaturedMissions />
      </section>

      <section className="max-w-xl mx-auto py-12 px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">Verified Digital Ticket Pass</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Instant QR code generation for smooth entrance check-ins
          </p>
        </div>
        <TicketPassPreview />
      </section>

      <section className="py-12">
        <AnimatedHowItWorks />
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-linear-to-r from-teal-600 to-cyan-700 text-white text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join thousands of volunteers and organizers creating real community
            changes today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/events"
              className="px-8 py-3.5 rounded-2xl bg-white text-teal-700 font-bold hover:bg-teal-50 transition shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
