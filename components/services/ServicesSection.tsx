"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/lib/data/services";

interface ServicesSectionProps {
  services: Service[];
  locale: string;
  title: string;
  subtitle: string;
}

export const ServicesSection = ({
  services,
  locale,
  title,
  subtitle,
}: ServicesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section>
      <div className="container mx-auto px-4 py-16 md:py-20 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>
      </div>
      <div className="divide-y divide-border">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} locale={locale} index={index} />
        ))}
      </div>
    </section>
  );
};
