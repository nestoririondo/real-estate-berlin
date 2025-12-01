import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Square } from "lucide-react";
import { FILTER_LIMITS } from "@/constants/filterDefaults";

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
  onMinChange,
  onMaxChange,
}: SizeRangeFilterProps) => {
  const t = useTranslations("filter");

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium flex items-center gap-2">
        <Square className="h-4 w-4" />
        {t("size")}: {minSize}m² - {maxSize}m²
      </Label>
      <Slider
        value={[minSize, maxSize]}
        onValueChange={onSizeRangeChange}
        max={FILTER_LIMITS.SIZE_MAX}
        min={FILTER_LIMITS.SIZE_MIN}
        step={FILTER_LIMITS.SIZE_STEP}
        className="w-full"
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="size-min" className="text-sm text-muted-foreground">
            {t("minSize")}
          </Label>
          <Input
            id="size-min"
            type="number"
            value={minSize}
            onChange={(e) => onMinChange(Number(e.target.value))}
            min={0}
            max={maxSize}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="size-max" className="text-sm text-muted-foreground">
            {t("maxSize")}
          </Label>
          <Input
            id="size-max"
            type="number"
            value={maxSize}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            min={minSize}
            max={FILTER_LIMITS.SIZE_MAX}
          />
        </div>
      </div>
    </div>
  );
};

export { SizeRangeFilter };
