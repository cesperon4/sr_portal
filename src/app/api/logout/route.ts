import {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/lib/auth-cookies";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.API_DEV_URL!
    : process.env.API_PROD_URL!;

const LOGOUT_MUTATION = "mutation { logout }";

/**
 * POST /api/logout
 * Best-effort server-side logout for auto-kickout paths:
 * - Calls backend logout mutation with any available auth context.
 * - Always clears frontend refresh token cookie.
 */
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  let refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const authorizationHeader = request.headers.get("authorization");

  if (!refreshToken) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (typeof token?.refreshToken === "string") {
      refreshToken = token.refreshToken;
    }
  }

  try {
    const upstream = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
        ...(refreshToken ? { Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` } : {}),
      },
      body: JSON.stringify({ query: LOGOUT_MUTATION }),
    });

    let payload: unknown = null;
    try {
      payload = await upstream.json();
    } catch {
      payload = null;
    }

    const response = NextResponse.json(
      {
        ok:
          typeof payload === "object" &&
          payload !== null &&
          "data" in payload &&
          typeof (payload as { data?: { logout?: unknown } }).data?.logout ===
            "boolean"
            ? (payload as { data: { logout: boolean } }).data.logout
            : false,
      },
      { status: 200 },
    );

    response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("[api/logout] request failed:", error);
    const response = NextResponse.json({ ok: false }, { status: 200 });
    response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
      maxAge: 0,
    });
    return response;
  }
}
