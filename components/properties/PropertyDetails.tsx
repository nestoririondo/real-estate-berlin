"use client";

import { Separator } from "@/components/ui/separator";
import { PropertyDescription } from "./PropertyDescription";
import { PropertyFeatures } from "./PropertyFeatures";
import { PropertySpecs } from "./PropertySpecs";
import { PropertyEnergyRating } from "./PropertyEnergyRating";
import { useTranslations } from "next-intl";
import type { Property } from "@/types/property";
import {
  formatPropertyType,
  formatHeatingType,
  formatCondition,
} from "@/lib/utils/formatPropertyData";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const t = useTranslations("property");

  // Get description from property data (prefer long description, fallback to short)
  const description = property.long_description_note || property.description_note;

  // Build features list from actual property data
  const features: string[] = [];
  
  if (property.cellar) {
    features.push("Cellar");
  }
  
  if (property.number_of_parking_spaces && property.number_of_parking_spaces > 0) {
    const spaces = property.number_of_parking_spaces === 1 ? "space" : "spaces";
    features.push(`${property.number_of_parking_spaces} Parking ${spaces}`);
  }
  
  if (property.heating_type) {
    features.push(`Heating: ${formatHeatingType(property.heating_type)}`);
  }
  
  if (property.condition) {
    features.push(`Condition: ${formatCondition(property.condition)}`);
  }
  
  if (property.number_of_floors && property.number_of_floors > 1) {
    features.push(`${property.number_of_floors} Floors`);
  }
  
  if (property.floor) {
    features.push(`Floor: ${property.floor}`);
  }
  
  if (property.number_of_rooms && property.number_of_rooms > 0) {
    const rooms = property.number_of_rooms === 1 ? "Room" : "Rooms";
    features.push(`${property.number_of_rooms} ${rooms}`);
  }

  // Build specs data from property - only include if we have meaningful data
  const specsData: {
    yearBuilt?: number;
    propertyType?: string;
    parking?: string;
    garden?: string;
  } = {};

  if (property.construction_year && property.construction_year > 1800) {
    specsData.yearBuilt = property.construction_year;
  }

  const propertyType = property.rs_category || property.rs_type;
  if (propertyType) {
    specsData.propertyType = formatPropertyType(propertyType);
  }

  if (property.number_of_parking_spaces && property.number_of_parking_spaces > 0) {
    const spaces = property.number_of_parking_spaces === 1 ? "space" : "spaces";
    specsData.parking = `${property.number_of_parking_spaces} ${spaces}`;
  }

  if (property.plot_area && property.plot_area > 0) {
    specsData.garden = `${Math.round(property.plot_area)} m²`;
  }

  const hasSpecs = Object.keys(specsData).length > 0;

  // Energy rating
  const energyRating = property.energy_efficiency_class;

  return (
    <div className="space-y-6">
      {/* Description - only show if we have one */}
      {description && (
        <>
          <Separator />
          <PropertyDescription description={description} />
        </>
      )}

      {/* Features - only show if we have any */}
      {features.length > 0 && (
        <>
          <Separator />
          <PropertyFeatures features={features} />
        </>
      )}

      {/* Specs - only show if we have any data */}
      {hasSpecs && (
        <>
          <Separator />
          <PropertySpecs
            yearBuilt={specsData.yearBuilt || 0}
            propertyType={specsData.propertyType || ""}
            parking={specsData.parking || ""}
            garden={specsData.garden || ""}
          />
        </>
      )}

      {/* Energy Rating - only show if we have one */}
      {energyRating && energyRating !== "N/A" && (
        <>
          <Separator />
          <PropertyEnergyRating rating={energyRating} />
        </>
      )}
    </div>
  );
};

export { PropertyDetails };
