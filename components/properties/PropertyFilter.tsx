"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Home, Euro, Bed, MapPin, Square } from "lucide-react";
import type { PropertyFilterValues } from "@/types/filter";
import { PropertyType, Neighborhood, Bedrooms } from "@/types/enums";
import {
  DEFAULT_FILTERS,
  FILTER_LIMITS,
  BEDROOM_OPTIONS,
} from "@/constants/filterDefaults";
import { NEIGHBORHOODS } from "@/constants/neighborhoods";

interface PropertyFilterProps {
  filters: PropertyFilterValues;
  onFilterChange: (filters: PropertyFilterValues) => void;
}

const PropertyFilter = ({ filters, onFilterChange }: PropertyFilterProps) => {
  const updateFilter = (
    key: keyof PropertyFilterValues,
    value: string | number | Bedrooms[] | Neighborhood[]
  ) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const handleBedroomToggle = (bedroom: Bedrooms) => {
    const currentBedrooms = filters.bedrooms;
    
    // If "All" is selected, replace with just the clicked option
    if (currentBedrooms.includes(Bedrooms.ALL)) {
      if (bedroom === Bedrooms.ALL) {
        // If clicking "All" when it's already selected, do nothing
        return;
      }
      // Replace "All" with the new selection
      updateFilter("bedrooms", [bedroom]);
      return;
    }
    
    // If clicking "All", replace everything with just "All"
    if (bedroom === Bedrooms.ALL) {
      updateFilter("bedrooms", [Bedrooms.ALL]);
      return;
    }
    
    // Toggle the bedroom option
    if (currentBedrooms.includes(bedroom)) {
      // Remove it
      const newBedrooms = currentBedrooms.filter((b) => b !== bedroom);
      // If no bedrooms selected, default to "All"
      updateFilter("bedrooms", newBedrooms.length > 0 ? newBedrooms : [Bedrooms.ALL]);
    } else {
      // Add it
      updateFilter("bedrooms", [...currentBedrooms, bedroom]);
    }
  };

  const handleNeighborhoodToggle = (neighborhood: Neighborhood) => {
    const currentNeighborhoods = filters.neighborhood;
    
    // If "All" is selected, replace with just the clicked option
    if (currentNeighborhoods.includes(Neighborhood.ALL)) {
      if (neighborhood === Neighborhood.ALL) {
        // If clicking "All" when it's already selected, do nothing
        return;
      }
      // Replace "All" with the new selection
      updateFilter("neighborhood", [neighborhood]);
      return;
    }
    
    // If clicking "All", replace everything with just "All"
    if (neighborhood === Neighborhood.ALL) {
      updateFilter("neighborhood", [Neighborhood.ALL]);
      return;
    }
    
    // Toggle the neighborhood option
    if (currentNeighborhoods.includes(neighborhood)) {
      // Remove it
      const newNeighborhoods = currentNeighborhoods.filter((n) => n !== neighborhood);
      // If no neighborhoods selected, default to "All"
      updateFilter("neighborhood", newNeighborhoods.length > 0 ? newNeighborhoods : [Neighborhood.ALL]);
    } else {
      // Add it
      updateFilter("neighborhood", [...currentNeighborhoods, neighborhood]);
    }
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
        <h2 className="text-2xl font-semibold">Filter</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Separator />

      {/* Buy or Rent */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Home className="h-4 w-4" />
          Type
        </Label>
        <RadioGroup
          value={filters.type}
          onValueChange={(value) => updateFilter("type", value as PropertyType)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={PropertyType.ALL} id="all" />
            <Label htmlFor="all" className="cursor-pointer font-normal">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={PropertyType.BUY} id="buy" />
            <Label htmlFor="buy" className="cursor-pointer font-normal">
              Buy
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={PropertyType.RENT} id="rent" />
            <Label htmlFor="rent" className="cursor-pointer font-normal">
              Rent
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Euro className="h-4 w-4" />
          Price Range: €{filters.priceMin.toLocaleString()} - €
          {filters.priceMax.toLocaleString()}
        </Label>
        <Slider
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={handlePriceRangeChange}
          max={FILTER_LIMITS.PRICE_MAX}
          min={FILTER_LIMITS.PRICE_MIN}
          step={FILTER_LIMITS.PRICE_STEP}
          className="w-full"
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <Label
              htmlFor="price-min"
              className="text-sm text-muted-foreground"
            >
              Min Price
            </Label>
            <Input
              id="price-min"
              type="number"
              value={filters.priceMin}
              onChange={(e) => updateFilter("priceMin", Number(e.target.value))}
              min={0}
              max={filters.priceMax}
            />
          </div>
          <div className="flex-1">
            <Label
              htmlFor="price-max"
              className="text-sm text-muted-foreground"
            >
              Max Price
            </Label>
            <Input
              id="price-max"
              type="number"
              value={filters.priceMax}
              onChange={(e) => updateFilter("priceMax", Number(e.target.value))}
              min={filters.priceMin}
              max={FILTER_LIMITS.PRICE_MAX}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Bed className="h-4 w-4" />
          Bedrooms
        </Label>
        <div className="flex flex-wrap gap-2">
          {BEDROOM_OPTIONS.map((option) => {
            const isSelected = filters.bedrooms.includes(option);
            return (
              <Button
                key={option}
                type="button"
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => handleBedroomToggle(option)}
                className="flex-1 min-w-[60px]"
              >
                {option}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Neighborhood */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Neighborhood
        </Label>
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOODS.map((neighborhood) => {
            const isSelected = filters.neighborhood.includes(neighborhood);
            return (
              <Button
                key={neighborhood}
                type="button"
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => handleNeighborhoodToggle(neighborhood)}
                className="flex-1 min-w-[120px]"
              >
                {neighborhood}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Size Range */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Square className="h-4 w-4" />
          Size: {filters.sizeMin}m² - {filters.sizeMax}m²
        </Label>
        <Slider
          value={[filters.sizeMin, filters.sizeMax]}
          onValueChange={handleSizeRangeChange}
          max={FILTER_LIMITS.SIZE_MAX}
          min={FILTER_LIMITS.SIZE_MIN}
          step={FILTER_LIMITS.SIZE_STEP}
          className="w-full"
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="size-min" className="text-sm text-muted-foreground">
              Min Size (m²)
            </Label>
            <Input
              id="size-min"
              type="number"
              value={filters.sizeMin}
              onChange={(e) => updateFilter("sizeMin", Number(e.target.value))}
              min={0}
              max={filters.sizeMax}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="size-max" className="text-sm text-muted-foreground">
              Max Size (m²)
            </Label>
            <Input
              id="size-max"
              type="number"
              value={filters.sizeMax}
              onChange={(e) => updateFilter("sizeMax", Number(e.target.value))}
              min={filters.sizeMin}
              max={FILTER_LIMITS.SIZE_MAX}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertyFilter };
