import { PropertyType, Bedrooms } from "./enums";

export interface PropertyFilterValues {
  location: string[];
  type: PropertyType[];
  priceMin: number;
  priceMax: number;
  bedrooms: Bedrooms[];
  neighborhood: string[];
  sizeMin: number;
  sizeMax: number;
}
