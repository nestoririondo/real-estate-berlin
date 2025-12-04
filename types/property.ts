import { PropertyType } from "./enums";

export interface Property {
  // Core listing fields
  id: number;
  image: string;
  images?: string[]; // Gallery images
  price: number;
  currency?: string;
  title: string;
  location: string; // Full address string
  neighborhood: string;
  beds: number;
  baths: number;
  sqm: number;
  isNew: boolean;
  type?: PropertyType.BUY | PropertyType.RENT;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Address breakdown
  street?: string;
  house_number?: string;
  zip_code?: string;
  city?: string;
  country?: string;
  region?: string;
  address?: string; // Full formatted address

  // Property identifiers
  unit_id?: string;
  exposee_id?: string;

  // Descriptions (short and long versions)
  description_note?: string;
  long_description_note?: string;
  location_note?: string;
  long_location_note?: string;
  furnishing_note?: string;
  long_furnishing_note?: string;
  other_note?: string;
  long_other_note?: string;

  // Property details
  construction_year?: number;
  energy_efficiency_class?: string;
  energy_certificate_availability?: string;
  building_energy_rating_type?: string;
  thermal_characteristic?: string | number;
  heating_type?: string;
  firing_types?: string;
  condition?: string;
  floor?: string;
  number_of_floors?: number;
  cellar?: boolean;
  apartment_number?: string;

  // Space measurements
  plot_area?: number;
  additional_area?: number;
  net_floor_space?: number;
  usable_floor_space?: number;
  property_space_value?: number; // Total property space

  // Pricing details
  price_per_sqm?: number;
  price_on_inquiry?: boolean;
  courtage?: string;
  courtage_note?: string;
  deposit?: string;
  valuation_price?: string;
  valuation_price_from?: string;
  valuation_price_to?: string;

  // Rental specific
  base_rent?: number;
  total_rent?: number;
  service_charge?: number;
  heating_costs?: number;
  parking_space_price?: number;
  free_from?: string;
  rented?: boolean;
  rent_subsidy?: string | number;
  maintenance_reserve?: number;

  // Property classification
  rs_type?: string; // e.g., "APARTMENT", "HOUSE"
  rs_category?: string; // More specific category
  object_type?: string; // e.g., "LIVING", "COMMERCIAL"

  // Status and metadata
  property_status_id?: number;
  archived?: boolean;
  created_at?: string;
  updated_at?: string;

  // Additional info
  number_of_parking_spaces?: number;
  number_of_rooms?: number; // Total rooms (not just bedrooms)
  hide_address?: boolean;
  for_bidding?: boolean;
}
