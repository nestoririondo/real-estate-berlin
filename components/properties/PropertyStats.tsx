import { Bed, Bath, Square } from "lucide-react";
import { useTranslations } from "next-intl";

interface PropertyStatsProps {
  beds: number;
  baths: number;
  sqm: number;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const PropertyStats = ({
  beds,
  baths,
  sqm,
  size = "md",
  showLabels = false,
}: PropertyStatsProps) => {
  const t = useTranslations("properties");
  const sizeClasses = {
    sm: "gap-3 text-sm",
    md: "gap-4 text-sm",
    lg: "gap-6 text-lg",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} text-muted-foreground`}>
      <div className="flex items-center gap-1">
        <Bed className={iconSizes[size]} />
        <span>
          {showLabels ? t("beds", { count: beds }) : beds}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Bath className={iconSizes[size]} />
        <span>
          {showLabels ? t("baths", { count: baths }) : baths}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Square className={iconSizes[size]} />
        <span>{sqm}m²</span>
      </div>
    </div>
  );
};

export { PropertyStats };
