"use client";

import { Suspense, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { PropertyFilter } from "@/components/properties/PropertyFilter";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyCardSkeleton } from "@/components/properties/PropertyCardSkeleton";
import { motion, useInView } from "framer-motion";
import { filterProperties } from "@/lib/utils/propertyFilter";
import { useProperties } from "@/hooks/useProperties";
import { useFilterParams } from "@/hooks/useFilterParams";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const } },
};

const PropertiesInner = () => {
  const t = useTranslations("properties");
  const locale = useLocale();
  const { filters, setFilters } = useFilterParams();
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, margin: "-50px" });

  const { properties, loading, error } = useProperties({
    locale: locale === "de" ? "de" : "en",
  });

  const cityOptions = useMemo(() => {
    const cities = [...new Set(properties.map((p) => p.city).filter(Boolean))] as string[];
    return ["all", ...cities.sort()];
  }, [properties]);

  const neighborhoodOptions = useMemo(() => {
    const neighborhoods = [...new Set(properties.map((p) => p.neighborhood).filter(Boolean))] as string[];
    return ["all", ...neighborhoods.sort()];
  }, [properties]);

  const filteredProperties = filterProperties(properties, filters).sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA;
  });

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
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("loading") || "Loading..."}
        </motion.h1>
      ) : (
        <h1 className="text-4xl font-bold mb-8">
          {t("showing", { count: filteredProperties.length })}
        </h1>
      )}

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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
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

const Properties = () => (
  <Suspense>
    <PropertiesInner />
  </Suspense>
);

export default Properties;
