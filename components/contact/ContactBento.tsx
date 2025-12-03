"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle2,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ContactBento = () => {
  const t = useTranslations("contactPage");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Property Buyer",
      content: "Amazing service! Found my dream apartment in just 2 weeks.",
      rating: 5,
    },
    {
      name: "Michael K.",
      role: "Property Seller",
      content: "Professional team, great communication throughout the process.",
      rating: 5,
    },
  ];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full"
    >
      {/* Stats Card - Large */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">300+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Response Time Card */}
      <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              {t("responseTime")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5 min</div>
              <p className="text-sm text-muted-foreground">
                Average response time
              </p>
              <Badge variant="secondary" className="mt-3">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Available Now
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Contact Card */}
      <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-background to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5 text-primary" />
              Quick Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center space-y-3">
            <a
              href="tel:+493022392323"
              className="text-2xl font-bold text-primary hover:underline transition-colors"
            >
              030-22392323
            </a>
            <a
              href="mailto:info@realestateinberlin.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
            >
              info@realestateinberlin.com
            </a>
          </CardContent>
        </Card>
      </motion.div>

      {/* Testimonial 1 */}
      <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex gap-1 mb-3">
              {[...Array(testimonials[0].rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 flex-1 italic">
              "{testimonials[0].content}"
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {testimonials[0].name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{testimonials[0].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[0].role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Testimonial 2 */}
      <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex gap-1 mb-3">
              {[...Array(testimonials[1].rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 flex-1 italic">
              "{testimonials[1].content}"
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {testimonials[1].name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{testimonials[1].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[1].role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Why Choose Us Card - Large */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Why Choose Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">Free Consultation</p>
                  <p className="text-xs text-muted-foreground">
                    No obligation initial meeting
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">Expert Team</p>
                  <p className="text-xs text-muted-foreground">
                    15+ years of experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">500+ Properties</p>
                  <p className="text-xs text-muted-foreground">
                    Successfully sold and rented
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

