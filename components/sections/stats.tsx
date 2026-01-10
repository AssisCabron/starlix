"use client";

import { motion } from "framer-motion";
import { Users, Globe, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

import { useLanguage } from "@/context/LanguageContext";

export function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t("stats.active_users.label"),
      value: "10,000+",
      icon: Users,
      description: t("stats.active_users.description"),
    },
    {
      label: t("stats.global_reach.label"),
      value: "150+",
      icon: Globe,
      description: t("stats.global_reach.description"),
    },
    {
      label: t("stats.rating.label"),
      value: "4.9/5",
      icon: Star,
      description: t("stats.rating.description"),
    },
];

  return (
    <section className="py-20 relative z-10 bg-black/50 backdrop-blur-sm border-y border-white/5">
      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
        >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("stats.title")}</h2>
            <p className="text-gray-400">{t("stats.subtitle")}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                >
                    <Card className="p-6 text-center border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <stat.icon className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                        <p className="text-lg font-semibold text-gray-300">{stat.label}</p>
                        <p className="text-sm text-gray-500">{stat.description}</p>
                    </Card>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
