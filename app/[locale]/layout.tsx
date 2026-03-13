import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Real Estate in Berlin",
      template: "%s | Real Estate in Berlin",
    },
    description:
      "Expert real estate services in Berlin — buying, selling, renovation and consulting. IVD member. Multilingual team: EN, DE, ES, IT, PT.",
    openGraph: {
      siteName: "Real Estate in Berlin",
      locale,
      images: [{ url: "/ABOUT-middle.jpg", width: 1200, height: 800, alt: "Real Estate in Berlin" }],
    },
    twitter: { card: "summary_large_image" },
  };
}


export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if (typeof chrome === 'undefined') {
                  window.chrome = {};
                }
                if (typeof globalThis !== 'undefined' && typeof globalThis.chrome === 'undefined') {
                  globalThis.chrome = {};
                }
              }
            `,
          }}
        />
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <header>
              <NavBar />
            </header>
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
