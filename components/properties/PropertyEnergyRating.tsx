import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

interface PropertyEnergyRatingProps {
  rating: string;
}

const PropertyEnergyRating = ({ rating }: PropertyEnergyRatingProps) => {
  const t = useTranslations("property");

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{t("energyRating")}</h3>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-lg px-4 py-2">
          {rating}
        </Badge>
        <span className="text-sm text-muted-foreground">{t("energyEfficient")}</span>
      </div>
    </div>
  );
};

export { PropertyEnergyRating };
