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
import { Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

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
          "group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col p-0"
        )}
      >
        <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {property.isNew && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              {t("new")}
            </Badge>
          )}
        </div>

        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.sqm}m²</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-6">
          <p className="text-2xl font-bold text-primary">{property.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export { PropertyCard };
