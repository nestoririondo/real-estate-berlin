"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, CheckCircle, FileText, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { COMPANY_PHONE, COMPANY_PHONE_E164, COMPANY_EMAIL, COMPANY_WHATSAPP_URL, COMPANY_INSTAGRAM_URL, COMPANY_LINKEDIN_URL } from "@/constants/companyInfo";
import { motion } from "framer-motion";

const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL ?? "";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const form = new FormData();
      form.append("EMAIL", email);
      form.append("b_95e0312e937c0373aca5daa01_925adeb7cb", ""); // honeypot
      form.append("gdpr[63044]", "Y");

      await fetch(MAILCHIMP_URL, {
        method: "POST",
        body: form,
        mode: "no-cors", // Mailchimp doesn't allow CORS, no-cors silences the error
      });

      setSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Location */}
          <div>
            <h6 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t("location")}
            </h6>
            <p className="text-muted-foreground">
              Leipziger Platz 15<br />
              10117 Berlin, Germany
            </p>
          </div>

          {/* Contact */}
          <div>
            <h6 className="font-semibold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {t("contact")}
            </h6>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <a href={`tel:${COMPANY_PHONE_E164}`} className="hover:text-primary transition-colors">
                  {COMPANY_PHONE}
                </a>
              </p>
              <p>
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-primary transition-colors">
                  {COMPANY_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h6 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t("legal")}
            </h6>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href={`/${locale}/impressum`} className="hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className="hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h6 className="font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {t("newsletter")}
            </h6>
            <p className="text-sm text-muted-foreground mb-3">
              {t("newsletterDesc")}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">{t("subscribed")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={loading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Social Media */}
        <div className="flex justify-center gap-4 mb-8">
          {COMPANY_WHATSAPP_URL && (
            <a
              href={COMPANY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          )}
          {COMPANY_INSTAGRAM_URL && (
            <a
              href={COMPANY_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
          {COMPANY_LINKEDIN_URL && (
            <a
              href={COMPANY_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="text-center text-muted-foreground space-y-4">
          <p>&copy; {new Date().getFullYear()} {t("rights")}</p>
          <p className="text-sm">
            {t("websiteBy")}{" "}
            <motion.a
              href="https://nestoririondo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-medium"
              whileHover="hover"
            >
              {"Nestor Iriondo".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.4 }}
                  variants={{
                    hover: {
                      color: "var(--color-primary)",
                      opacity: 1,

                      transition: { delay: i * 0.04, duration: 0.15 },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
