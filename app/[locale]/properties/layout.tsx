import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL, buildAlternates } from "@/lib/config/site";

interface PropertiesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PropertiesLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: "Properties",
    description: t("featuredPropertiesSubtitle"),
    alternates: buildAlternates("/properties"),
    openGraph: {
      title: "Properties in Berlin | Real Estate in Berlin",
      description: t("featuredPropertiesSubtitle"),
      url: `${SITE_URL}/${locale}/properties`,
    },
  };
}

export default function PropertiesLayout({ children }: PropertiesLayoutProps) {
  return <>{children}</>;
}
