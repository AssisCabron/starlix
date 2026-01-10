"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Rocket, Zap, Crown, Infinity } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function PurchasePage() {
    const { t } = useLanguage();
    const router = useRouter();

    const plans = [
        {
            id: 'daily',
            title: t("purchase.plans.daily.title"),
            price: '9.90',
            period: t("purchase.period.day"),
            description: t("purchase.plans.daily.description"),
            features: t("purchase.plans.daily.features") as string[],
            icon: Zap,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20'
        },
        {
            id: 'monthly',
            title: t("purchase.plans.monthly.title"),
            price: '29.90',
            period: t("purchase.period.month"),
            description: t("purchase.plans.monthly.description"),
            features: t("purchase.plans.monthly.features") as string[],
            popular: true,
            icon: Rocket,
            color: 'text-primary',
            bg: 'bg-primary/10',
            border: 'border-primary/20'
        },
        {
            id: 'yearly',
            title: t("purchase.plans.yearly.title"),
            price: '149.90',
            period: t("purchase.period.year"),
            description: t("purchase.plans.yearly.description"),
            features: t("purchase.plans.yearly.features") as string[],
            icon: Crown,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            border: 'border-purple-400/20'
        },
        {
            id: 'lifetime',
            title: t("purchase.plans.lifetime.title"),
            price: '299.90',
            period: t("purchase.period.lifetime"),
            description: t("purchase.plans.lifetime.description"),
            features: t("purchase.plans.lifetime.features") as string[],
            icon: Infinity,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10',
            border: 'border-amber-400/20'
        }
    ];

    const handlePurchase = (planId: string) => {
        router.push(`/checkout?plan=${planId}`);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
            
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {t("purchase.title")} <span className="text-primary text-glow">{t("purchase.title_glow")}</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        {t("purchase.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <Card 
                            key={plan.id}
                            className={`p-6 bg-black/50 backdrop-blur-md border hover:border-primary/50 transition-all duration-300 relative group overflow-hidden ${plan.border}`}
                        >
                             {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    {t("purchase.popular")}
                                </div>
                            )}
                            
                            <div className={`p-3 rounded-lg w-fit mb-4 ${plan.bg}`}>
                                <plan.icon className={`w-6 h-6 ${plan.color}`} />
                            </div>

                            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                            <div className="flex items-end gap-1 mb-4">
                                <span className="text-3xl font-bold text-white">R$ {plan.price}</span>
                                <span className="text-sm text-gray-500 mb-1">{plan.period}</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{plan.description}</p>

                            <ul className="space-y-3 mb-8">
                                {Array.isArray(plan.features) && plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button 
                                className={`w-full font-bold ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}
                                onClick={() => handlePurchase(plan.id)}
                            >
                                {t("purchase.buy_now")}
                            </Button>
                            
                            {/* Hover cleaning effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
