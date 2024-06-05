import { NextResponse, NextRequest } from "next/server";

const protectedRouteRegex = /^\/profile\/.*$/;
const protectedRoute = ["/profile", "/watchlist"];
const authRoute = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const currentRoute = req.nextUrl.pathname;

  const previousRoute = req.cookies.get("previousRoute")?.value;

  const response = NextResponse.next();

  let routePrefix = currentRoute.split("/")[1];

  if (routePrefix !== "api" && routePrefix !== "_next") {
    response.cookies.set("previousRoute", currentRoute);
  }

  if (
    !token &&
    (protectedRoute.includes(currentRoute) ||
      protectedRouteRegex.test(currentRoute))
  ) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    console.log("prt rot:", absoluteUrl.toString());

    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (token && authRoute.includes(currentRoute)) {
    const absoluteUrl = new URL(
      previousRoute ? previousRoute : "/",
      req.nextUrl.origin
    );

    return NextResponse.redirect(absoluteUrl.toString());
  }
  return response;
}
