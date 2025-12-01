import type { PropertyFilterValues } from "@/types/filter";
import type { Property } from "@/types/property";
import { PropertyType, Neighborhood, Bedrooms } from "@/types/enums";

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
    if (property.price < filters.priceMin || property.price > filters.priceMax) {
      return false;
    }

    // Filter by bedrooms
    if (!filters.bedrooms.includes(Bedrooms.ALL)) {
      const matchesBedroom = filters.bedrooms.some((bedroom) => {
        if (bedroom === Bedrooms.FOUR_PLUS) {
          return property.beds >= 4;
        } else {
          const bedsFilter = Number(bedroom);
          return property.beds === bedsFilter;
        }
      });
      if (!matchesBedroom) return false;
    }

    // Filter by neighborhood
    if (!filters.neighborhood.includes(Neighborhood.ALL)) {
      if (!filters.neighborhood.includes(property.location as Neighborhood)) {
        return false;
      }
    }

    // Filter by size
    if (property.sqm < filters.sizeMin || property.sqm > filters.sizeMax) {
      return false;
    }

    return true;
  });
};

