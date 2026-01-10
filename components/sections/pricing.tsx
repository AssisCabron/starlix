"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";

export function Pricing() {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="py-24 relative z-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t("pricing_section.badge")}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {t("pricing_section.title")} <span className="text-primary text-glow">{t("pricing_section.title_glow")}</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            {t("pricing_section.description").split(/\{bold\}|\{\/bold\}/).map((part: string, i: number) => 
               i === 1 ? <span key={i} className="text-white font-bold">{part}</span> : part
            )}
          </p>

          <Link href="/purchase">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_30px_rgba(255,0,60,0.4)] hover:shadow-[0_0_50px_rgba(255,0,60,0.6)] transition-all">
                {t("pricing_section.cta")} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
