import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

const PUBLIC_PATHS = ["/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = req.cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE;

  // Already authed and hitting /login → send home.
  if (authed && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Not authed and hitting a protected page → gate at /login.
  if (!authed && !PUBLIC_PATHS.includes(pathname)) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Protect everything except Next internals, the auth API and static assets.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|logo-qwork.png|modelo-planilha-funcionarios.xlsx|videos/).*)"],
};
