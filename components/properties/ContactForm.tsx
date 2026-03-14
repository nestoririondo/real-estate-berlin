"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Shield, Phone, Mail } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_E164, COMPANY_EMAIL } from "@/constants/companyInfo";
import { AnimatePresence } from "framer-motion";
import { ContactSuccess } from "@/components/contact/ContactSuccess";

interface ContactFormProps {
  propertyId: number;
  propertyTitle: string;
}

const ContactForm = ({ propertyTitle }: ContactFormProps) => {
  const t = useTranslations("contact");
  const tPage = useTranslations("contactPage");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: propertyTitle }),
      });
      if (!response.ok) throw new Error("Failed to send");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 10000);
    } catch {
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-8">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <ContactSuccess />
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-2">
                {t("agentName")} · {t("agentTitle")}
              </p>
              <h2
                className="text-3xl font-medium leading-tight mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("title")}
              </h2>
              <div className="w-6 h-px bg-primary mt-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prop-name" className="text-xs tracking-[0.12em] uppercase text-muted-foreground block mb-1.5">
                  {tPage("name")} <span className="text-primary">*</span>
                </label>
                <Input
                  id="prop-name"
                  name="name"
                  type="text"
                  placeholder={tPage("namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <label htmlFor="prop-email" className="text-xs tracking-[0.12em] uppercase text-muted-foreground block mb-1.5">
                  {tPage("email")} <span className="text-primary">*</span>
                </label>
                <Input
                  id="prop-email"
                  name="email"
                  type="email"
                  placeholder={tPage("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <label htmlFor="prop-phone" className="text-xs tracking-[0.12em] uppercase text-muted-foreground block mb-1.5">
                  {tPage("phone")} <span className="text-muted-foreground/50">({tPage("optional")})</span>
                </label>
                <Input
                  id="prop-phone"
                  name="phone"
                  type="tel"
                  placeholder={tPage("phonePlaceholder")}
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <label htmlFor="prop-message" className="text-xs tracking-[0.12em] uppercase text-muted-foreground block mb-1.5">
                  {tPage("message")} <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="prop-message"
                  name="message"
                  placeholder={tPage("messagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 resize-none focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full group" disabled={isSubmitting} size="lg">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {tPage("sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {t("sendMessage")}
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                {tPage("formPrivacyNote")}
              </p>
            </form>

            {/* Direct contact */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                {t("orContact")}
              </p>
              <div className="space-y-2">
                <a href={`tel:${COMPANY_PHONE_E164}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors group/link">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  {COMPANY_PHONE}
                </a>
                <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors group/link">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  {COMPANY_EMAIL}
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ContactForm };
