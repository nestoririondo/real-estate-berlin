"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { ArrowRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const ServicesSection = () => {
  const t = useTranslations("home");
  const ts = useTranslations("services");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">
            {t("servicesTitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">{t("servicesSubtitle")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — service list */}
          <div className="border-t border-border">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.42, 0, 0.58, 1] }}
              >
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="w-full text-left group flex items-center justify-between py-6 border-b border-border cursor-pointer"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className="text-xs tabular-nums transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: active === i ? "var(--color-primary)" : "var(--color-muted-foreground)",
                        opacity: active === i ? 1 : 0.4,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-3xl md:text-4xl font-medium leading-none transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: active === i ? "var(--color-primary)" : undefined,
                        }}
                      >
                        {ts(`${service.id}.title`)}
                      </h3>
                      <p
                        className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-sm transition-all duration-300 overflow-hidden"
                        style={{
                          maxHeight: active === i ? "4rem" : "0",
                          opacity: active === i ? 1 : 0,
                        }}
                      >
                        {ts(`${service.id}.shortDescription`).split("—")[0].trim()}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-all duration-300"
                    style={{
                      color: active === i ? "var(--color-primary)" : undefined,
                      opacity: active === i ? 1 : 0.2,
                      transform: active === i ? "translateX(4px)" : "none",
                    }}
                  />
                </button>
              </motion.div>
            ))}

            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href={`/${locale}/services`} className="flex items-center gap-2">
                  {t("seeAllServices")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right — image */}
          <motion.div
            className="hidden lg:block relative h-[520px] overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.42, 0, 0.58, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
              >
                <Image
                  src={services[active].image}
                  alt={ts(`${services[active].id}.title`)}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>

            {/* Active service label on image */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="w-6 h-px bg-primary mb-2" />
              <p
                className="text-white text-lg font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {ts(`${services[active].id}.title`)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };
