import { PropertyType, Neighborhood, Bedrooms, Location } from "./enums";

export interface PropertyFilterValues {
  location: Location;
  type: PropertyType;
  priceMin: number;
  priceMax: number;
  bedrooms: Bedrooms[];
  neighborhood: Neighborhood[];
  sizeMin: number;
  sizeMax: number;
}

