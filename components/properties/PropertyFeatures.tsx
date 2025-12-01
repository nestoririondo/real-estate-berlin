import { useTranslations } from "next-intl";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  const t = useTranslations("property");

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t("keyFeatures")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PropertyFeatures };
