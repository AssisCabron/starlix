"use client";

import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/card";

import { useLanguage } from "@/context/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  const testimonialList = [
    {
      name: "AlexRager",
      role: t("testimonials.roles.buyer"),
      content: t("testimonials.quotes.alex"),
      rating: 5,
    },
    {
      name: "NightStalker",
      role: t("testimonials.roles.lifetime"),
      content: t("testimonials.quotes.night"),
      rating: 5,
    },
    {
      name: "FiveGod",
      role: t("testimonials.roles.subscriber"),
      content: t("testimonials.quotes.fivegod"),
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-24 relative z-10 bg-black/30">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">{t("testimonials.badge")}</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2">{t("testimonials.title")}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialList.map((t, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                    >
                        <Card className="p-8 h-full bg-white/5 border-white/5 hover:border-primary/30 transition-colors">
                            <MessageSquareQuote className="w-10 h-10 text-primary/40 mb-4" />
                            <p className="text-gray-300 mb-6 italic">"{t.content}"</p>
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <span className="text-xs text-primary">{t.role}</span>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
