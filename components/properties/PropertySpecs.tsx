import { useTranslations } from "next-intl";
import { Calendar, Building, Car, TreePine } from "lucide-react";

interface PropertySpecsProps {
  yearBuilt: number;
  propertyType: string;
  parking: string;
  garden: string;
}

// Helper to check if a value is meaningful (not empty)
const hasValue = (value: string | number | undefined | null): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value > 0;
};

const PropertySpecs = ({ yearBuilt, propertyType, parking, garden }: PropertySpecsProps) => {
  const t = useTranslations("property");

  // Build array of specs that have meaningful data
  const specs = [];
  
  if (hasValue(yearBuilt) && yearBuilt > 1800 && yearBuilt <= new Date().getFullYear()) {
    specs.push({
      icon: Calendar,
      label: t("yearBuilt"),
      value: yearBuilt.toString(),
    });
  }
  
  if (hasValue(propertyType)) {
    specs.push({
      icon: Building,
      label: t("propertyType"),
      value: propertyType,
    });
  }
  
  if (hasValue(parking)) {
    specs.push({
      icon: Car,
      label: t("parking"),
      value: parking,
    });
  }
  
  if (hasValue(garden)) {
    specs.push({
      icon: TreePine,
      label: t("garden"),
      value: garden,
    });
  }

  // Only render if we have at least one spec
  if (specs.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t("additionalInfo")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{spec.label}</p>
                <p className="font-medium">{spec.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { PropertySpecs };
