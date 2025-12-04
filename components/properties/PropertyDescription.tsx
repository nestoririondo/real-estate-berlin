import { useTranslations } from "next-intl";

interface PropertyDescriptionProps {
  description: string;
}

const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
  const t = useTranslations("property");

  // Check if description contains HTML
  const hasHtml = /<[a-z][\s\S]*>/i.test(description);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{t("description")}</h3>
      {hasHtml ? (
        <div
          className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export { PropertyDescription };
