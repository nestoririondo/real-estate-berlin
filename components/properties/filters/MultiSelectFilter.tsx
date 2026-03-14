import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  options,
  selectedValues,
  onToggle,
  translateValue,
}: MultiSelectFilterProps<T>) => {
  return (
    <div className="space-y-3">
      <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
        {label}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={cn(
                "text-sm pb-0.5 border-b transition-all duration-200 cursor-pointer",
                isSelected
                  ? "text-primary border-primary font-medium"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              )}
            >
              {translateValue(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { MultiSelectFilter };
