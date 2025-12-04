// Propstack API v2 Types

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
  id: string;
  name: string;
  title: string;
  unit_id: string;
  exposee_id: string;
  project_id: string | null;
  broker_id: string;
  archived: string;
  token: string;
  street: string;
  house_number: string;
  zip_code: string;
  city: string;
  lat: string;
  lng: string;
  country: string;
  region: string;
  hide_address: string;
  location_name: string;
  property_space_value: string;
  for_bidding: string;
  group_ids: string;
  property_status_id: string;
  price_on_inquiry: string;
  marketing_type: "BUY" | "RENT";
  object_type: string;
  rs_type: string;
  rs_category: string;
  custom_fields: Record<string, unknown>;
  sold_date: string | null;
  sold_price: number | null;
  total_commission: string;
  internal_commission: string;
  external_commission: string;
  internal_commission_percentage: string;
  external_commission_percentage: string;
  valuation_price: string;
  valuation_price_from: string;
  valuation_price_to: string;
  openimmo_firstname: string;
  openimmo_lastname: string;
  openimmo_email: string;
  openimmo_phone: string;
  short_address: string;
  number_of_rooms: number;
  price: number;
  base_rent: number;
  living_space: number;
  number_of_bed_rooms: number;
  number_of_bath_rooms: number;
  currency: string;
  free_from: string;
  rented: boolean;
  construction_year: number;
  energy_efficiency_class: string;
  thermal_characteristic: number;
  plot_area: number;
  additional_area: number;
  heating_costs: number;
  heating_type: string;
  address: string;
  apartment_number: string;
  building_energy_rating_type: string;
  condition: string;
  courtage: string;
  courtage_note: string;
  deposit: string;
  description_note: string;
  energy_certificate_availability: string;
  firing_types: string;
  furnishing_note: string;
  location_note: string;
  long_description_note: string;
  long_furnishing_note: string;
  long_location_note: string;
  long_other_note: string;
  other_note: string;
  net_floor_space: number;
  parking_space_price: number;
  price_per_sqm: number;
  service_charge: number;
  total_rent: number;
  usable_floor_space: number;
  floor: string;
  number_of_floors: number;
  number_of_parking_spaces: number;
  cellar: boolean;
  is24_id: string;
  is24_contact_id: string;
  translations: string[];
  images: PropstackImage[];
  documents: string[];
  links: string[];
  rent_subsidy: string;
  maintenance_reserve: number;
  created_at: string;
  updated_at: string;
}

export interface PropstackResponse {
  data: PropstackProperty[];
  total: number;
}

