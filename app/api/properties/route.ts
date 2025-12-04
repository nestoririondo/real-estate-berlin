/**
 * Layer 3: API Route (for client-side fetching)
 * This proxies requests to keep API keys server-side
 */

import { NextRequest, NextResponse } from "next/server";
import { getProperties } from "@/lib/services/propertyService";

const GET = async (request: NextRequest) => {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "en";
    const marketingType = searchParams.get("marketing_type") as "BUY" | "RENT" | null;
    const status = searchParams.get("status") || undefined;

    // Fetch properties using service layer
    const properties = await getProperties({
      locale,
      marketing_type: marketingType || undefined,
      status,
    });

    return NextResponse.json({ data: properties, total: properties.length });
  } catch (error) {
    console.error("Error in /api/properties:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch properties",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export { GET };
