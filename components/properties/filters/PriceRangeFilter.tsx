import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Euro } from "lucide-react";
import { FILTER_LIMITS } from "@/constants/filterDefaults";
import { cn } from "@/lib/utils";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const PRICE_RANGES: PriceRange[] = [
  { label: "filter.all", min: FILTER_LIMITS.PRICE_MIN, max: FILTER_LIMITS.PRICE_MAX },
  { label: "< €200k", min: 0, max: 200000 },
  { label: "€200k - €500k", min: 200000, max: 500000 },
  { label: "€500k - €1M", min: 500000, max: 1000000 },
  { label: "€1M+", min: 1000000, max: FILTER_LIMITS.PRICE_MAX },
];

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceRangeChange: (values: number[]) => void;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onPriceRangeChange,
}: PriceRangeFilterProps) => {
  const t = useTranslations("filter");

  const isRangeSelected = (range: PriceRange) => {
    return minPrice === range.min && maxPrice === range.max;
  };

  const handleRangeClick = (range: PriceRange) => {
    onPriceRangeChange([range.min, range.max]);
  };

  const getLabel = (range: PriceRange) => {
    if (range.label === "filter.all") {
      return t("all");
    }
    return range.label;
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium flex items-center gap-2">
        <Euro className="h-4 w-4" />
        {t("priceRange")}
      </Label>
      <div className="flex flex-wrap gap-2">
        {PRICE_RANGES.map((range) => (
          <button
            key={range.label}
            type="button"
            onClick={() => handleRangeClick(range)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-sm border transition-colors",
              isRangeSelected(range)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-muted border-border"
            )}
          >
            {getLabel(range)}
          </button>
        ))}
      </div>
    </div>
  );
};

export { PriceRangeFilter };
