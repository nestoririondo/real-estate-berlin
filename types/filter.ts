import { PropertyType, Neighborhood, Bedrooms } from "./enums";

export interface PropertyFilterValues {
  type: PropertyType;
  priceMin: number;
  priceMax: number;
  bedrooms: Bedrooms;
  neighborhood: Neighborhood;
  sizeMin: number;
  sizeMax: number;
}

