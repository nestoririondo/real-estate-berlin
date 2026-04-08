"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Home } from "lucide-react";
import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/utils/formatPrice";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const t = useTranslations("common");
  const locale = useLocale();

  const isRented = property.rented === true;
  const isVacant = property.rented === false;

  return (
    <Link href={`/${locale}/properties/${property.id}`} className="group block rounded-sm transition-all duration-300 hover:bg-muted p-3 -mx-3">
      {/* Image */}
      <div className="relative w-full h-64 overflow-hidden mb-4">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {property.isNew && (
            <span className="text-xs tracking-[0.15em] uppercase font-medium text-white bg-primary px-2 py-1">
              {t("new")}
            </span>
          )}
          {property.type === "rent" && (
            <span className="text-xs tracking-[0.15em] uppercase font-medium text-foreground bg-background/90 backdrop-blur-sm px-2 py-1">
              {t("rent")}
            </span>
          )}
          {isRented && (
            <span className="text-xs tracking-[0.15em] uppercase font-medium text-blue-800 dark:text-blue-200 bg-blue-100/90 dark:bg-blue-900/80 backdrop-blur-sm px-2 py-1 flex items-center gap-1">
              <Home className="h-3 w-3" />
              {t("tenanted")}
            </span>
          )}
          {isVacant && (
            <span className="text-xs tracking-[0.15em] uppercase font-medium text-green-800 dark:text-green-200 bg-green-100/90 dark:bg-green-900/80 backdrop-blur-sm px-2 py-1 flex items-center gap-1">
              <Home className="h-3 w-3" />
              {t("vacant")}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div>
        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span
            className="text-2xl font-medium text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatPrice(property.price, property.currency, locale)}
          </span>
          {property.type === "rent" && (
            <span className="text-sm text-muted-foreground">/mo</span>
          )}
        </div>
        {/* Location + size */}
        <p className="text-sm text-muted-foreground mb-2">
          {property.neighborhood}
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          {property.sqm}m²
        </p>

        {/* Gold divider */}
        <div className="w-6 h-px bg-primary mb-3 transition-all duration-300 group-hover:w-12" />

        {/* Title — 2 lines */}
        <h3
          className="text-lg font-medium line-clamp-2 transition-colors duration-300 group-hover:text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {property.title}
        </h3>
      </div>
    </Link>
  );
};

export { PropertyCard };
