"use client";

import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function InstallationPage() {
  const { t } = useLanguage();

  const renderBold = (text: string) => {
    const parts = text.split("{bold}");
    if (parts.length < 2) return text;
    return (
      <>
        {parts[0]}
        <strong>{parts[1].split("{/bold}")[0]}</strong>
        {parts[1].split("{/bold}")[1]}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dashboard">
             <Button variant="ghost" className="mb-6">&larr; {t("dashboard.subscription.back")}</Button>
        </Link>
        
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">{t("docs.installation.title")}</h1>
            <p className="text-gray-400 text-lg">{t("docs.installation.subtitle")}</p>
        </div>

        <div className="space-y-8">
            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    {t("docs.installation.steps.1.title")}
                </h2>
                <p className="text-gray-300 mb-4">
                    {t("docs.installation.steps.1.description")}
                </p>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-sm">{t("docs.installation.steps.1.note")}</p>
                </div>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    {t("docs.installation.steps.2.title")}
                </h2>
                <p className="text-gray-300">
                    {renderBold(t("docs.installation.steps.2.description"))}
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    {t("docs.installation.steps.3.title")}
                </h2>
                <p className="text-gray-300">
                    {t("docs.installation.steps.3.description")}
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    {t("docs.installation.steps.4.title")}
                </h2>
                <p className="text-gray-300">
                    {t("docs.installation.steps.4.description")}
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
