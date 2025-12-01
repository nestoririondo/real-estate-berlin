import { useTranslations } from "next-intl";

interface PropertyDescriptionProps {
  description: string;
}

const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
  const t = useTranslations("property");

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{t("description")}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export { PropertyDescription };
