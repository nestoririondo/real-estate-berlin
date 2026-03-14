"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, CheckCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { COMPANY_PHONE, COMPANY_PHONE_E164, COMPANY_EMAIL } from "@/constants/companyInfo";
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
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
