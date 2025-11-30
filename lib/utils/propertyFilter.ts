import type { PropertyFilterValues } from "@/types/filter";
import type { Property } from "@/types/property";
import { PropertyType, Neighborhood, Bedrooms } from "@/types/enums";

const parsePrice = (priceString: string): number => {
  return Number(priceString.replace(/[€,]/g, ""));
};

export const filterProperties = (
  properties: Property[],
  filters: PropertyFilterValues
): Property[] => {
  return properties.filter((property) => {
    // Filter by type (buy/rent)
    if (filters.type !== PropertyType.ALL && property.type !== filters.type) {
      return false;
    }

    // Filter by price
    const propertyPrice = parsePrice(property.price);
    if (propertyPrice < filters.priceMin || propertyPrice > filters.priceMax) {
      return false;
    }

    // Filter by bedrooms
    if (filters.bedrooms !== Bedrooms.ALL) {
      if (filters.bedrooms === Bedrooms.FOUR_PLUS) {
        if (property.beds < 4) return false;
      } else {
        const bedsFilter = Number(filters.bedrooms);
        if (property.beds !== bedsFilter) return false;
      }
    }

    // Filter by neighborhood
    if (
      filters.neighborhood !== Neighborhood.ALL &&
      property.location !== filters.neighborhood
    ) {
      return false;
    }

    // Filter by size
    if (property.sqm < filters.sizeMin || property.sqm > filters.sizeMax) {
      return false;
    }

    return true;
  });
};

