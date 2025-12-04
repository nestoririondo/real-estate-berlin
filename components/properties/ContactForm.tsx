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
import { Mail, Phone, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  propertyId: number;
  propertyTitle: string;
}

const ContactForm = ({ propertyId, propertyTitle }: ContactFormProps) => {
  const t = useTranslations("contact");
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    // Reset success message after 10 seconds
    setTimeout(() => setIsSubmitted(false), 10000);
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
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
        <p className="text-sm text-muted-foreground mt-3">
          {t("subtitle")}
        </p>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("sent")}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("sentDescription")}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <Clock className="h-4 w-4" />
              <span>{t("responsePromise")}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
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
              <Label htmlFor="email">{t("email")}</Label>
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

            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")} <span className="text-muted-foreground text-xs">({t("optional")})</span></Label>
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
              <Label htmlFor="message">{t("message")}</Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t("messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105 disabled:hover:scale-100" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <MessageSquare className="h-4 w-4 mr-2 animate-pulse" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t("sendMessage")}
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              {t("privacyNote")}
            </p>
          </form>
        )}

        <Separator className="my-6" />

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="font-semibold">{t("orContact")}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href="tel:+493012345678" className="hover:text-primary">
                +49 30 123 456 78
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href="mailto:info@realestateberlin.com"
                className="hover:text-primary"
              >
                info@realestateberlin.com
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ContactForm };

