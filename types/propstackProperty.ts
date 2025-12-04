/**
 * Type definition for Propstack API property response
 * Based on the actual API response structure
 */

export interface PropstackImage {
  id: string;
  title: string;
  url: string;
  is_floorplan: boolean;
  is_private: boolean;
  tags: boolean;
  position: number;
  connection_ids: number[];
  updated_at: string;
}

export interface PropstackProperty {
  id: number | string;
  name: string;
  title: string;
  unit_id: string | null;
  exposee_id: string | null;
  project_id: number | string | null;
  broker_id: number | string;
  archived: boolean;
  token: string;
  street: string | null;
  house_number: string | null;
  zip_code: string | null;
  city: string | null;
  lat: string | number | null;
  lng: string | number | null;
  country: string | null;
  region: string | null;
  hide_address: boolean;
  location_name: string | null;
  property_space_value: string | number | null;
  for_bidding: boolean;
  group_ids: unknown[];
  property_status_id: number | string;
  price_on_inquiry: boolean;
  marketing_type: "BUY" | "RENT";
  object_type: string | null;
  rs_type: string | null;
  rs_category: string | null;
  custom_fields: Record<string, unknown>;
  sold_date: string | null;
  sold_price: number | null;
  total_commission: string | number | null;
  internal_commission: string | number | null;
  external_commission: string | number | null;
  internal_commission_percentage: string | number | null;
  external_commission_percentage: string | number | null;
  valuation_price: string | number | null;
  valuation_price_from: string | number | null;
  valuation_price_to: string | number | null;
  openimmo_firstname: string | null;
  openimmo_lastname: string | null;
  openimmo_email: string | null;
  openimmo_phone: string | null;
  short_address: string | null;
  number_of_rooms: number | null;
  price: number | null;
  base_rent: number | null;
  living_space: number | null;
  number_of_bed_rooms: number | null;
  number_of_bath_rooms: number | null;
  currency: string | null;
  free_from: string | null;
  rented: boolean;
  construction_year: number | null;
  energy_efficiency_class: string | null;
  thermal_characteristic: string | number | null;
  plot_area: number | null;
  additional_area: number | null;
  heating_costs: number | null;
  heating_type: string | null;
  address: string | null;
  apartment_number: string | null;
  building_energy_rating_type: string | null;
  condition: string | null;
  courtage: string | null;
  courtage_note: string | null;
  deposit: string | null;
  description_note: string | null;
  energy_certificate_availability: string | null;
  firing_types: string | null;
  furnishing_note: string | null;
  location_note: string | null;
  long_description_note: string | null;
  long_furnishing_note: string | null;
  long_location_note: string | null;
  long_other_note: string | null;
  other_note: string | null;
  net_floor_space: number | null;
  parking_space_price: number | null;
  price_per_sqm: number | null;
  service_charge: number | null;
  total_rent: number | null;
  usable_floor_space: number | null;
  floor: string | null;
  number_of_floors: number | null;
  number_of_parking_spaces: number | null;
  cellar: boolean;
  is24_id: string | null;
  is24_contact_id: string | null;
  translations: unknown[];
  images: PropstackImage[];
  documents: unknown[];
  links: unknown[];
  rent_subsidy: string | number | null;
  maintenance_reserve: number | null;
  created_at: string;
  updated_at: string;
}


