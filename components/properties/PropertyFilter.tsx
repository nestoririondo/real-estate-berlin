"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Home, Bed, MapPin } from "lucide-react";
import type { PropertyFilterValues } from "@/types/filter";
import { PropertyType, Neighborhood, Bedrooms } from "@/types/enums";
import { FILTER_LIMITS, BEDROOM_OPTIONS } from "@/constants/filterDefaults";
import { NEIGHBORHOODS } from "@/constants/neighborhoods";
import { toggleFilterValue } from "@/lib/utils/filterToggle";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";
import { SizeRangeFilter } from "./filters/SizeRangeFilter";
import { MultiSelectFilter } from "./filters/MultiSelectFilter";

interface PropertyFilterProps {
  filters: PropertyFilterValues;
  onFilterChange: (filters: PropertyFilterValues) => void;
}

const PropertyFilter = ({ filters, onFilterChange }: PropertyFilterProps) => {
  const t = useTranslations("filter");
  const tCommon = useTranslations("common");

  // Helper function to translate enum values that are translation keys
  const translateEnumValue = (value: string): string => {
    // Check if the value is a translation key (contains a dot)
    if (value.includes(".")) {
      try {
        // Try to translate it (e.g., "filter.all" -> t("all"))
        const key = value.split(".").slice(1).join("."); // Remove namespace
        return t(key) || tCommon(key) || value;
      } catch {
        return value;
      }
    }
    return value;
  };

  const updateFilter = (
    key: keyof PropertyFilterValues,
    value: string | number | Bedrooms[] | Neighborhood[]
  ) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const handleBedroomToggle = (bedroom: Bedrooms) => {
    const newBedrooms = toggleFilterValue(filters.bedrooms, bedroom, Bedrooms.ALL);
    updateFilter("bedrooms", newBedrooms);
  };

  const handleNeighborhoodToggle = (neighborhood: Neighborhood) => {
    const newNeighborhoods = toggleFilterValue(
      filters.neighborhood,
      neighborhood,
      Neighborhood.ALL
    );
    updateFilter("neighborhood", newNeighborhoods);
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newFilters = {
      ...filters,
      priceMin: values[0],
      priceMax: values[1],
    };
    onFilterChange(newFilters);
  };

  const handleSizeRangeChange = (values: number[]) => {
    const newFilters = {
      ...filters,
      sizeMin: values[0],
      sizeMax: values[1],
    };
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters: PropertyFilterValues = {
      type: PropertyType.ALL,
      priceMin: FILTER_LIMITS.PRICE_MIN,
      priceMax: FILTER_LIMITS.PRICE_MAX,
      bedrooms: [Bedrooms.ALL],
      neighborhood: [Neighborhood.ALL],
      sizeMin: FILTER_LIMITS.SIZE_MIN,
      sizeMax: FILTER_LIMITS.SIZE_MAX,
    };
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-full space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{tCommon("filter")}</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          {tCommon("reset")}
        </Button>
      </div>

      <Separator />

      {/* Buy or Rent */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Home className="h-4 w-4" />
          {t("type")}
        </Label>
        <RadioGroup
          value={filters.type}
          onValueChange={(value) => updateFilter("type", value as PropertyType)}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={PropertyType.ALL} id="all" />
            <Label htmlFor="all" className="cursor-pointer font-normal">
              {tCommon("all")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={PropertyType.BUY} id="buy" />
            <Label htmlFor="buy" className="cursor-pointer font-normal">
              {tCommon("buy")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={PropertyType.RENT} id="rent" />
            <Label htmlFor="rent" className="cursor-pointer font-normal">
              {tCommon("rent")}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <PriceRangeFilter
        minPrice={filters.priceMin}
        maxPrice={filters.priceMax}
        onPriceRangeChange={handlePriceRangeChange}
        onMinChange={(value) => updateFilter("priceMin", value)}
        onMaxChange={(value) => updateFilter("priceMax", value)}
      />

      <Separator />

      <MultiSelectFilter
        label={t("bedrooms")}
        icon={Bed}
        options={BEDROOM_OPTIONS}
        selectedValues={filters.bedrooms}
        onToggle={handleBedroomToggle}
        translateValue={translateEnumValue}
      />

      <Separator />

      <MultiSelectFilter
        label={t("neighborhood")}
        icon={MapPin}
        options={NEIGHBORHOODS}
        selectedValues={filters.neighborhood}
        onToggle={handleNeighborhoodToggle}
        translateValue={translateEnumValue}
      />

      <Separator />

      <SizeRangeFilter
        minSize={filters.sizeMin}
        maxSize={filters.sizeMax}
        onSizeRangeChange={handleSizeRangeChange}
        onMinChange={(value) => updateFilter("sizeMin", value)}
        onMaxChange={(value) => updateFilter("sizeMax", value)}
      />
    </div>
  );
};

export { PropertyFilter };
