"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MessageSquare } from "lucide-react";

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

    // In real app, send to API
    console.log("Form submitted:", { ...formData, propertyId, propertyTitle });

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    // Reset success message after 10 seconds
    setTimeout(() => setIsSubmitted(false), 10000);
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          {t("subtitle")}
        </p>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("sent")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("sentDescription")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
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
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+49 123 456 789"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("message")}</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your interest in this property..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                t("sending")
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t("sendMessage")}
                </>
              )}
            </Button>
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

