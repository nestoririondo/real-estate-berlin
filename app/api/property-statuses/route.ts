import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.propstack.de/v2";

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_PROPSTACK_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const url = `${API_BASE_URL}/property_statuses`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in property-statuses API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

