"use client";

import { Separator } from "@/components/ui/separator";
import { PropertyDescription } from "./PropertyDescription";
import { PropertyFeatures } from "./PropertyFeatures";
import { PropertySpecs } from "./PropertySpecs";
import { PropertyEnergyRating } from "./PropertyEnergyRating";
import { getPropertyExtras } from "@/lib/data/mockPropertyExtras";
import type { Property } from "@/types/property";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const extendedDetails = getPropertyExtras(property.id);

  return (
    <div className="space-y-6">
      <Separator />
      <PropertyDescription description={extendedDetails.description} />
      <Separator />
      <PropertyFeatures features={extendedDetails.features} />
      <Separator />
      <PropertySpecs
        yearBuilt={extendedDetails.yearBuilt}
        propertyType={extendedDetails.propertyType}
        parking={extendedDetails.parking}
        garden={extendedDetails.garden}
      />
      <Separator />
      <PropertyEnergyRating rating={extendedDetails.energyRating} />
    </div>
  );
};

export { PropertyDetails };
