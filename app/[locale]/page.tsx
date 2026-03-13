import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

  return {
    title: { absolute: "Real Estate in Berlin" },
    description: t("about.description"),
    alternates: {
      languages: {
        en: `${siteUrl}/en`,
        de: `${siteUrl}/de`,
        es: `${siteUrl}/es`,
        it: `${siteUrl}/it`,
        pt: `${siteUrl}/pt`,
        "x-default": `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: "Real Estate in Berlin",
      description: t("about.description"),
      url: `${siteUrl}/${locale}`,
      type: "website",
    },
  };
}

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <FeaturedListings />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
