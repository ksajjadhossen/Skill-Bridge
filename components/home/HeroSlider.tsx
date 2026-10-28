"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Ticket,
  Users,
  Sparkles,
  ShieldCheck,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    badge: "Next-Gen Event & Volunteer Orchestration",
    title: "Connect Your Expertise with Meaningful Missions",
    description:
      "SkillBridge is the premier platform bridging passionate volunteers and impactful organizers. Create community missions and orchestrate success seamlessly.",
    bgImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1920&auto=format&fit=crop",
    icon: Sparkles,
    stats: "150+ Active Missions",
  },
  {
    badge: "AI-Powered Event Management",
    title: "Instant AI Assistants & Smart Role Generation",
    description:
      "Leverage advanced AI to structure event requirements, generate professional volunteer descriptions, and match skills instantly.",
    bgImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
    icon: Bot,
    stats: "Automated Workflow",
  },
  {
    badge: "Secure Digital QR Pass",
    title: "Verified Ticket Passes & Real-Time Check-In",
    description:
      "Issue secure digital tickets with unique QR codes for attendees. Seamless verification and entrance tracking for organizers.",
    bgImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1920&auto=format&fit=crop",
    icon: ShieldCheck,
    stats: "4,500+ Verified Passes",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const current = slides[currentIndex];
  const IconComponent = current.icon;

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Background Image Carousel with Adaptive Light/Dark Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${current.bgImage})` }}
          />

          {/* Dynamic Light/Dark Overlay Mask for Perfect Contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-100 via-slate-100/80 to-slate-100/40 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/50 transition-colors duration-500" />
          <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/40 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Main Full-Screen Container */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col justify-between h-full py-20 sm:py-24">
        {/* Top Spacer */}
        <div className="flex-1" />

        {/* Center Animated Text Section */}
        <div className="min-h-70 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg">
                <IconComponent className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-pulse" />
                <span>{current.badge}</span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  {current.stats}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white max-w-4xl drop-shadow-sm">
                {current.title}
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STATIONARY BUTTONS & CONTROLS */}
        <div className="mt-8 flex flex-col items-center gap-8 shrink-0">
          {/* Action Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-xl shadow-teal-500/25 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Explore Missions & Tickets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Join as Organizer</span>
            </Link>
          </div>

          {/* Navigation Arrows & Pagination Dots */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 transition shadow-md cursor-pointer backdrop-blur-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-teal-600 dark:bg-teal-400"
                      : "w-2.5 bg-slate-300 dark:bg-slate-800 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 transition shadow-md cursor-pointer backdrop-blur-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="flex-1" />
      </div>
    </section>
  );
}
