/**
 * Utility functions to format property data for display
 */

/**
 * Formats enum values to readable text
 * e.g., "CENTRAL_HEATING" -> "Central Heating"
 */
export const formatEnumValue = (value: string | null | undefined): string => {
  if (!value) return "";
  
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Formats property type (rs_type or rs_category) to readable text
 */
export const formatPropertyType = (type: string | null | undefined): string => {
  if (!type) return "";
  
  // Handle common property types
  const typeMap: Record<string, string> = {
    APARTMENT: "Apartment",
    HOUSE: "House",
    PENTHOUSE: "Penthouse",
    LOFT: "Loft",
    MAISONETTE: "Maisonette",
    TERRACED_FLAT: "Terraced Flat",
    GROUND_FLOOR: "Ground Floor Apartment",
    ROOF_STOREY: "Roof Storey",
    STUDIO: "Studio",
    OFFICE: "Office",
    COMMERCIAL: "Commercial",
    INVESTMENT: "Investment",
  };
  
  return typeMap[type] || formatEnumValue(type);
};

/**
 * Formats heating type to readable text
 */
export const formatHeatingType = (type: string | null | undefined): string => {
  if (!type) return "";
  
  const heatingMap: Record<string, string> = {
    CENTRAL_HEATING: "Central Heating",
    DISTRICT_HEATING: "District Heating",
    GAS_HEATING: "Gas Heating",
    OIL_HEATING: "Oil Heating",
    ELECTRIC_HEATING: "Electric Heating",
    HEAT_PUMP: "Heat Pump",
    PELLET_HEATING: "Pellet Heating",
    WOOD_HEATING: "Wood Heating",
    COMBINED_HEAT_AND_POWER_FOSSIL_FUELS: "Combined Heat and Power",
  };
  
  return heatingMap[type] || formatEnumValue(type);
};

/**
 * Formats condition to readable text
 */
export const formatCondition = (condition: string | null | undefined): string => {
  if (!condition) return "";
  
  const conditionMap: Record<string, string> = {
    FIRST_TIME_USE: "First Time Use",
    LIKE_NEW: "Like New",
    RENOVATED: "Renovated",
    MINT_CONDITION: "Mint Condition",
    NEEDS_RENOVATION: "Needs Renovation",
    MODERNIZED: "Modernized",
  };
  
  return conditionMap[condition] || formatEnumValue(condition);
};

