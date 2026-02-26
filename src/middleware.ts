import {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/lib/auth-cookies";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check/set refresh token cookie on dashboard route after OAuth
  if (pathname.startsWith("/dashboard")) {
    const refreshTokenCookie = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
    console.log(
      "[middleware] /dashboard: refresh token cookie:",
      refreshTokenCookie,
    );
    if (refreshTokenCookie) {
      console.log(
        "[middleware] /dashboard: refresh_token cookie already set, skipping",
      );
      return NextResponse.next();
    }

    try {
      const secret = process.env.NEXTAUTH_SECRET;
      if (!secret) {
        console.warn(
          "[middleware] NEXTAUTH_SECRET is not set — JWT may not decode. Add it to .env",
        );
      }

      const token = await getToken({
        req: request,
        secret,
      });

      const refreshToken =
        typeof token?.refreshToken === "string" ? token.refreshToken : undefined;

      if (refreshToken) {
        const response = NextResponse.next();
        response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
          ...REFRESH_TOKEN_COOKIE_OPTIONS,
        });
        console.log(
          "[middleware] /dashboard: set refresh_token cookie from NextAuth JWT",
        );
        return response;
      }

      console.log("[middleware] /dashboard: no refresh token in JWT", {
        hasToken: !!token,
        hasRefreshToken: !!refreshToken,
        secretSet: !!secret,
      });
    } catch (error) {
      console.error(
        "[middleware] /dashboard: failed to set refresh token cookie:",
        error,
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (except auth callbacks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
