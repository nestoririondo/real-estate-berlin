import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Euro } from "lucide-react";
import { FILTER_LIMITS } from "@/constants/filterDefaults";

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
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) => {
  const t = useTranslations("filter");

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium flex items-center gap-2">
        <Euro className="h-4 w-4" />
        {t("priceRange")}: €{minPrice.toLocaleString()} - €{maxPrice.toLocaleString()}
      </Label>
      <Slider
        value={[minPrice, maxPrice]}
        onValueChange={onPriceRangeChange}
        max={FILTER_LIMITS.PRICE_MAX}
        min={FILTER_LIMITS.PRICE_MIN}
        step={FILTER_LIMITS.PRICE_STEP}
        className="w-full"
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="price-min" className="text-sm text-muted-foreground">
            {t("minPrice")}
          </Label>
          <Input
            id="price-min"
            type="number"
            value={minPrice}
            onChange={(e) => onMinChange(Number(e.target.value))}
            min={0}
            max={maxPrice}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="price-max" className="text-sm text-muted-foreground">
            {t("maxPrice")}
          </Label>
          <Input
            id="price-max"
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            min={minPrice}
            max={FILTER_LIMITS.PRICE_MAX}
          />
        </div>
      </div>
    </div>
  );
};

export { PriceRangeFilter };
