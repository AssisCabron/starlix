"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function CommonIssuesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dashboard">
             <Button variant="ghost" className="mb-6">&larr; {t("dashboard.subscription.back")}</Button>
        </Link>
        
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">{t("docs.issues.title")}</h1>
            <p className="text-gray-400 text-lg">{t("docs.issues.subtitle")}</p>
        </div>

        <div className="grid gap-6">
            <Card className="p-6 border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">{t("docs.issues.items.crashes.title")}</h3>
                <p className="text-gray-300">
                    {t("docs.issues.items.crashes.description")}
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">{t("docs.issues.items.hwid.title")}</h3>
                <p className="text-gray-300">
                    {t("docs.issues.items.hwid.description")}
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">{t("docs.issues.items.menu.title")}</h3>
                <p className="text-gray-300">
                    {t("docs.issues.items.menu.description")}
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
