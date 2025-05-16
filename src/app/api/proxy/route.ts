// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text(); // or req.json() if expecting JSON
  const response = await fetch(
    "https://sr-portal-graphql-api.vercel.app/api/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other headers as needed
      },
      body,
    }
  );

  const data = await response.text(); // or response.json() if expecting JSON
  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      // Forward other headers as needed
    },
  });
}
