"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  benefits: string[];
}

const serviceIds = ["buy", "sell", "renovate", "consulting"] as const;

export const ServicesHero = ({ title, subtitle }: ServicesHeroProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("services");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]" ref={ref}>
      {/* Left — text */}
      <div className="relative z-10 flex flex-col justify-between px-8 md:px-14 lg:px-20 py-16 md:py-20 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-primary mb-6 font-medium">
            Real Estate in Berlin
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
            {title}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            {subtitle}
          </p>
        </motion.div>

        {/* Service list */}
        <motion.div
          className="mt-12 md:mt-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {serviceIds.map((id, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.42, 0, 0.58, 1] }}
            >
              {index === 0 && <div className="h-px bg-border" />}
              <Link
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group/item flex items-center justify-between py-4 transition-colors hover:text-primary"
              >
                <span
                  className="text-lg font-medium transition-transform group-hover/item:translate-x-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {String(index + 1).padStart(2, "0")} — {t(`${id}.title`)}
                </span>
                <span className="text-primary text-sm transition-transform group-hover/item:translate-y-1">↓</span>
              </Link>
              <div className="h-px bg-border" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right — image */}
      <motion.div
        className="relative min-h-[50vh] md:min-h-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
      >
        <Image
          src="/ABOUT-middle.jpg"
          alt="Berlin real estate"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/15" />
      </motion.div>
    </section>
  );
};
