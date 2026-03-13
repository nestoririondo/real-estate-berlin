"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import type { Service } from "@/lib/data/services";

interface ServiceCardProps {
  service: Service;
  locale: string;
  index: number;
}

export const ServiceCard = ({ service, locale, index }: ServiceCardProps) => {
  const t = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const serviceKey = service.id as "buy" | "sell" | "renovate" | "consulting";
  const isImageRight = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
      id={service.id}
      className="group grid grid-cols-1 md:grid-cols-2 min-h-[500px] scroll-mt-16"
    >
      {/* Image — always first in DOM so it renders on top on mobile */}
      <div className={`relative min-h-[300px] md:min-h-0 overflow-hidden ${isImageRight ? "md:order-2" : ""}`}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Text */}
      <div className={`flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 md:py-24 bg-background ${isImageRight ? "md:order-1" : ""}`}>
        <span
          className="text-8xl font-light text-primary/10 leading-none mb-2 select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
          {t(`${serviceKey}.title`)}
        </h3>
        <div className="w-10 h-px bg-primary mb-8" />
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
          {t(`${serviceKey}.description`)}
        </p>
        <div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group/btn border-primary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Link href={`/${locale}/contact`} className="flex items-center gap-2">
              {t(`${serviceKey}.cta`)}
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
