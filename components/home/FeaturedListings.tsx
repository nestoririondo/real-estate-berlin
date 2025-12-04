"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyCardSkeleton } from "@/components/properties/PropertyCardSkeleton";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useProperties } from "@/hooks/useProperties";

const FeaturedListings = () => {
  const t = useTranslations("home");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fetch properties from API
  const { properties, loading } = useProperties({
    locale: locale === "de" ? "de" : "en",
  });

  // Get last 4 properties (most recent) - sort by created_at or updated_at if available
  const featuredProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    
    // Sort by created_at (most recent first), fallback to updated_at, then take first 4
    const sorted = [...properties].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      if (dateA !== dateB) return dateB - dateA; // Most recent first
      
      // Fallback to updated_at
      const updatedA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const updatedB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return updatedB - updatedA;
    });
    
    return sorted.slice(0, 4);
  }, [properties]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as const, // easeOut cubic bezier
      },
    },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="flex justify-between items-end mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("featuredProperties")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {t("featuredPropertiesSubtitle")}
            </p>
          </div>
          <Button asChild variant="secondary" className="hidden md:flex text-lg group">
            <Link href={`/${locale}/properties`} className="flex items-center gap-2">
              {t("viewAllProperties")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featuredProperties.map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Button asChild variant="secondary" className="text-lg group">
            <Link href={`/${locale}/properties`} className="flex items-center gap-2">
              {t("viewAllProperties")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export { FeaturedListings };
