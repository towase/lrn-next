import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/features/auth/constants";

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (authToken === "demo-user") {
    return NextResponse.next();
  }

  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const loginUrl = new URL("/auth", request.url);
  loginUrl.searchParams.set("next", nextPath);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/tasks", "/tasks/:path*"],
};
