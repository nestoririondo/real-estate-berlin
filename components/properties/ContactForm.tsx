"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Send, Clock, Loader2, Shield } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        body: JSON.stringify({
          ...formData,
          service: propertyTitle,
        }),
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
    <Card className="sticky top-8">
      {!isSubmitted && (<CardHeader>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/fabrizio-avatar.jpg" alt="Fabrizio" />
            <AvatarFallback className="bg-primary/20 text-primary text-xl font-semibold">
              F
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl mb-1">{t("title")}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("agentName")} • {t("agentTitle")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-md">
          <Clock className="h-4 w-4" />
          <span>{t("responseTime")}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3">{t("subtitle")}</p>
      </CardHeader>)}

      <CardContent>
        <AnimatePresence mode="wait">
        {isSubmitted ? (
          <ContactSuccess />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prop-name">{tPage("name")} <span className="text-destructive">*</span></Label>
              <Input
                id="prop-name"
                name="name"
                type="text"
                placeholder={tPage("namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prop-email">{tPage("email")} <span className="text-destructive">*</span></Label>
              <Input
                id="prop-email"
                name="email"
                type="email"
                placeholder={tPage("emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prop-phone">
                {tPage("phone")} <span className="text-muted-foreground text-xs">({tPage("optional")})</span>
              </Label>
              <Input
                id="prop-phone"
                name="phone"
                type="tel"
                placeholder={tPage("phonePlaceholder")}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prop-message">{tPage("message")} <span className="text-destructive">*</span></Label>
              <Textarea
                id="prop-message"
                name="message"
                placeholder={tPage("messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="resize-none"
              />
            </div>

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

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="h-3 w-3" />
              {tPage("formPrivacyNote")}
            </p>
          </form>
        )}
        </AnimatePresence>

        <Separator className="my-6" />

        <div className="space-y-3">
          <h3 className="font-semibold">{t("orContact")}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${COMPANY_PHONE_E164}`} className="hover:text-primary transition-colors">
                {COMPANY_PHONE}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-primary transition-colors">
                {COMPANY_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ContactForm };
