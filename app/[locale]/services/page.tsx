import type { Metadata } from "next";
import { services } from "@/lib/data/services";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    alternates: {
      languages: {
        en: `${siteUrl}/en/services`,
        de: `${siteUrl}/de/services`,
        es: `${siteUrl}/es/services`,
        it: `${siteUrl}/it/services`,
        pt: `${siteUrl}/pt/services`,
        "x-default": `${siteUrl}/en/services`,
      },
    },
    openGraph: {
      title: t("heroTitle"),
      description: t("heroSubtitle"),
      url: `${siteUrl}/${locale}/services`,
    },
  };
}

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

const ServicesPage = async ({ params }: ServicesPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ServicesHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        benefits={[t("benefit1"), t("benefit2"), t("benefit3")]}
      />

      {/* Services */}
      <ServicesSection
        services={services}
        locale={locale}
        title={t("servicesTitle")}
        subtitle={t("servicesSubtitle")}
      />

      {/* CTA Section */}
      <ServicesCTA
        locale={locale}
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        primaryButton={t("ctaButton")}
        primaryLink={`/${locale}/contact`}
        secondaryButton={t("ctaButtonSecondary")}
        secondaryLink={`/${locale}/properties`}
      />
    </div>
  );
};

export default ServicesPage;
