"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
  const t = useTranslations("property");
  const tCommon = useTranslations("common");
  const extendedDetails = getPropertyExtras(property.id);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{t("details")}</CardTitle>
          <Badge variant={property.isNew ? "default" : "secondary"}>
            {property.isNew ? tCommon("new") : tCommon("available")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
    </Card>
  );
};

export { PropertyDetails };
