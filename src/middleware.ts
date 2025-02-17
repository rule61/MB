import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Prevent loops: Allow API auth requests to pass through
  if (isApiAuthRoute) return;

  // Prevent infinite login redirection loops
  if (isAuthRoute && isLoggedIn) {
    if (nextUrl.pathname === DEFAULT_LOGIN_REDIRECT) {
      return;
    }
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Redirect unauthenticated users only if they are NOT on a public/auth page
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    if (nextUrl.pathname === "/auth/login") {
      return ;
    }
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// Ensure middleware runs only on required paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};