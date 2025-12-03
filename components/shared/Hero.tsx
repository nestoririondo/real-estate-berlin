"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

interface HeroProps {
  title: string;
  subtitle: string;
  badges?: string[];
  backgroundImage?: string;
  backgroundImageAlt?: string;
  children?: React.ReactNode;
}

export const Hero = ({
  title,
  subtitle,
  badges,
  backgroundImage,
  backgroundImageAlt = "Hero background",
  children,
}: HeroProps) => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              backgroundImage ? "text-white" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }}
          >
            {title}
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
              backgroundImage ? "text-white/90" : "text-muted-foreground"
            }`}
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
          {badges && badges.length > 0 && (
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
              {badges.map((badge, index) => (
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
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: badges ? 0.3 + badges.length * 0.1 : 0.2,
                ease: [0.42, 0, 0.58, 1] as const,
              }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

