"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { PropertyFilter } from "@/components/properties/PropertyFilter";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyCardSkeleton } from "@/components/properties/PropertyCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import type { PropertyFilterValues } from "@/types/filter";
import { filterProperties } from "@/lib/utils/propertyFilter";
import { DEFAULT_FILTERS } from "@/constants/filterDefaults";
import { useProperties } from "@/hooks/useProperties";

const Properties = () => {
  const t = useTranslations("properties");
  const locale = useLocale();
  const [filters, setFilters] = useState<PropertyFilterValues>(DEFAULT_FILTERS);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, margin: "-50px" });

  // Fetch properties from API (via API route -> service layer -> API client)
  const { properties, loading, error } = useProperties({
    locale: locale === "de" ? "de" : "en",
  });

  // Filter the fetched properties
  const filteredProperties = filterProperties(properties, filters);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as const, // easeOut cubic bezier
      },
    },
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-destructive text-lg mb-2">{t("error") || "Error"}</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Skeleton className="h-10 w-64 mb-8" />
      ) : (
        <h1 className="text-4xl font-bold mb-8">
          {t("showing", {
            count: filteredProperties.length,
          })}
        </h1>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilter filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3" ref={gridRef}>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              key={JSON.stringify(filters)} // Re-animate when filters change
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
              <p className="text-muted-foreground text-lg mb-2">
                {t("noResults")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("tryAdjusting")}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
