"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Shield, Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "", service: "" });
      setTimeout(() => setIsSubmitted(false), 10000);
    } catch {
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: "buy", label: t("services.buy") },
    { value: "sell", label: t("services.sell") },
    { value: "renovate", label: t("services.renovate") },
    { value: "consulting", label: t("services.consulting") },
    { value: "other", label: t("services.other") },
  ];

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
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
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-4">
              {t("formTitle")}
            </h1>
            <div className="w-10 h-px bg-primary mb-6" />
            <p className="text-muted-foreground max-w-sm">{t("formSubtitle")}</p>
          </div>
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service">{t("service")}</Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="flex h-10 w-full border border-border bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
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
            <div className="space-y-2">
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
                required
              />
            </div>
            <div className="space-y-2">
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
                required
              />
            </div>
          </div>

          <div className="space-y-2">
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {t("message")} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("messagePlaceholder")}
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
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

          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            {t("formPrivacyNote")}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
