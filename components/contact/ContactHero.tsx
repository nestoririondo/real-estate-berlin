"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ContactHeroProps {
  title: string;
  subtitle: string;
  trustBadges: string[];
}

export const ContactHero = ({ title, subtitle, trustBadges }: ContactHeroProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      {/* Background Image - placeholder for user's image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background" />
        {/* User can add their image here */}
        {/* <Image
          src="/contact-hero.jpg"
          alt="Contact Us"
          fill
          className="object-cover opacity-20"
          priority
        /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
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
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.42, 0, 0.58, 1] as const,
            }}
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1,
                  ease: [0.42, 0, 0.58, 1] as const,
                }}
              >
                <span className="text-primary font-semibold">✓</span>
                <span>{badge}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

