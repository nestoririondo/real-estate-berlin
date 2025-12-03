"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getBusinessHoursDisplay } from "@/constants/businessHours";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export const ContactInfo = () => {
  const t = useTranslations("contactPage");
  const { ref, isInView } = useInViewAnimation();


  return (
    <>
      {/* Team Image Placeholder */}
      <motion.div
        className="relative h-64 w-full rounded-lg overflow-hidden bg-muted mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }}
        ref={ref}
      >
        {/* User can add team/office image here */}
        {/* <Image
          src="/contact-team.jpg"
          alt="Our Team"
          fill
          className="object-cover"
        /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              {t("info.teamImagePlaceholder")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Google Maps Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.42, 0, 0.58, 1] as const }}
        className="mb-6"
      >
        <Card className="hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              {t("info.location")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Google Maps Embed */}
            <div className="relative w-full h-64 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.1234567890123!2d13.3777!3d52.5079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sLeipziger%20Platz%2015%2C%2010117%20Berlin!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Office Location - Leipziger Platz 15, 10117 Berlin"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="text-muted-foreground">
                Leipziger Platz 15<br />
                10117 Berlin<br />
                Germany
              </p>
              <a
                href="https://maps.google.com/?q=Leipziger+Platz+15,+10117+Berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm inline-block"
              >
                {t("info.viewOnMap")} →
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Opening Times Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.42, 0, 0.58, 1] as const }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              {t("info.hours")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-muted-foreground text-sm">
              {getBusinessHoursDisplay().map((schedule, index) => (
                <p key={index}>
                  {schedule.day}: {schedule.hours === "Closed" ? t("info.closed") : schedule.hours}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </>
  );
};

