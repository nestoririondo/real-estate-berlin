"use client";

import { useTranslations } from "next-intl";
import { Home, Users, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/ui/count-up";

export const ServiceStats = () => {
  const t = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Home,
      value: 500,
      suffix: "+",
      label: t("stats.propertiesLabel"),
      delay: 0,
    },
    {
      icon: Users,
      value: 300,
      suffix: "+",
      label: t("stats.clientsLabel"),
      delay: 0.1,
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: "%",
      label: t("stats.satisfactionLabel"),
      delay: 0.2,
    },
    {
      icon: Award,
      value: 15,
      suffix: "+",
      label: t("stats.experienceLabel"),
      delay: 0.3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section className="py-12 md:py-16 border-y bg-muted/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{
                    delay: stat.delay,
                    duration: 0.5,
                    ease: [0.42, 0, 0.58, 1] as const,
                  }}
                >
                  <Icon className="h-6 w-6 text-primary" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <CountUp
                    to={stat.value}
                    from={0}
                    duration={2}
                    delay={stat.delay}
                    startWhen={isInView}
                    separator=","
                  />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

