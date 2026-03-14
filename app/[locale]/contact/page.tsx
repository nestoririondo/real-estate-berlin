import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Languages } from "lucide-react";
import { getBusinessHoursDisplay } from "@/constants/businessHours";

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

  return {
    title: "Contact",
    description: t("heroSubtitle"),
    alternates: {
      languages: {
        en: `${siteUrl}/en/contact`,
        de: `${siteUrl}/de/contact`,
        es: `${siteUrl}/es/contact`,
        it: `${siteUrl}/it/contact`,
        pt: `${siteUrl}/pt/contact`,
        "x-default": `${siteUrl}/en/contact`,
      },
    },
    openGraph: {
      title: "Contact | Real Estate in Berlin",
      description: t("heroSubtitle"),
      url: `${siteUrl}/${locale}/contact`,
    },
  };
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

const ContactPage = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const hours = getBusinessHoursDisplay();

  return (
    <div className="min-h-screen">
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — image + all info */}
        <div className="relative hidden lg:flex flex-col justify-end">
          <Image
            src="/ABOUT-leftcolumn.jpg"
            alt="Real Estate in Berlin office"
            fill
            className="object-cover"
            priority
            sizes="50vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-12 text-white space-y-8">
            <div>
              <div className="w-10 h-px bg-primary mb-6" />
              <p
                className="text-3xl font-medium leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Real Estate<br />in Berlin
              </p>
              <div className="space-y-2 text-white/75 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Leipziger Platz 15, 10117 Berlin</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href="tel:+493022392323" className="hover:text-white transition-colors">030-22392323</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a href="mailto:info@realestateinberlin.com" className="hover:text-white transition-colors">info@realestateinberlin.com</a>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/15" />

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs tracking-[0.15em] uppercase font-medium text-white/50">{t("info.hours")}</span>
              </div>
              <div className="space-y-1.5 text-sm text-white/75">
                {hours.map((s) => (
                  <div key={s.day} className="flex justify-between gap-6">
                    <span>{s.day}</span>
                    <span className={s.hours === "Closed" ? "text-white/40" : ""}>{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/15" />

            {/* Languages */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Languages className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs tracking-[0.15em] uppercase font-medium text-white/50">{t("info.languages")}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/75">
                {["English", "Deutsch", "Español", "Português", "Italiano"].map((lang) => (
                  <span key={lang}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-24 bg-background">
          <ContactForm />

          {/* Mobile/tablet info — hidden on desktop where left column shows it */}
          <div className="lg:hidden mt-12 pt-12 border-t border-border space-y-8 text-sm">
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Leipziger Platz 15, 10117 Berlin</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+493022392323" className="hover:text-foreground transition-colors">030-22392323</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:info@realestateinberlin.com" className="hover:text-foreground transition-colors">info@realestateinberlin.com</a>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs tracking-[0.15em] uppercase font-medium">{t("info.hours")}</span>
              </div>
              <div className="space-y-1.5 text-muted-foreground">
                {hours.map((s) => (
                  <div key={s.day} className="flex justify-between gap-6">
                    <span>{s.day}</span>
                    <span className={s.hours === "Closed" ? "text-muted-foreground/50" : ""}>{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Languages className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs tracking-[0.15em] uppercase font-medium">{t("info.languages")}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                {["English", "Deutsch", "Español", "Português", "Italiano"].map((lang) => (
                  <span key={lang}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFAQ />

      {/* Full-width map */}
      <div className="w-full h-64 border-t border-border">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Leipziger+Platz+15,+10117+Berlin,+Germany&zoom=16`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office location"
        />
      </div>
    </div>
  );
};

export default ContactPage;
