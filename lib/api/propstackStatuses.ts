/**
 * Fetches property statuses from Propstack API
 * This helps us identify which status IDs correspond to "online" or "in vermarktung"
 */
const API_BASE_URL = "https://api.propstack.de/v2";

export interface PropstackStatus {
  id: number;
  name: string;
  position: number;
}

export interface PropstackStatusesResponse {
  data: PropstackStatus[];
}

export const fetchPropertyStatuses = async (): Promise<PropstackStatusesResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_PROPSTACK_API_KEY;
  
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_PROPSTACK_API_KEY is not set");
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
    throw new Error(`Propstack API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Gets status IDs for "online" or "in vermarktung" statuses
 */
export const getActiveStatusIds = async (): Promise<number[]> => {
  try {
    const statuses = await fetchPropertyStatuses();
    const activeStatuses = statuses.data.filter((status) => {
      const nameLower = status.name.toLowerCase();
      return (
        nameLower.includes("online") ||
        nameLower.includes("in vermarktung") ||
        nameLower.includes("vermarktung") ||
        nameLower === "online"
      );
    });
    return activeStatuses.map((s) => s.id);
  } catch (error) {
    console.error("Error fetching statuses, will filter client-side:", error);
    return [];
  }
};

