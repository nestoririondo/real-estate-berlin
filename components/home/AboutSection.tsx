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
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Image Side - Gallery Wall Style */}
          <div className="relative h-[360px] md:h-[600px] lg:h-[650px]">
            {/* Decorative shape - top left */}
            <motion.div
              className="absolute -top-6 -left-6 md:top-0 md:left-4 w-28 h-28 md:w-40 md:h-40 bg-primary/20 rounded-2xl z-0"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.8, rotate: -10 }
              }
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            {/* Decorative shape - top right */}
            <motion.div
              className="absolute top-8 right-0 md:top-4 md:right-8 w-24 h-24 md:w-32 md:h-32 bg-muted rounded-xl z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Main founder image */}
            <motion.div
              className="absolute top-4 left-4 md:top-12 md:left-16 w-[55%] md:w-[65%] h-[300px] md:h-auto md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-20"
              initial={{ opacity: 0, y: 30, x: -20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, x: 0 }
                  : { opacity: 0, y: 30, x: -20 }
              }
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              <Image
                src="/fabrizio-resized.jpg"
                alt={t("about.founderImageAlt")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 70vw, 35vw"
              />
            </motion.div>

            {/* Decorative shape - bottom right (larger) */}
            <motion.div
              className="absolute bottom-12 right-0 md:bottom-8 md:right-4 w-40 h-48 md:w-52 md:h-64 bg-primary/15 rounded-2xl z-10"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Decorative shape - bottom left */}
            <motion.div
              className="absolute bottom-0 left-0 md:bottom-4 md:left-0 w-20 h-20 md:w-28 md:h-28 bg-muted rounded-xl z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>

          {/* Content Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("about.title")}{" "}
                <span className="relative inline-block">
                  {t("about.titleHighlight")}
                  <motion.img
                    src="/underline.png"
                    alt=""
                    className="absolute bottom-0 left-0 translate-y-4 w-[250%] h-6 md:h-7"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={
                      isInView
                        ? { opacity: 1, scaleX: 1 }
                        : { opacity: 0, scaleX: 0 }
                    }
                    transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
                    // use CSS filter to tint the PNG; adjust hue-rotate to match your accent color
                    style={{
                      transformOrigin: "left",
                      filter: "hue-rotate(150deg)",
                    }}
                  />
                </span>
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
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.1,
                      ease: "easeOut",
                    }}
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
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center gap-2"
                >
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
