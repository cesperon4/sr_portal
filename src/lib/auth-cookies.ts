/**
 * Shared refresh-token cookie config.
 * Use the same name and options for:
 * - Normal login: backend sets this cookie in the login response (Set-Cookie).
 * - OAuth: middleware sets this cookie from the NextAuth JWT when user hits /dashboard.
 * Any code that reads the refresh token (e.g. token refresh API) should use REFRESH_TOKEN_COOKIE.
 */
export const REFRESH_TOKEN_COOKIE = "refreshToken";

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
