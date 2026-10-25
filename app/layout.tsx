import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/auth/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillBridge - Community Event & Volunteer Management",
  description: "Manage events and volunteers seamlessly.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <SessionProvider>
          {/* Wrap Navbar in Suspense to prevent usePathname prerender errors */}
          <Suspense
            fallback={
              <div className="h-16 w-full animate-pulse bg-slate-100 dark:bg-slate-900" />
            }
          >
            <Navbar />
          </Suspense>

          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
