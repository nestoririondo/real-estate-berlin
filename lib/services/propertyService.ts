/**
 * Layer 2: Data Service Layer
 * Business logic and data transformation
 */

import {
  fetchPropertiesFromAPI,
  fetchPropertyByIdFromAPI,
} from "@/lib/api/propstack";
import type { Property } from "@/types/property";
import type { PropstackProperty } from "@/types/propstackProperty";
import { PropertyType } from "@/types/enums";
import { ACTIVE_STATUS_IDS_STRING } from "@/lib/constants/propstackStatuses";

/**
 * Gets all properties with business logic applied
 * This layer transforms API data into your app's data model
 */
export const getProperties = async (params?: {
  locale?: string;
  marketing_type?: "BUY" | "RENT";
  status?: string;
}): Promise<Property[]> => {
  try {
    // Fetch from API
    // Default to "In Vermarktung" status if no status specified
    const status = ACTIVE_STATUS_IDS_STRING;
    
    const response = await fetchPropertiesFromAPI({
      locale: params?.locale || "en",
      per: 100,
      marketing_type: params?.marketing_type,
      status,
    });

    // Debug: Check energy efficiency class in first property from API
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const firstProp = response.data[0] as PropstackProperty;
      console.log("Sample property energy_efficiency_class from API:", firstProp.energy_efficiency_class);
      console.log("Sample property ID:", firstProp.id);
    }

    // Transform API data to your Property model
    // This is where you apply business rules
    const properties = (response.data as PropstackProperty[])
      .map((prop) => {
        try {
          // Map Propstack property to your Property type
          return mapPropstackToProperty(prop);
        } catch (error) {
          console.error(`Error mapping property ${prop.id}:`, error);
          return null;
        }
      })
      .filter((prop): prop is Property => prop !== null)
      // Apply business rules: filter out archived properties
      .filter((prop) => !prop.archived);

    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

/**
 * Gets a single property by ID
 */
export const getPropertyById = async (
  id: string,
  locale?: string
): Promise<Property | null> => {
  try {
    const propstackProperty = await fetchPropertyByIdFromAPI(id, locale) as PropstackProperty;
    return mapPropstackToProperty(propstackProperty);
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
};

/**
 * Helper to convert null to undefined (TypeScript compatibility)
 */
const nullToUndefined = <T>(value: T | null): T | undefined => {
  return value === null ? undefined : value;
};

/**
 * Maps Propstack API property to your Property model
 * This is where you transform the data structure
 */
const mapPropstackToProperty = (propstack: PropstackProperty): Property => {
  // Get main image (first non-floorplan, non-private image)
  const mainImage = propstack.images?.find(
    (img) => !img.is_floorplan && !img.is_private
  );

  // Get all gallery images (non-floorplan, non-private, sorted by position)
  const galleryImages = propstack.images
    ?.filter((img) => !img.is_floorplan && !img.is_private)
    .sort((a, b) => (a.position || 0) - (b.position || 0))
    .map((img) => img.url) || [];

  // Determine price based on marketing type
  const price = propstack.marketing_type === "RENT"
    ? (propstack.total_rent || propstack.base_rent || 0)
    : (propstack.price || 0);

  // Build location string
  const locationParts = [
    propstack.street,
    propstack.house_number,
    propstack.zip_code,
    propstack.city,
  ].filter(Boolean);
  const location = locationParts.join(" ");

  // Determine if property is new (created in last 30 days)
  const createdAt = propstack.created_at ? new Date(propstack.created_at) : null;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isNew = createdAt ? createdAt > thirtyDaysAgo : false;

  // Map marketing type to PropertyType
  const type = propstack.marketing_type === "RENT"
    ? PropertyType.RENT
    : PropertyType.BUY;

  // Parse coordinates
  const coordinates = propstack.lat && propstack.lng
    ? {
        lat: typeof propstack.lat === "string" ? parseFloat(propstack.lat) : propstack.lat,
        lng: typeof propstack.lng === "string" ? parseFloat(propstack.lng) : propstack.lng,
      }
    : undefined;

  // Determine beds (prefer bed_rooms, fallback to total rooms)
  const beds = propstack.number_of_bed_rooms ?? propstack.number_of_rooms ?? 0;

  // Determine sqm (prefer living_space, fallback to property_space_value)
  const sqm = propstack.living_space ?? (propstack.property_space_value
    ? (typeof propstack.property_space_value === "string"
      ? parseFloat(propstack.property_space_value)
      : propstack.property_space_value)
    : 0);

  return {
    // Core listing fields
    id: typeof propstack.id === "string" ? parseInt(propstack.id, 10) : propstack.id,
    image: mainImage?.url || "",
    images: galleryImages,
    price,
    currency: propstack.currency || "EUR",
    title: propstack.title || propstack.name || "",
    location: propstack.address || location,
    neighborhood: propstack.location_name || propstack.city || "",
    beds,
    baths: propstack.number_of_bath_rooms || 0,
    sqm,
    isNew,
    type,
    coordinates,

    // Address breakdown
    street: nullToUndefined(propstack.street),
    house_number: nullToUndefined(propstack.house_number),
    zip_code: nullToUndefined(propstack.zip_code),
    city: nullToUndefined(propstack.city),
    country: nullToUndefined(propstack.country),
    region: nullToUndefined(propstack.region),
    address: nullToUndefined(propstack.address || propstack.short_address),

    // Property identifiers
    unit_id: nullToUndefined(propstack.unit_id),
    exposee_id: nullToUndefined(propstack.exposee_id),

    // Descriptions
    description_note: nullToUndefined(propstack.description_note),
    long_description_note: nullToUndefined(propstack.long_description_note),
    location_note: nullToUndefined(propstack.location_note),
    long_location_note: nullToUndefined(propstack.long_location_note),
    furnishing_note: nullToUndefined(propstack.furnishing_note),
    long_furnishing_note: nullToUndefined(propstack.long_furnishing_note),
    other_note: nullToUndefined(propstack.other_note),
    long_other_note: nullToUndefined(propstack.long_other_note),

    // Property details
    construction_year: nullToUndefined(propstack.construction_year),
    energy_efficiency_class: nullToUndefined(propstack.energy_efficiency_class),
    energy_certificate_availability: nullToUndefined(propstack.energy_certificate_availability),
    building_energy_rating_type: nullToUndefined(propstack.building_energy_rating_type),
    thermal_characteristic: nullToUndefined(propstack.thermal_characteristic),
    heating_type: nullToUndefined(propstack.heating_type),
    firing_types: nullToUndefined(propstack.firing_types),
    condition: nullToUndefined(propstack.condition),
    floor: nullToUndefined(propstack.floor),
    number_of_floors: nullToUndefined(propstack.number_of_floors),
    cellar: propstack.cellar,
    apartment_number: nullToUndefined(propstack.apartment_number),

    // Space measurements
    plot_area: nullToUndefined(propstack.plot_area),
    additional_area: nullToUndefined(propstack.additional_area),
    net_floor_space: nullToUndefined(propstack.net_floor_space),
    usable_floor_space: nullToUndefined(propstack.usable_floor_space),
    property_space_value: nullToUndefined(
      typeof propstack.property_space_value === "string"
        ? parseFloat(propstack.property_space_value)
        : propstack.property_space_value
    ),

    // Pricing details
    price_per_sqm: nullToUndefined(propstack.price_per_sqm),
    price_on_inquiry: propstack.price_on_inquiry,
    courtage: nullToUndefined(propstack.courtage),
    courtage_note: nullToUndefined(propstack.courtage_note),
    deposit: nullToUndefined(propstack.deposit),
    valuation_price: nullToUndefined(
      propstack.valuation_price ? String(propstack.valuation_price) : null
    ),
    valuation_price_from: nullToUndefined(
      propstack.valuation_price_from ? String(propstack.valuation_price_from) : null
    ),
    valuation_price_to: nullToUndefined(
      propstack.valuation_price_to ? String(propstack.valuation_price_to) : null
    ),

    // Rental specific
    base_rent: nullToUndefined(propstack.base_rent),
    total_rent: nullToUndefined(propstack.total_rent),
    service_charge: nullToUndefined(propstack.service_charge),
    heating_costs: nullToUndefined(propstack.heating_costs),
    parking_space_price: nullToUndefined(propstack.parking_space_price),
    free_from: nullToUndefined(propstack.free_from),
    rented: propstack.rented,
    rent_subsidy: nullToUndefined(propstack.rent_subsidy),
    maintenance_reserve: nullToUndefined(propstack.maintenance_reserve),

    // Property classification
    rs_type: nullToUndefined(propstack.rs_type),
    rs_category: nullToUndefined(propstack.rs_category),
    object_type: nullToUndefined(propstack.object_type),

    // Status and metadata
    property_status_id: typeof propstack.property_status_id === "string"
      ? parseInt(propstack.property_status_id, 10)
      : (propstack.property_status_id ?? undefined),
    archived: propstack.archived,
    created_at: propstack.created_at,
    updated_at: propstack.updated_at,

    // Additional info
    number_of_parking_spaces: nullToUndefined(propstack.number_of_parking_spaces),
    number_of_rooms: nullToUndefined(propstack.number_of_rooms),
    hide_address: propstack.hide_address,
    for_bidding: propstack.for_bidding,
  };
}

