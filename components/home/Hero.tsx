"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const Hero = () => {
  const t = useTranslations("home");
  const locale = useLocale();
  const { ref, isInView } = useInViewAnimation();

  return (
    <section className="relative py-30 md:py-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/header-pages-berlin-4577624_1920.jpg"
          alt="Berlin skyline"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        {/* <div className="absolute inset-0 bg-black/20" /> */}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button asChild size="lg" className="text-lg transition-transform duration-200 hover:scale-105 group">
              <Link href={`/${locale}/properties`} className="flex items-center gap-2">
                {t("browseProperties")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero };
