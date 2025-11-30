import type { PropertyFilterValues } from "@/types/filter";
import { PropertyType, Neighborhood, Bedrooms } from "@/types/enums";

export const BEDROOM_OPTIONS = [
  Bedrooms.ALL,
  Bedrooms.ONE,
  Bedrooms.TWO,
  Bedrooms.THREE,
  Bedrooms.FOUR_PLUS,
];

export const DEFAULT_FILTERS: PropertyFilterValues = {
  type: PropertyType.ALL,
  priceMin: 0,
  priceMax: 2000000,
  bedrooms: [Bedrooms.ALL],
  neighborhood: [Neighborhood.ALL],
  sizeMin: 0,
  sizeMax: 200,
};

export const FILTER_LIMITS = {
  PRICE_MIN: 0,
  PRICE_MAX: 2000000,
  SIZE_MIN: 0,
  SIZE_MAX: 200,
  PRICE_STEP: 10000,
  SIZE_STEP: 5,
} as const;

