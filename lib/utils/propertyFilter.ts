import type { PropertyFilterValues } from "@/types/filter";
import type { Property } from "@/types/property";
import { PropertyType, Neighborhood, Bedrooms, Location } from "@/types/enums";
import { getDistrictForNeighborhood } from "@/constants/neighborhoodToDistrict";
import { getDistrictFromZipCode } from "@/constants/zipToDistrict";

export const filterProperties = (
  properties: Property[],
  filters: PropertyFilterValues
): Property[] => {
  return properties.filter((property) => {
    // Filter by location (Berlin/Leipzig/Abroad)
    if (filters.location !== Location.ALL) {
      const propertyCity = property.city?.toLowerCase() || "";
      if (filters.location === Location.BERLIN) {
        if (!propertyCity.includes("berlin")) return false;
      } else if (filters.location === Location.LEIPZIG) {
        if (!propertyCity.includes("leipzig")) return false;
      } else if (filters.location === Location.ABROAD) {
        // Abroad = not Berlin and not Leipzig
        if (propertyCity.includes("berlin") || propertyCity.includes("leipzig")) return false;
      }
    }

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

    // Filter by neighborhood/district
    if (!filters.neighborhood.includes(Neighborhood.ALL)) {
      const propertyNeighborhood = property.neighborhood?.toLowerCase() || "";

      // Try multiple ways to determine the property's district:
      // 1. Map neighborhood name to district
      // 2. Use zip code to determine district
      const districtFromName = getDistrictForNeighborhood(propertyNeighborhood);
      const districtFromZip = getDistrictFromZipCode(property.zip_code);

      const matchesNeighborhood = filters.neighborhood.some((filterDistrict) => {
        // Direct match via neighborhood name mapping
        if (districtFromName === filterDistrict) {
          return true;
        }

        // Direct match via zip code mapping
        if (districtFromZip === filterDistrict) {
          return true;
        }

        const districtLower = filterDistrict.toLowerCase();
        // Split compound district names (e.g., "Friedrichshain-Kreuzberg" -> ["friedrichshain", "kreuzberg"])
        const districtParts = districtLower.split("-").map(p => p.trim());

        // Check if property neighborhood matches any part of the district name
        return districtParts.some(part =>
          propertyNeighborhood.includes(part) || part.includes(propertyNeighborhood)
        ) ||
        // Or exact match with full district name
        propertyNeighborhood === districtLower ||
        // Or property neighborhood contains full district
        propertyNeighborhood.includes(districtLower) ||
        districtLower.includes(propertyNeighborhood);
      });
      if (!matchesNeighborhood) return false;
    }

    // Filter by size
    if (property.sqm < filters.sizeMin || property.sqm > filters.sizeMax) {
      return false;
    }

    return true;
  });
};

