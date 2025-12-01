"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PropertyFilter } from "@/components/properties/PropertyFilter";
import { PropertyCard } from "@/components/properties/PropertyCard";
import type { PropertyFilterValues } from "@/types/filter";
import { filterProperties } from "@/lib/utils/propertyFilter";
import { DEFAULT_FILTERS } from "@/constants/filterDefaults";
import { allProperties } from "@/lib/data/properties";

const Properties = () => {
  const t = useTranslations("properties");
  const [filters, setFilters] = useState<PropertyFilterValues>(DEFAULT_FILTERS);

  const filteredProperties = filterProperties(allProperties, filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {t("showing", {
          count: filteredProperties.length,
        })}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilter filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">
                {t("noResults")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("tryAdjusting")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
