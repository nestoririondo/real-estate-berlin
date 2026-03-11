"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mueller",
    role: "Apartment Buyer",
    content:
      "Excellent service! They helped us find our perfect apartment in Prenzlauer Berg. The team was professional, responsive, and made the entire process smooth and stress-free.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Schmidt",
    role: "Property Seller",
    content:
      "I was impressed by their market knowledge and negotiation skills. They sold my property at a great price within just a few weeks. Highly recommend their services!",
    rating: 5,
  },
  {
    id: 3,
    name: "Anna Weber",
    role: "First-time Buyer",
    content:
      "As a first-time buyer, I had many questions. The team was patient, explained everything clearly, and guided me through every step. I couldn't have asked for better support.",
    rating: 5,
  },
];

// Duplicate testimonials for seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  const t = useTranslations("home");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();

  // Start the carousel animation when in view
  useEffect(() => {
    if (isInView && !isPaused) {
      controls.start({
        x: "-50%",
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [isInView, isPaused, controls]);

  // Pause/resume animation on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    controls.start({
      x: "-50%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with decorative elements */}
        <div className="relative mb-16">
          {/* Decorative shape - left */}
          <motion.div
            className="absolute -left-8 top-0 w-16 h-16 bg-primary/10 rounded-lg hidden md:block"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          <motion.div
            ref={ref}
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("testimonialsTitle")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("testimonialsSubtitle")}
            </p>
          </motion.div>

          {/* Decorative shape - right */}
          <motion.div
            className="absolute -right-4 bottom-0 w-12 h-12 bg-muted rounded-lg hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Auto-scrolling Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={controls}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[320px] md:w-[400px]"
              >
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6 flex-1">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-base">{testimonial.name}</p>
                        <p className="text-base text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
