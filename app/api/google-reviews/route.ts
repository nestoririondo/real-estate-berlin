import { NextResponse } from "next/server";

export const revalidate = 86400; // cache for 24 hours

export const GET = async () => {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json({ reviews: [], rating: null, totalReviews: null });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=en&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, data.error_message);
      return NextResponse.json({ reviews: [], rating: null, totalReviews: null });
    }

    return NextResponse.json({
      reviews: data.result.reviews ?? [],
      rating: data.result.rating ?? null,
      totalReviews: data.result.user_ratings_total ?? null,
    });
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
    return NextResponse.json({ reviews: [], rating: null, totalReviews: null });
  }
}
