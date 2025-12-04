/**
 * Propstack Property Status IDs
 * Based on the API response from /property_statuses
 */

export const PROPSTACK_STATUS_IDS = {
  AKQUISE: 8809, // "Akquise"
  IN_VORBEREITUNG: 8810, // "In Vorbereitung"
  IN_VERMARKTUNG: 8811, // "In Vermarktung" ✅ Use this for active properties
  RESERVIERT: 8812, // "Reserviert"
  VERKAUFT: 8813, // "Verkauft"
  INAKTIV: 8814, // "Inaktiv"
  OFF_LINE: 10585, // "Off-Line"
} as const;

/**
 * Get status IDs for active/marketing properties
 * These are properties that should be shown to users
 */
export const ACTIVE_STATUS_IDS = [
  PROPSTACK_STATUS_IDS.IN_VERMARKTUNG, // "In Vermarktung"
  // Add other active statuses if needed
] as const;

/**
 * Get comma-separated string of active status IDs
 * Use this in API calls: status="8811"
 */
export const ACTIVE_STATUS_IDS_STRING = ACTIVE_STATUS_IDS.join(",");


