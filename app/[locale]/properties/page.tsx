import { getProperties } from "@/lib/services/propertyService";
import { PropertiesClient } from "@/components/properties/PropertiesClient";

type Props = { params: Promise<{ locale: string }> };

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  const properties = await getProperties({ locale: locale === "de" ? "de" : "en" });
  return <PropertiesClient properties={properties} />;
}
