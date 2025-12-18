import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}&addressdetails=1&limit=5`;

    console.log("url: ", url);
    const res = await fetch(url, {
      headers: {
        "User-Agent": "SR-Portal/1.0 (cesperon4@gmail.com)",
        "Accept-Language": "en",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log("route error", err);
  }
}
