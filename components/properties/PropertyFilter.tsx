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
    value: string | number
  ) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
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
    onFilterChange(DEFAULT_FILTERS);
  };

  return (
    <div className="w-full space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Filter Properties</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Separator />

      {/* Buy or Rent */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Type</Label>
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
        <Label className="text-base font-medium">
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
        <Label htmlFor="bedrooms" className="text-base font-medium">
          Bedrooms
        </Label>
        <Select
          value={filters.bedrooms}
          onValueChange={(value) => updateFilter("bedrooms", value)}
        >
          <SelectTrigger id="bedrooms">
            <SelectValue placeholder="Select bedrooms" />
          </SelectTrigger>
          <SelectContent>
            {BEDROOM_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Neighborhood */}
      <div className="space-y-3">
        <Label htmlFor="neighborhood" className="text-base font-medium">
          Neighborhood
        </Label>
        <Select
          value={filters.neighborhood}
          onValueChange={(value) => updateFilter("neighborhood", value)}
        >
          <SelectTrigger id="neighborhood">
            <SelectValue placeholder="Select neighborhood" />
          </SelectTrigger>
          <SelectContent>
            {NEIGHBORHOODS.map((neighborhood) => (
              <SelectItem key={neighborhood} value={neighborhood}>
                {neighborhood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Size Range */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
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
