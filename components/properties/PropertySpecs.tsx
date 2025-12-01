import { useTranslations } from "next-intl";
import { Calendar, Building, Car, TreePine } from "lucide-react";

interface PropertySpecsProps {
  yearBuilt: number;
  propertyType: string;
  parking: string;
  garden: string;
}

const PropertySpecs = ({ yearBuilt, propertyType, parking, garden }: PropertySpecsProps) => {
  const t = useTranslations("property");

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t("additionalInfo")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{t("yearBuilt")}</p>
            <p className="font-medium">{yearBuilt}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Building className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{t("propertyType")}</p>
            <p className="font-medium">{propertyType}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Car className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{t("parking")}</p>
            <p className="font-medium">{parking}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TreePine className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{t("garden")}</p>
            <p className="font-medium">{garden}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertySpecs };
