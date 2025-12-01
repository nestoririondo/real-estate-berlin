import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface MultiSelectFilterProps<T> {
  label: string;
  icon: LucideIcon;
  options: readonly T[];
  selectedValues: T[];
  onToggle: (value: T) => void;
  translateValue: (value: T) => string;
}

const MultiSelectFilter = <T extends string>({
  label,
  icon: Icon,
  options,
  selectedValues,
  onToggle,
  translateValue,
}: MultiSelectFilterProps<T>) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <Button
              key={option}
              type="button"
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onToggle(option)}
            >
              {translateValue(option)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export { MultiSelectFilter };
