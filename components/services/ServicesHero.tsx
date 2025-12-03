import { Hero } from "@/components/shared/Hero";

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  benefits: string[];
}

export const ServicesHero = ({ title, subtitle, benefits }: ServicesHeroProps) => {
  return (
    <Hero
      title={title}
      subtitle={subtitle}
      badges={benefits}
      // backgroundImage="/services-hero.jpg" // Uncomment when image is added
      backgroundImageAlt="Real Estate Services"
    />
  );
};

