"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { PropertyFilterValues } from "@/types/filter";
import { PropertyType, Bedrooms } from "@/types/enums";
import { FILTER_LIMITS, DEFAULT_FILTERS } from "@/constants/filterDefaults";

const parseArray = <T extends string>(param: string | null, fallback: T[]): T[] => {
  if (!param) return fallback;
  return param.split(",") as T[];
};

const parseNumber = (param: string | null, fallback: number): number => {
  if (!param) return fallback;
  const n = Number(param);
  return isNaN(n) ? fallback : n;
};

export const useFilterParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: PropertyFilterValues = useMemo(
    () => ({
      location: parseArray(searchParams.get("location"), DEFAULT_FILTERS.location),
      type: parseArray<PropertyType>(searchParams.get("type"), DEFAULT_FILTERS.type),
      priceMin: parseNumber(searchParams.get("priceMin"), FILTER_LIMITS.PRICE_MIN),
      priceMax: parseNumber(searchParams.get("priceMax"), FILTER_LIMITS.PRICE_MAX),
      bedrooms: parseArray<Bedrooms>(searchParams.get("bedrooms"), DEFAULT_FILTERS.bedrooms),
      neighborhood: parseArray(searchParams.get("neighborhood"), DEFAULT_FILTERS.neighborhood),
      sizeMin: parseNumber(searchParams.get("sizeMin"), FILTER_LIMITS.SIZE_MIN),
      sizeMax: parseNumber(searchParams.get("sizeMax"), FILTER_LIMITS.SIZE_MAX),
    }),
    [searchParams]
  );

  const setFilters = useCallback(
    (newFilters: PropertyFilterValues) => {
      const params = new URLSearchParams();

      if (!(newFilters.location.length === 1 && newFilters.location[0] === "all")) {
        params.set("location", newFilters.location.join(","));
      }
      if (!(newFilters.type.length === 1 && newFilters.type[0] === PropertyType.ALL)) {
        params.set("type", newFilters.type.join(","));
      }
      if (newFilters.priceMin !== FILTER_LIMITS.PRICE_MIN) {
        params.set("priceMin", String(newFilters.priceMin));
      }
      if (newFilters.priceMax !== FILTER_LIMITS.PRICE_MAX) {
        params.set("priceMax", String(newFilters.priceMax));
      }
      if (!(newFilters.bedrooms.length === 1 && newFilters.bedrooms[0] === Bedrooms.ALL)) {
        params.set("bedrooms", newFilters.bedrooms.join(","));
      }
      if (!(newFilters.neighborhood.length === 1 && newFilters.neighborhood[0] === "all")) {
        params.set("neighborhood", newFilters.neighborhood.join(","));
      }
      if (newFilters.sizeMin !== FILTER_LIMITS.SIZE_MIN) {
        params.set("sizeMin", String(newFilters.sizeMin));
      }
      if (newFilters.sizeMax !== FILTER_LIMITS.SIZE_MAX) {
        params.set("sizeMax", String(newFilters.sizeMax));
      }

      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, pathname]
  );

  return { filters, setFilters };
}
