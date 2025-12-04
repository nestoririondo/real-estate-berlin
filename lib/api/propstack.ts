/**
 * Layer 1: API Client Layer
 * Raw communication with Propstack API
 */

const API_BASE_URL = "https://api.propstack.de/v2";

interface FetchPropertiesParams {
  page?: number;
  per?: number;
  locale?: string;
  marketing_type?: "BUY" | "RENT";
  status?: string;
  fields?: string[];
}

export interface PropstackResponse {
  data: unknown[];
  total: number;
}

/**
 * Fetches properties from Propstack API
 * This is the lowest level - just makes HTTP requests
 */
export const fetchPropertiesFromAPI = async (
  params?: FetchPropertiesParams
): Promise<PropstackResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_PROPSTACK_API_KEY;
  
  if (!apiKey) {
    throw new Error("PROPSTACK_API_KEY is not set");
  }

  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.per) searchParams.set("per", params.per.toString());
  if (params?.locale) searchParams.set("locale", params.locale);
  if (params?.marketing_type) searchParams.set("marketing_type", params.marketing_type);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.fields) searchParams.set("fields", params.fields.join(","));

  const url = `${API_BASE_URL}/properties${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    // Cache for 5 minutes on server
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Propstack API error: ${response.status} - ${errorText}`);
  }

  return response.json();
};

/**
 * Fetches a single property by ID
 */
export const fetchPropertyByIdFromAPI = async (
  id: string,
  locale?: string
): Promise<unknown> => {
  const apiKey = process.env.PROPSTACK_API_KEY || process.env.NEXT_PUBLIC_PROPSTACK_API_KEY;
  
  if (!apiKey) {
    throw new Error("PROPSTACK_API_KEY is not set");
  }

  const searchParams = new URLSearchParams();
  if (locale) searchParams.set("locale", locale);

  const url = `${API_BASE_URL}/properties/${id}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Property not found");
    }
    throw new Error(`Propstack API error: ${response.status}`);
  }

  return response.json();
};
