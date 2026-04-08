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
  { label: "< 30m²", min: 0, max: 30 },
  { label: "30 – 40m²", min: 30, max: 40 },
  { label: "40 – 50m²", min: 40, max: 50 },
  { label: "50 – 75m²", min: 50, max: 75 },
  { label: "75 – 100m²", min: 75, max: 100 },
  { label: "> 100m²", min: 100, max: FILTER_LIMITS.SIZE_MAX },
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

export { SizeRangeFilter };
