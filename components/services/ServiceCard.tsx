"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Tag, Wrench, Users, ArrowRight, CheckCircle2, Clock, Euro } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { Service } from "@/lib/data/services";

const iconMap = {
  buy: Home,
  sell: Tag,
  renovate: Wrench,
  consulting: Users,
};

interface ServiceCardProps {
  service: Service;
  locale: string;
}

export const ServiceCard = ({ service, locale }: ServiceCardProps) => {
  const t = useTranslations("services");
  const Icon = iconMap[service.id as keyof typeof iconMap];

  // Get service-specific translations
  const serviceKey = service.id as "buy" | "sell" | "renovate" | "consulting";
  
  // Access nested translations - benefits array
  const benefits: string[] = [];
  try {
    const benefitsData = t.raw(`${serviceKey}.benefits`);
    if (Array.isArray(benefitsData)) {
      benefits.push(...benefitsData);
    }
  } catch {
    // Fallback if translation not found
  }

  // Access nested translations - process array
  const processSteps: string[] = [];
  try {
    const processData = t.raw(`${serviceKey}.process`);
    if (Array.isArray(processData)) {
      processSteps.push(...processData);
    }
  } catch {
    // Fallback if translation not found
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Section - placeholder for user's images */}
      <motion.div
        className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* User can add service-specific images here */}
        {/* <Image
          src={`/services-${service.id}.jpg`}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-20 w-20 rounded-lg bg-primary/20 flex items-center justify-center backdrop-blur-sm"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-10 w-10 text-primary" />
          </motion.div>
        </div>
      </motion.div>

      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {t(`${serviceKey}.badge`)}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Key Benefits */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {t("keyBenefits")}
          </h4>
          <ul className="space-y-2">
            {benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process Steps */}
        {processSteps && processSteps.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {t("ourProcess")}
            </h4>
            <div className="space-y-2">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-4 border-t">
          <Button asChild className="w-full group/btn" size="lg">
            <Link href={`/${locale}/contact`} className="flex items-center justify-center gap-2">
              {t(`${serviceKey}.cta`)}
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

