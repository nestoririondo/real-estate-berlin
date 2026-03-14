import { useTranslations } from "next-intl";
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
  { label: "€200k – €500k", min: 200000, max: 500000 },
  { label: "€500k – €1M", min: 500000, max: 1000000 },
  { label: "€1M+", min: 1000000, max: FILTER_LIMITS.PRICE_MAX },
];

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceRangeChange: (values: number[]) => void;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const PriceRangeFilter = ({ minPrice, maxPrice, onPriceRangeChange }: PriceRangeFilterProps) => {
  const t = useTranslations("filter");

  const isRangeSelected = (range: PriceRange) =>
    minPrice === range.min && maxPrice === range.max;

  return (
    <div className="space-y-3">
      <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
        {t("priceRange")}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {PRICE_RANGES.map((range) => (
          <button
            key={range.label}
            type="button"
            onClick={() => onPriceRangeChange([range.min, range.max])}
            className={cn(
              "text-sm pb-0.5 border-b transition-all duration-200 cursor-pointer",
              isRangeSelected(range)
                ? "text-primary border-primary font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
            )}
          >
            {range.label === "filter.all" ? t("all") : range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export { PriceRangeFilter };
