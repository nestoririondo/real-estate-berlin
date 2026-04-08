"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Home, Bed, MapPin, ChevronDown, ChevronUp, RotateCcw, Globe } from "lucide-react";
import type { PropertyFilterValues } from "@/types/filter";
import { PropertyType, Bedrooms } from "@/types/enums";
import { FILTER_LIMITS, BEDROOM_OPTIONS } from "@/constants/filterDefaults";
import { toggleFilterValue } from "@/lib/utils/filterToggle";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";
import { SizeRangeFilter } from "./filters/SizeRangeFilter";
import { MultiSelectFilter } from "./filters/MultiSelectFilter";

interface PropertyFilterProps {
  filters: PropertyFilterValues;
  onFilterChange: (filters: PropertyFilterValues) => void;
  cityOptions: string[];
  neighborhoodOptions: string[];
}

const PropertyFilter = ({ filters, onFilterChange, cityOptions, neighborhoodOptions }: PropertyFilterProps) => {
  const t = useTranslations("filter");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const [enableTransition, setEnableTransition] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      setEnableTransition(true);
    });

    const onResize = () => setIsOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const updateFilter = (
    key: keyof PropertyFilterValues,
    value: string | number | Bedrooms[] | string[] | PropertyType[]
  ) => onFilterChange({ ...filters, [key]: value });

  const handleLocationToggle = (city: string) => {
    updateFilter("location", toggleFilterValue(filters.location, city, "all"));
  };

  const handleTypeToggle = (type: PropertyType) => {
    updateFilter("type", toggleFilterValue(filters.type, type, PropertyType.ALL));
  };

  const handleBedroomToggle = (bedroom: Bedrooms) => {
    updateFilter("bedrooms", toggleFilterValue(filters.bedrooms, bedroom, Bedrooms.ALL));
  };

  const handleNeighborhoodToggle = (neighborhood: string) => {
    updateFilter("neighborhood", toggleFilterValue(filters.neighborhood, neighborhood, "all"));
  };

  const resetFilters = () =>
    onFilterChange({
      location: ["all"],
      type: [PropertyType.ALL],
      priceMin: FILTER_LIMITS.PRICE_MIN,
      priceMax: FILTER_LIMITS.PRICE_MAX,
      bedrooms: [Bedrooms.ALL],
      neighborhood: ["all"],
      sizeMin: FILTER_LIMITS.SIZE_MIN,
      sizeMax: FILTER_LIMITS.SIZE_MAX,
    });

  const hasActiveFilters =
    !(filters.location.length === 1 && filters.location[0] === "all") ||
    !(filters.type.length === 1 && filters.type[0] === PropertyType.ALL) ||
    filters.priceMin !== FILTER_LIMITS.PRICE_MIN ||
    filters.priceMax !== FILTER_LIMITS.PRICE_MAX ||
    !(filters.bedrooms.length === 1 && filters.bedrooms[0] === Bedrooms.ALL) ||
    !(filters.neighborhood.length === 1 && filters.neighborhood[0] === "all") ||
    filters.sizeMin !== FILTER_LIMITS.SIZE_MIN ||
    filters.sizeMax !== FILTER_LIMITS.SIZE_MAX;

  const labelFor = (value: string) => {
    if (value === "all") return tCommon("all");
    if (value === "abroad") return t("abroad");
    return value;
  };

  return (
    <div className={!mounted ? "opacity-0" : "opacity-100"}>
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={() => { if (window.innerWidth < 1024) setIsOpen(!isOpen); }}
          className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-foreground lg:cursor-default lg:pointer-events-none"
        >
          {tCommon("filter")}
          <span className="lg:hidden text-muted-foreground">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </button>
        <button
          onClick={resetFilters}
          className={`text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 ${!hasActiveFilters ? "invisible" : ""}`}
        >
          <RotateCcw className="h-3 w-3" />
          {tCommon("reset")}
        </button>
      </div>

      <div className={`grid ${enableTransition ? "transition-all duration-300 ease-in-out" : ""} ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="space-y-5 pt-4">
            <div className="h-px bg-border" />

            <MultiSelectFilter
              label={t("location")}
              icon={Globe}
              options={cityOptions}
              selectedValues={filters.location}
              onToggle={handleLocationToggle}
              translateValue={labelFor}
            />

            <div className="h-px bg-border" />

            <MultiSelectFilter
              label={t("type")}
              icon={Home}
              options={[PropertyType.ALL, PropertyType.BUY, PropertyType.RENT]}
              selectedValues={filters.type}
              onToggle={handleTypeToggle}
              translateValue={(v) => tCommon(v)}
            />

            <div className="h-px bg-border" />

            <PriceRangeFilter
              minPrice={filters.priceMin}
              maxPrice={filters.priceMax}
              onPriceRangeChange={([min, max]) => onFilterChange({ ...filters, priceMin: min, priceMax: max })}
              onMinChange={(value) => updateFilter("priceMin", value)}
              onMaxChange={(value) => updateFilter("priceMax", value)}
            />

            <div className="h-px bg-border" />

            <MultiSelectFilter
              label={t("bedrooms")}
              icon={Bed}
              options={BEDROOM_OPTIONS}
              selectedValues={filters.bedrooms}
              onToggle={handleBedroomToggle}
              translateValue={(v) => v === Bedrooms.ALL ? tCommon("all") : v}
            />

            <div className="h-px bg-border" />

            <MultiSelectFilter
              label={t("neighborhood")}
              icon={MapPin}
              options={neighborhoodOptions}
              selectedValues={filters.neighborhood}
              onToggle={handleNeighborhoodToggle}
              translateValue={labelFor}
            />

            <div className="h-px bg-border" />

            <SizeRangeFilter
              minSize={filters.sizeMin}
              maxSize={filters.sizeMax}
              onSizeRangeChange={([min, max]) => onFilterChange({ ...filters, sizeMin: min, sizeMax: max })}
              onMinChange={(value) => updateFilter("sizeMin", value)}
              onMaxChange={(value) => updateFilter("sizeMax", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertyFilter };
