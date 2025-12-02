"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { allProperties } from "@/lib/data/properties";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const FeaturedListings = () => {
  // Get first 4 properties for featured section
  const featuredProperties = allProperties.slice(0, 4);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our hand-picked selection of premium properties in Berlin
            </p>
          </div>
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/properties" className="flex items-center gap-2">
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

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

        <motion.div
          className="text-center md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Button asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export { FeaturedListings };
