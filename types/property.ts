import { PropertyType } from "./enums";

export interface Property {
  id: number;
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqm: number;
  isNew: boolean;
  type?: PropertyType.BUY | PropertyType.RENT;
}

