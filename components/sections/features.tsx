"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Crosshair, Ghost, Terminal, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

import { useLanguage } from "@/context/LanguageContext";

export function Features() {
  const { t } = useLanguage();

  const featuresList = [
    {
      title: t("features.items.external.title"),
      description: t("features.items.external.description"),
      icon: Shield,
    },
    {
      title: t("features.items.aimbot.title"),
      description: t("features.items.aimbot.description"),
      icon: Crosshair,
    },
    {
      title: t("features.items.esp.title"),
      description: t("features.items.esp.description"),
      icon: Ghost,
    },
    {
      title: t("features.items.lua.title"),
      description: t("features.items.lua.description"),
      icon: Terminal,
    },
    {
      title: t("features.items.update.title"),
      description: t("features.items.update.description"),
      icon: Zap,
    },
    {
      title: t("features.items.config.title"),
      description: t("features.items.config.description"),
      icon: Settings,
    },
  ];

  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm">{t("features.badge")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">{t("features.title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full bg-black/40 border-white/5 hover:border-primary/50 group">
                <div className="p-8">
                  <div className="mb-6 p-4 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary shadow-glow" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
