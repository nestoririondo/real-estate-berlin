import { services } from "@/lib/data/services";
import { ServiceStats } from "@/components/services/ServiceStats";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { getTranslations } from "next-intl/server";

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

      {/* Social Proof / Stats Section */}
      <ServiceStats />

      {/* Services Grid with Enhanced Details */}
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
