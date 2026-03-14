import { useTranslations } from "next-intl";
import { FILTER_LIMITS } from "@/constants/filterDefaults";
import { cn } from "@/lib/utils";

interface SizeRange {
  label: string;
  min: number;
  max: number;
}

const SIZE_RANGES: SizeRange[] = [
  { label: "filter.all", min: FILTER_LIMITS.SIZE_MIN, max: FILTER_LIMITS.SIZE_MAX },
  { label: "< 50m²", min: 0, max: 50 },
  { label: "50 – 100m²", min: 50, max: 100 },
  { label: "100 – 150m²", min: 100, max: 150 },
  { label: "150m²+", min: 150, max: FILTER_LIMITS.SIZE_MAX },
];

interface SizeRangeFilterProps {
  minSize: number;
  maxSize: number;
  onSizeRangeChange: (values: number[]) => void;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const SizeRangeFilter = ({ minSize, maxSize, onSizeRangeChange }: SizeRangeFilterProps) => {
  const t = useTranslations("filter");

  const isRangeSelected = (range: SizeRange) =>
    minSize === range.min && maxSize === range.max;

  return (
    <div className="space-y-3">
      <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
        {t("size")}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {SIZE_RANGES.map((range) => (
          <button
            key={range.label}
            type="button"
            onClick={() => onSizeRangeChange([range.min, range.max])}
            className={cn(
              "text-sm pb-0.5 border-b transition-all duration-200",
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

export { SizeRangeFilter };
