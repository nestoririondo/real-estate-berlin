"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface ServicesCTAProps {
  locale: string;
  title: string;
  subtitle: string;
  primaryButton: string;
  primaryLink: string;
  secondaryButton: string;
  secondaryLink: string;
}

export const ServicesCTA = ({
  locale,
  title,
  subtitle,
  primaryButton,
  primaryLink,
  secondaryButton,
  secondaryLink,
}: ServicesCTAProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.42, 0, 0.58, 1] as const,
            }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.42, 0, 0.58, 1] as const,
            }}
          >
            <motion.a
              href={primaryLink}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {primaryButton}
            </motion.a>
            <motion.a
              href={secondaryLink}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md border border-primary text-primary hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {secondaryButton}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

