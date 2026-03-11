import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

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
