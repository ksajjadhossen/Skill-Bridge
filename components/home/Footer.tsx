"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Mail, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBridge
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Empowering communities by connecting volunteers with high-impact
              missions and seamless event management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/events"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Browse Missions
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Volunteer Passes
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  AI Feature Docs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 SkillBridge. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with Next.js & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
