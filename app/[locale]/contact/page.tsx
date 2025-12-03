import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { getTranslations } from "next-intl/server";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

const ContactPage = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        trustBadges={[t("trustBadge1"), t("trustBadge2"), t("trustBadge3")]}
      />

      {/* Main Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Maps and Team Image */}
            <div className="lg:col-span-1 space-y-6">
              <ContactInfo />
            </div>

            {/* Right Side - Form and Info Cards in Bento Layout */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Form */}
              <ContactForm />
              
              {/* Contact Info Cards in Bento Grid */}
              <ContactInfoCards />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQ />
    </div>
  );
};

export default ContactPage;
