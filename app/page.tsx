"use client";

import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { DashboardPreview } from "@/components/sections/dashboard-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Stats />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      
      {/* Bottom CTA Section */}
      <section className="py-24 text-center relative z-10">
         <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
         <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              {t("footer_cta.title")} <span className="text-primary text-glow">{t("footer_cta.title_glow")}</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                {t("footer_cta.description")}
            </p>
            <a 
                href="#pricing" 
                className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-lg font-medium text-white shadow-[0_0_20px_#FF003C] hover:bg-primary/90 hover:shadow-[0_0_40px_#FF003C] transition-all"
            >
                {t("footer_cta.cta")}
            </a>
         </div>
      </section>
    </div>
  );
}
