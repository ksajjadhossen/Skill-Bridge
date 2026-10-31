# Skill Bridge - Community Event Platform

Welcome to **Skill Bridge**, an AI-powered community event management platform designed to connect community members, volunteers, and event organizers seamlessly. Built with Next.js 16 (App Router), React 19, Auth.js (v5), Prisma, PostgreSQL, and Google Gemini AI.

- **GitHub Repository:** [https://github.com/ksajjadhossen/Skill-Bridge](https://github.com/ksajjadhossen/Skill-Bridge)
- **Live Demo:** [https://skill-bridge-event.vercel.app](https://skill-bridge-event.vercel.app)

---

## 🔑 Demo Test Accounts

You can test the platform using the pre-configured credentials for all three distinct roles:

- **User Account:**
  - **Email:** `user@example.com`
  - **Password:** `iamuser`

- **Volunteer Account:**
  - **Email:** `volunteer@example.com`
  - **Password:** `iamvolunteer`

- **Organizer / Admin Account:**
  - **Email:** `organizer@example.com`
  - **Password:** `iamorganizer`

---

## 🎯 Purpose & Real-World Impact

Skill Bridge is built to solve real-world community engagement and event organization challenges:

- **Streamlined Community Engagement:** Simplifies how tech clubs, student organizations, and local non-profits organize, promote, and manage community events.
- **AI-Boosted Productivity:** Enables organizers to quickly draft event titles, schedules, and engaging descriptions using integrated **Google Gemini AI**.
- **Skill & Leadership Development:** Gives active community members hands-on volunteering opportunities to gain practical leadership and team-coordination skills.
- **Real-Time Data Visibility:** Offers organizers dynamic graphical analytics (`Recharts`) to track participant registration trends and monitor event engagement effortlessly.

---

## 🌟 Comprehensive Features & Capabilities

### 🔍 Core Platform Features

- **Advanced Event Discovery:** Full search, category filtering, and sorting capabilities to easily locate upcoming events.
- **AI-Assisted Event Creation:** Organizers can generate event descriptions, titles, and schedules effortlessly using **Google Gemini AI** integration (`@google/generative-ai`).
- **PDF Ticket & Report Export:** Built-in PDF generation (`jspdf`) for event passes and tickets.
- **Dynamic Analytics & Charts:** Visual representation of registration stats and attendee distribution using **Recharts**.
- **Dark / Light Theme Support:** Smooth mode switching supported by `next-themes`.
- **Interactive UI & Animations:** Fluid motion effects powered by `framer-motion` and `tw-animate-css`.

---

## 👥 Role-Based System & Dual Dashboards

Skill Bridge features two dedicated dashboard experiences tailored specifically to the user's platform role:

### 1. 👤 General Users / Attendees

- **Strict 1-Ticket Per Event Rule:** To ensure fair distribution and prevent spamming, users can strictly book **only 1 ticket per event**.
- **Instant PDF Ticket Download:** Download official event passes/tickets immediately as a **PDF file** (`jsPDF`) right after booking.
- **Dual-Action Booking Flow:** Apply to become an event volunteer directly during the ticket booking process in a single seamless step.
- **Booking History & Profile:** Track registered events, manage personal profiles, and view volunteer application statuses.

### 2. 🤝 Volunteers

- **Notice Board & Announcements:** Access special volunteer notices, task schedules, and event updates.
- **Extra Facilitation:** Assist attendees during check-ins and extend extra support during active events.
- **Duty Dashboard:** Dedicated view for assigned tasks and co-volunteer coordination.

### 3. 🛠️ Organizers & Admins

- **Full Event & User Control:** Complete authority to create, edit, publish, or delete events.
- **Multi-Organizer Support:** Events created by specific organizers explicitly attribute and display the organizer's details.
- **Volunteer Application Approval:** Review and approve or reject user applications submitted during event registration.
- **User Promotion & Demotion:** Manage platform roles (Promote/Demote users to Volunteer or Organizer statuses).
- **AI Co-Pilot for Events:** Integrated Google Gemini assistant to help craft optimal event copy and requirements.

---

## 🛠️ Complete Tech Stack & Dependencies

### **Core Stack**

- **Framework:** [Next.js 16.4.2 (App Router)](https://nextjs.org)
- **Library:** React 19.3.0 & React DOM 19.3.0
- **Language:** TypeScript 5
- **Package Manager:** `pnpm` (v10.32.1)

### **Authentication & Security**

- **Auth Framework:** NextAuth.js (`next-auth@5.0.0-beta.32` / `@auth/prisma-adapter`)
- **Password Hashing:** `bcryptjs`
- **OAuth:** Google OAuth 2.0 Integration

### **Database & Backend**

- **ORM:** Prisma Client (`@prisma/client` & `prisma` v5.22.0)
- **Database Driver:** PostgreSQL Client (`pg` v8.23.1)

### **AI & Third-Party Services**

- **AI Engine:** Google Generative AI (`@google/generative-ai` v0.24.1)

### **UI & Styling**

- **CSS Framework:** Tailwind CSS v4 (`@tailwindcss/turbopack`)
- **Component Libraries:** Base UI (`@base-ui/react`), Shadcn UI (`shadcn`)
- **Icons:** Lucide React (`lucide-react`), React Icons (`react-icons`)
- **Animations:** Framer Motion (`framer-motion` v14.6.0), TW Animate CSS (`tw-animate-css`)
- **Toasts & Notifications:** React Hot Toast (`react-hot-toast`)
- **Class Utilities:** `class-variance-authority`, `cn`

### **Utilities & Exports**

- **Data Visualization:** Recharts (`recharts` v3.10.1)
- **PDF Generator:** jsPDF (`jspdf` v4.2.1)

---

## 🚀 Getting Started

To set up and run Skill Bridge locally:

### 1. Clone & Install

```bash
git clone [https://github.com/ksajjadhossen/Skill-Bridge.git](https://github.com/ksajjadhossen/Skill-Bridge.git)
cd Skill-Bridge
pnpm install
```
