import type { PropertyFilterValues } from "@/types/filter";
import type { Property } from "@/types/property";
import { PropertyType, Bedrooms } from "@/types/enums";

export const filterProperties = (
  properties: Property[],
  filters: PropertyFilterValues
): Property[] => {
  return properties.filter((property) => {
    if (!filters.location.includes("all")) {
      const cityLower = property.city?.toLowerCase() || "";
      if (!filters.location.some((l) => cityLower === l.toLowerCase())) return false;
    }

    if (!filters.type.includes(PropertyType.ALL)) {
      if (!filters.type.includes(property.type)) return false;
    }

    if (property.price < filters.priceMin || property.price > filters.priceMax) {
      return false;
    }

    if (!filters.bedrooms.includes(Bedrooms.ALL)) {
      const matchesBedroom = filters.bedrooms.some((bedroom) =>
        bedroom === Bedrooms.FOUR_PLUS ? property.beds >= 4 : property.beds === Number(bedroom)
      );
      if (!matchesBedroom) return false;
    }

    if (!filters.neighborhood.includes("all")) {
      const propertyNeighborhood = property.neighborhood?.toLowerCase() || "";
      const matches = filters.neighborhood.some(
        (n) => propertyNeighborhood === n.toLowerCase()
      );
      if (!matches) return false;
    }

    if (property.sqm < filters.sizeMin || property.sqm > filters.sizeMax) {
      return false;
    }

    return true;
  });
};
