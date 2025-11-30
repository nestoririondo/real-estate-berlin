"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building, Car, TreePine } from "lucide-react";
import type { Property } from "@/types/property";
import { PropertyType } from "@/types/enums";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const t = useTranslations("property");
  const tCommon = useTranslations("common");
  // Extended property details (in real app, these would come from API)
  const extendedDetails = {
    yearBuilt: 1920,
    propertyType: "Apartment",
    parking: "Street parking available",
    garden: "Shared courtyard",
    energyRating: "B",
    description:
      "This elegant Altbau apartment in the heart of Prenzlauer Berg offers a perfect blend of historic charm and modern comfort. The property features high ceilings, original parquet flooring, and large windows that flood the space with natural light. The open-plan living area seamlessly connects to a modern kitchen, while the bedrooms offer peaceful retreats. Located in one of Berlin's most desirable neighborhoods, you'll find excellent restaurants, cafes, and cultural attractions just steps away.",
    features: [
      "High ceilings",
      "Original parquet flooring",
      "Modern kitchen",
      "Balcony access",
      "Elevator",
      "Basement storage",
    ],
  };

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
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{t("description")}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {extendedDetails.description}
          </p>
        </div>

        <Separator />

        {/* Key Features */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("keyFeatures")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {extendedDetails.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("additionalInfo")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t("yearBuilt")}</p>
                <p className="font-medium">{extendedDetails.yearBuilt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t("propertyType")}</p>
                <p className="font-medium">{extendedDetails.propertyType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t("parking")}</p>
                <p className="font-medium">{extendedDetails.parking}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TreePine className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t("garden")}</p>
                <p className="font-medium">{extendedDetails.garden}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Energy Rating */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{t("energyRating")}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {extendedDetails.energyRating}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {t("energyEfficient")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { PropertyDetails };

