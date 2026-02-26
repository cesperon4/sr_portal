import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.API_DEV_URL!
    : process.env.API_PROD_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const cookieHeader = req.headers.get("cookie");
    const authHeader = req.headers.get("authorization");

    const upstreamResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body,
    });

    const payload = await upstreamResponse.text();
    const response = new NextResponse(payload, {
      status: upstreamResponse.status,
      headers: {
        "Content-Type":
          upstreamResponse.headers.get("content-type") ?? "application/json",
      },
    });

    const setCookies =
      (typeof upstreamResponse.headers.getSetCookie === "function"
        ? upstreamResponse.headers.getSetCookie()
        : null) ??
      [upstreamResponse.headers.get("set-cookie")].filter(
        (value): value is string => !!value,
      );

    for (const value of setCookies) {
      response.headers.append("Set-Cookie", value);
    }

    return response;
  } catch (error) {
    console.error("[api/proxy] request failed:", error);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 502 });
  }
}
