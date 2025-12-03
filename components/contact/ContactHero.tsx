import { Hero } from "@/components/shared/Hero";

interface ContactHeroProps {
  title: string;
  subtitle: string;
  trustBadges: string[];
}

export const ContactHero = ({ title, subtitle, trustBadges }: ContactHeroProps) => {
  return (
    <Hero
      title={title}
      subtitle={subtitle}
      badges={trustBadges}
      // backgroundImage="/contact-hero.jpg" // Uncomment when image is added
      backgroundImageAlt="Contact Us"
    />
  );
};

