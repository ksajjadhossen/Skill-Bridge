import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = (req.auth?.user as any)?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  const isPublicRoute =
    nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/events");

  const isAuthRoute = nextUrl.pathname === "/join";

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isOrganizerRoute = nextUrl.pathname.startsWith("/dashboard/organizer");
  const isVolunteerRoute = nextUrl.pathname.startsWith("/dashboard/volunteer");

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      const destination =
        userRole === "ORGANIZER"
          ? "/dashboard/organizer"
          : "/dashboard/volunteer";
      return NextResponse.redirect(new URL(destination, nextUrl));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/join", nextUrl));
  }

  if (isDashboardRoute) {
    // If role is completely unrecognized, redirect to home or 404
    if (userRole !== "ORGANIZER" && userRole !== "VOLUNTEER") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Professional Role Boundary Check:
    // If an Organizer tries to access Volunteer dashboard, send them to their own dashboard
    if (isVolunteerRoute && userRole === "ORGANIZER") {
      return NextResponse.redirect(new URL("/dashboard/organizer", nextUrl));
    }

    // If a Volunteer tries to access Organizer dashboard, send them to 404 or their own dashboard
    if (isOrganizerRoute && userRole === "VOLUNTEER") {
      return NextResponse.redirect(new URL("/dashboard/volunteer", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
