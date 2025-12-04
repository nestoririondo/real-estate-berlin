"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Shield,
  Send,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contactPage");
  const { ref, isInView } = useInViewAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "", service: "" });

    // Reset success message after 10 seconds
    setTimeout(() => setIsSubmitted(false), 10000);
  };

  const services = [
    { value: "buy", label: t("services.buy") },
    { value: "sell", label: t("services.sell") },
    { value: "renovate", label: t("services.renovate") },
    { value: "consulting", label: t("services.consulting") },
    { value: "other", label: t("services.other") },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // Custom easing for more dramatic effect
        scale: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1] as const, // Bouncy scale effect
        },
      }}
    >
      <Card className="relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-2xl">{t("formTitle")}</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {t("responseTime")}
          </Badge>
        </div>
        <p className="text-muted-foreground">{t("formSubtitle")}</p>
      </CardHeader>

      <CardContent className="relative">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <motion.div
                className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
              >
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3">{t("successTitle")}</h3>
              <p className="text-muted-foreground mb-4">{t("successMessage")}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>{t("privacyNote")}</span>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">{t("service")}</Label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{t("servicePlaceholder")}</option>
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="space-y-2"
                  animate={{
                    scale: focusedField === "name" ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="name">
                    {t("name")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="transition-all"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  animate={{
                    scale: focusedField === "email" ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="email">
                    {t("email")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="transition-all"
                  />
                </motion.div>
              </div>

              <motion.div
                className="space-y-2"
                animate={{
                  scale: focusedField === "phone" ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="phone">
                  {t("phone")} <span className="text-muted-foreground">({t("optional")})</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="transition-all"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                animate={{
                  scale: focusedField === "message" ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="message">
                  {t("message")} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("messagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  required
                  className="transition-all resize-none"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {t("sendButton")}
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                {t("formPrivacyNote")}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
    </motion.div>
  );
};

