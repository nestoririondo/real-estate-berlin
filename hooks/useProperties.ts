/**
 * Layer 4: Data Hooks (for client components)
 * Manages state, loading, and errors
 */

import { useState, useEffect, useCallback } from "react";
import type { Property } from "@/types/property";

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching properties
/**
 * Can be used in client components
 */
export const useProperties = (params?: {
  locale?: string;
  marketing_type?: "BUY" | "RENT";
  status?: string;
}): UsePropertiesResult => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (params?.locale) queryParams.set("locale", params.locale);
      if (params?.marketing_type)
        queryParams.set("marketing_type", params.marketing_type);
      if (params?.status) queryParams.set("status", params.status);

      const url = `/api/properties${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setProperties(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch properties"
      );
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [params?.locale, params?.marketing_type, params?.status]);

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.locale, params?.marketing_type, params?.status]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
};

export default useProperties;
