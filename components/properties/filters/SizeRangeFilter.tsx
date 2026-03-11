import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Square } from "lucide-react";
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
  { label: "50 - 100m²", min: 50, max: 100 },
  { label: "100 - 150m²", min: 100, max: 150 },
  { label: "150m²+", min: 150, max: FILTER_LIMITS.SIZE_MAX },
];

interface SizeRangeFilterProps {
  minSize: number;
  maxSize: number;
  onSizeRangeChange: (values: number[]) => void;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const SizeRangeFilter = ({
  minSize,
  maxSize,
  onSizeRangeChange,
}: SizeRangeFilterProps) => {
  const t = useTranslations("filter");

  const isRangeSelected = (range: SizeRange) => {
    return minSize === range.min && maxSize === range.max;
  };

  const handleRangeClick = (range: SizeRange) => {
    onSizeRangeChange([range.min, range.max]);
  };

  const getLabel = (range: SizeRange) => {
    if (range.label === "filter.all") {
      return t("all");
    }
    return range.label;
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium flex items-center gap-2">
        <Square className="h-4 w-4" />
        {t("size")}
      </Label>
      <div className="flex flex-wrap gap-2">
        {SIZE_RANGES.map((range) => (
          <button
            key={range.label}
            type="button"
            onClick={() => handleRangeClick(range)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full border transition-colors",
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

export { SizeRangeFilter };
