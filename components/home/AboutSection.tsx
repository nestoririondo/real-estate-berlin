"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin, Languages, Award, Handshake } from "lucide-react";

const AboutSection = () => {
  const t = useTranslations("home");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: MapPin,
      key: "localExpertise",
    },
    {
      icon: Languages,
      key: "multilingual",
    },
    {
      icon: Award,
      key: "ivdMember",
    },
    {
      icon: Handshake,
      key: "personalService",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Image Side */}
          <motion.div
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <Image
              src="/fabrizio-resized.jpg"
              alt={t("about.founderImageAlt")}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("about.title")}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("about.description")}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.key}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {t(`about.highlights.${highlight.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`about.highlights.${highlight.key}.description`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
            >
              <Button asChild size="lg" className="text-lg group">
                <Link href={`/${locale}/contact`} className="flex items-center gap-2">
                  {t("about.cta")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { AboutSection };
