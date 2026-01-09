"use client";

import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "AlexRager",
    role: "Verified Buyer",
    content: "Best external I've ever used. The aimbot is so legit looking, admins spectated me for 30 mins and found nothing. 10/10.",
    rating: 5,
  },
  {
    name: "NightStalker",
    role: "Lifetime User",
    content: "Support is insane. Had an issue with my key and they fixed it in 2 minutes. The menu itself is smooth as butter.",
    rating: 5,
  },
  {
    name: "FiveGod",
    role: "Month Sub",
    content: "RedENGINE lookalike but feels even better optimized. FPS barely drops even with full ESP on. Starlix is the future.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 relative z-10 bg-black/30">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Community Feedback</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2">What They Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
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
