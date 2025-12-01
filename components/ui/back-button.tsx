"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackUrl?: string;
}

const BackButton = ({ fallbackUrl = "/properties" }: BackButtonProps) => {
  const router = useRouter();
  const t = useTranslations("common");

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="gap-2 mb-4"
    >
      <ArrowLeft className="h-4 w-4" />
      {t("back")}
    </Button>
  );
};

export { BackButton };
