"use client";

import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackUrl?: string;
}

const BackButton = ({ fallbackUrl }: BackButtonProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("properties");

  const handleBack = () => {
    // Always go to properties page with locale
    const propertiesUrl = fallbackUrl || `/${locale}/properties`;
    router.push(propertiesUrl);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="gap-2 mb-4"
    >
      <ArrowLeft className="h-4 w-4" />
      {t("allProperties")}
    </Button>
  );
};

export { BackButton };
