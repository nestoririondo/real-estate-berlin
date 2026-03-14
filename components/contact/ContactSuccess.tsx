"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export const ContactSuccess = () => {
  const t = useTranslations("contactPage");

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <CheckCircle2 className="h-10 w-10 text-primary mb-6" />
      <h3 className="text-2xl font-medium mb-3">{t("successTitle")}</h3>
      <p className="text-muted-foreground mb-4">{t("successMessage")}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>{t("privacyNote")}</span>
      </div>
    </motion.div>
  );
};
