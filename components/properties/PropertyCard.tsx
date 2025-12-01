"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyStats } from "./PropertyStats";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <Link href={`/${locale}/properties/${property.id}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col p-0 gap-0"
        )}
      >
        <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {property.isNew && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              {t("new")}
            </Badge>
          )}
        </div>

        <div className="px-4 py-3 space-y-2">
          <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{property.location}</span>
            </div>
            <PropertyStats
              beds={property.beds}
              baths={property.baths}
              sqm={property.sqm}
              size="sm"
            />
          </div>

          <p className="text-2xl font-bold text-primary">
            {formatPrice(property.price, property.currency, locale)}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export { PropertyCard };
