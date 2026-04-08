"use client";

import { Suspense, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { PropertyFilter } from "@/components/properties/PropertyFilter";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyCardSkeleton } from "@/components/properties/PropertyCardSkeleton";
import { motion, useInView } from "framer-motion";
import { filterProperties } from "@/lib/utils/propertyFilter";
import { useFilterParams } from "@/hooks/useFilterParams";
import type { Property } from "@/types/property";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const } },
};

const GERMAN_CITIES = ["Berlin", "Leipzig"];

interface Props {
  properties: Property[];
}

const PropertiesContent = ({ properties }: Props) => {
  const t = useTranslations("properties");
  const { filters, setFilters } = useFilterParams();
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, margin: "-50px" });

  const cityOptions = useMemo(() => {
    const cities = [...new Set(properties.map((p) => p.city).filter(Boolean))] as string[];
    const germanCities = cities.filter((c) => GERMAN_CITIES.includes(c));
    const hasAbroad = cities.some((c) => !GERMAN_CITIES.includes(c));
    return ["all", ...germanCities.sort(), ...(hasAbroad ? ["abroad"] : [])];
  }, [properties]);

  const neighborhoodOptions = useMemo(() => {
    const neighborhoods = [...new Set(
      properties.map((p) => {
        const cityLower = p.city?.toLowerCase() || "";
        const isAbroad = cityLower !== "" && !["berlin", "leipzig"].includes(cityLower);
        return isAbroad ? p.country : p.neighborhood;
      }).filter(Boolean)
    )] as string[];
    return ["all", ...neighborhoods.sort()];
  }, [properties]);

  const filteredProperties = filterProperties(properties, filters).sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {t("showing", { count: filteredProperties.length })}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <PropertyFilter
            filters={filters}
            onFilterChange={setFilters}
            cityOptions={cityOptions}
            neighborhoodOptions={neighborhoodOptions}
          />
        </div>

        <div className="lg:col-span-3" ref={gridRef}>
          {filteredProperties.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              key={JSON.stringify(filters)}
            >
              {filteredProperties.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-lg mb-2">{t("noResults")}</p>
              <p className="text-sm text-muted-foreground">{t("tryAdjusting")}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Suspense is required because PropertiesContent uses useSearchParams (via useFilterParams)
const PropertiesClient = ({ properties }: Props) => (
  <Suspense
    fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 w-48 bg-muted rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1" />
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
            </div>
          </div>
        </div>
      </div>
    }
  >
    <PropertiesContent properties={properties} />
  </Suspense>
);

export { PropertiesClient };
