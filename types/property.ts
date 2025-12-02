import { PropertyType } from "./enums";

export interface Property {
  id: number;
  image: string;
  price: number;
  currency?: string;
  title: string;
  location: string;
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
}

