import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SITE_URL, buildAlternates } from "@/lib/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: { absolute: "Real Estate in Berlin" },
    description: t("about.description"),
    alternates: buildAlternates(""),
    openGraph: {
      title: "Real Estate in Berlin",
      description: t("about.description"),
      url: `${SITE_URL}/${locale}`,
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
