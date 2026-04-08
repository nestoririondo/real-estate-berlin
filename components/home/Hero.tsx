"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Hero = () => {
  const t = useTranslations("home");
  const locale = useLocale();
  const { ref, isInView } = useInViewAnimation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const darkModeImage = "/header-pages-berlin-4577624_1920.jpg";
  const lightModeImage = "https://media.istockphoto.com/id/503874284/de/foto/berlin-skyline-mit-spree-bei-sonnenuntergang-deutschland.jpg?s=1024x1024&w=is&k=20&c=JfUhT6VazsIMjUoIsnTVi394JJcibNjVgNz5kpqYTD8=";

  const currentTheme = mounted ? (resolvedTheme || "dark") : "dark";
  const isDark = currentTheme === "dark" || currentTheme === "theme-navy" || currentTheme === "theme-cognac";

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex flex-col justify-between">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 transition-opacity duration-500 ${mounted && isDark ? "opacity-100" : "opacity-0"} dark:opacity-100`}>
          <Image src={darkModeImage} alt="Berlin skyline at night" fill className="object-cover object-[30%_center]" priority quality={90} unoptimized />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-500 ${mounted && !isDark ? "opacity-100" : "opacity-0"} dark:opacity-0`}>
          <Image src={lightModeImage} alt="Berlin skyline at sunset" fill className="object-cover object-[30%_center]" priority quality={90} />
        </div>
        <div className={`absolute inset-0 transition-all duration-500 ${mounted && isDark ? "bg-black/40" : "bg-black/50"} dark:bg-black/40`} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 flex flex-col justify-between h-full min-h-[90vh] px-8 md:px-14 lg:px-20 py-16 md:py-24">
        {/* Top eyebrow */}
        <motion.p
          className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Berlin, Germany
        </motion.p>

        {/* Center text block */}
        <div>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-white whitespace-nowrap mb-6"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
          >
            {t("brandName")}
          </motion.h1>
          <motion.div
            className="w-10 h-px bg-primary mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.42, 0, 0.58, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.42, 0, 0.58, 1] }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.42, 0, 0.58, 1] }}
          >
            <Button asChild size="lg" className="group">
              <Link href={`/${locale}/properties`} className="flex items-center gap-2">
                {t("browseProperties")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom stats row */}
        <div className="flex gap-10">
          {[
            { value: "15+", label: "Experience" },
            { value: "500+", label: "Transactions" },
            { value: "5", label: "Languages" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.15, ease: [0.42, 0, 0.58, 1] }}
            >
              <div
                className="text-3xl font-medium text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/75 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero };
