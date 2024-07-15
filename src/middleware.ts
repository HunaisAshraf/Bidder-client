import { NextResponse, NextRequest } from "next/server";

const protectedRouteRegex = /^\/profile\/.*$/;
const protectedRoute = ["/profile", "/watchlist", "/chat"];
const authRoute = ["/login", "/signup", "/update-password", "/forgot-password"];
const adminRoute = ["/admin/dashboard", "/admin/users", "/admin/auctions"];

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  const url = new URL(req.url).pathname;
  requestHeaders.set("x-url", url);

  const token = req.cookies.get("token")?.value;

  const adminToken = req.cookies.get("admin_token")?.value;

  const currentRoute = req.nextUrl.pathname;

  const previousRoute = req.cookies.get("previousRoute")?.value;

  const response = NextResponse.next();

  let routePrefix = currentRoute.split("/")[1];

  if (routePrefix !== "api" && routePrefix !== "_next") {
    response.cookies.set("previousRoute", currentRoute);
  }

  if (!adminToken && adminRoute.includes(currentRoute)) {
    const absoluteUrl = new URL("/admin", req.nextUrl.origin);

    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (adminToken && currentRoute === "/admin") {
    const absoluteUrl = new URL("/admin/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (
    !token &&
    (protectedRoute.includes(currentRoute) ||
      protectedRouteRegex.test(currentRoute))
  ) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);

    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (token && authRoute.includes(currentRoute)) {
    const absoluteUrl = new URL(
      previousRoute ? previousRoute : "/",
      req.nextUrl.origin
    );

    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
