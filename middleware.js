import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request) {
  const session = await getToken({ req: request });
  if (request.nextUrl.pathname.startsWith("/create-goal")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/goal-list")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/detail")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/mypage")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
