import type { PropertyFilterValues } from "@/types/filter";
import type { Property } from "@/types/property";
import { PropertyType, Bedrooms } from "@/types/enums";

const GERMAN_CITIES = ["berlin", "leipzig"];

const isAbroadProperty = (property: Property): boolean => {
  const cityLower = property.city?.toLowerCase() || "";
  return cityLower !== "" && !GERMAN_CITIES.includes(cityLower);
};

export const filterProperties = (
  properties: Property[],
  filters: PropertyFilterValues
): Property[] => {
  return properties.filter((property) => {
    if (!filters.location.includes("all")) {
      const cityLower = property.city?.toLowerCase() || "";
      const abroad = isAbroadProperty(property);
      const matches = filters.location.some((l) => {
        if (l === "abroad") return abroad;
        return cityLower === l.toLowerCase();
      });
      if (!matches) return false;
    }

    if (!filters.type.includes(PropertyType.ALL)) {
      if (!property.type || !filters.type.includes(property.type)) return false;
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
      // For abroad properties, use country as the neighborhood value
      const abroad = isAbroadProperty(property);
      const propertyNeighborhood = abroad
        ? (property.country || "").toLowerCase()
        : (property.neighborhood || "").toLowerCase();
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
