"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Crosshair, Ghost, Terminal, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "100% External",
    description: "Operates completely outside the game process. Zero injection risks.",
    icon: Shield,
  },
  {
    title: "Silent Aim",
    description: "Advanced humantized aimbot with adjustable FOV and smoothing.",
    icon: Crosshair,
  },
  {
    title: "ESP High-Performance",
    description: "See players, vehicles, and items through walls with zero FPS drop.",
    icon: Ghost,
  },
  {
    title: "Lua Execution",
    description: "Load and run any Lua script instantly. Full compatibility.",
    icon: Terminal,
  },
  {
    title: "Instant Update",
    description: "Cloud-based updates ensure you are always protected.",
    icon: Zap,
  },
  {
    title: "Configurable",
    description: "Save and load multiple config profiles for different servers.",
    icon: Settings,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm">Designed to Dominate</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">Unrivaled Settings</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Packed with industry-leading features that put you in control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
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
