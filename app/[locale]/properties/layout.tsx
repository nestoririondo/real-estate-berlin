import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface PropertiesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PropertiesLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

  return {
    title: "Properties",
    description: t("featuredPropertiesSubtitle"),
    alternates: {
      languages: {
        en: `${siteUrl}/en/properties`,
        de: `${siteUrl}/de/properties`,
        es: `${siteUrl}/es/properties`,
        it: `${siteUrl}/it/properties`,
        pt: `${siteUrl}/pt/properties`,
        "x-default": `${siteUrl}/en/properties`,
      },
    },
    openGraph: {
      title: "Properties in Berlin | Real Estate in Berlin",
      description: t("featuredPropertiesSubtitle"),
      url: `${siteUrl}/${locale}/properties`,
    },
  };
}

export default function PropertiesLayout({ children }: PropertiesLayoutProps) {
  return <>{children}</>;
}
