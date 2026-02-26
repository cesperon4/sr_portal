import {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/lib/auth-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/** DELETE /api/refresh — clears the refresh token cookie (httpOnly, must be done server-side) */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...REFRESH_TOKEN_COOKIE_OPTIONS,
    maxAge: 0,
  });
  return response;
}

const API_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.API_DEV_URL!
    : process.env.API_PROD_URL!;

const REFRESH_MUTATION = "mutation { refresh { status data message } }";

/**
 * POST /api/refresh
 * Reads refresh_token from httpOnly cookie, calls GraphQL refresh mutation,
 * returns JSON { accessToken }. Used by Apollo error link on UNAUTHENTICATED.
 * (Route is at /api/refresh so it is not caught by /api/auth/[...nextauth].)
 */
export async function POST(request: Request) {
  const startedAt = Date.now();
  const incomingTraceId = request.headers.get("x-refresh-trace-id");
  const traceId = incomingTraceId || `server-${startedAt}-${Math.random().toString(36).slice(2, 8)}`;
  const logPrefix = `[api/refresh:${traceId}]`;

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  console.log(`${logPrefix} start`, {
    hasIncomingTraceId: !!incomingTraceId,
    refreshTokenExists: !!refreshToken,
    refreshTokenLength: refreshToken?.length ?? 0,
  });

  if (!refreshToken) {
    console.warn(`${logPrefix} no refresh token cookie`, {
      elapsedMs: Date.now() - startedAt,
    });
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    console.log(`${logPrefix} calling backend`, { apiUrl: API_URL });

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward the refresh token as a cookie so the backend can read it from context.req.cookies
        Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
      },
      body: JSON.stringify({ query: REFRESH_MUTATION }),
    });

    const json = await res.json();
    console.log(`${logPrefix} backend response received`, {
      status: res.status,
      hasGraphQLErrors: !!json.errors,
      elapsedMs: Date.now() - startedAt,
    });

    if (json.errors) {
      console.error(`${logPrefix} GraphQL errors`, json.errors);
      return NextResponse.json(
        { error: json.errors[0]?.message ?? "Refresh failed" },
        { status: 401 },
      );
    }

    const refresh = json.data?.refresh;
    const accessToken = refresh?.data;

    if (!accessToken) {
      console.error(`${logPrefix} no token in refresh response`, refresh);
      return NextResponse.json(
        { error: refresh?.message ?? "Invalid refresh response" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ accessToken });

    // Forward Set-Cookie from backend so browser gets the new refresh token (token rotation)
    const setCookies =
      (typeof res.headers.getSetCookie === "function"
        ? res.headers.getSetCookie()
        : null) ??
      [res.headers.get("set-cookie")].filter((v): v is string => !!v);
    const newRefreshToken = setCookies
      .find((s) => s.startsWith(`${REFRESH_TOKEN_COOKIE}=`))
      ?.split(";")[0]
      ?.split("=")[1];
    console.log(`${logPrefix} response summary`, {
      hasAccessToken: !!accessToken,
      setCookieCount: setCookies.length,
      hasNewRefreshToken: !!newRefreshToken,
      elapsedMs: Date.now() - startedAt,
    });
    for (const value of setCookies) {
      response.headers.append("Set-Cookie", value);
    }

    return response;
  } catch (err) {
    console.error(`${logPrefix} request failed`, {
      error: err,
      elapsedMs: Date.now() - startedAt,
    });
    return NextResponse.json({ error: "Refresh failed" }, { status: 502 });
  }
}
