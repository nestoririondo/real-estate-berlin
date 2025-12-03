"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Languages,
  MessageSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { isBusinessOpen } from "@/constants/businessHours";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { staggerContainerVariants } from "@/lib/utils/animations";

export const ContactInfoCards = () => {
  const t = useTranslations("contactPage");
  const { ref, isInView } = useInViewAnimation();

  const available = isBusinessOpen();

  const contactItems = [
    {
      icon: MessageSquare,
      title: "Contact",
      content: (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">{t("info.phone")}</span>
              </div>
              {available && (
                <Badge variant="secondary">
                  {t("info.availableNow")}
                </Badge>
              )}
            </div>
            <a
              href="tel:+493022392323"
              className="text-primary hover:underline text-lg font-semibold block"
            >
              030-22392323
            </a>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground">{t("info.email")}</span>
            </div>
            <a
              href="mailto:info@realestateinberlin.com"
              className="text-primary hover:underline break-all block"
            >
              info@realestateinberlin.com
            </a>
          </div>
        </div>
      ),
      action: null,
      span: "col-span-1",
    },
    {
      icon: Languages,
      title: t("info.languages"),
      content: (
        <div className="flex flex-wrap gap-3">
          {["English", "German", "Spanish", "Portuguese", "Italian"].map(
            (lang) => (
              <Badge key={lang} variant="secondary" className="text-sm px-3 py-1.5 bg-primary/10 border-primary/20">
                {lang}
              </Badge>
            )
          )}
        </div>
      ),
      action: null,
      span: "col-span-1",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  return (
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div key={index} variants={itemVariants} className={item.span}>
            <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="h-5 w-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1">
                  {item.content}
                </div>
                {item.action && (
                  <div className="mt-4">
                    {item.action}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

