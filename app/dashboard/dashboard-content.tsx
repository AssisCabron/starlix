"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Shield, Clock, Ticket } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./logout-button";
import RedeemForm from "./redeem-form";
import { downloadLoader } from "./actions";

interface DashboardContentProps {
  profile: any;
}

export function DashboardContent({ profile }: DashboardContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
           <div>
             <h1 className="text-3xl font-bold text-white mb-2">{t("dashboard.title")}</h1>
             <p className="text-gray-400">{t("dashboard.welcome")}, <span className="text-primary font-bold">{profile?.email}</span></p>
           </div>
           
           <div className="flex items-center gap-4">
               <Button variant="outline" className="gap-2">
                   <Shield className="w-4 h-4 text-green-500" /> {t("dashboard.support")}
               </Button>
               <LogoutButton />
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-white/10 bg-white/5">
                <div className="text-sm text-gray-500 mb-2">{t("dashboard.stats.status")}</div>
                <div className="text-2xl font-bold text-green-500 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    {profile?.status}
                </div>
            </Card>
             <Card className="p-6 border-white/10 bg-white/5">
                <div className="text-sm text-gray-500 mb-2">{t("dashboard.stats.plan")}</div>
                <div className="text-2xl font-bold text-primary mb-2">
                    {profile?.plan}
                </div>
                <Link href="/dashboard/subscription">
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-gray-400 hover:text-white">
                        {t("dashboard.stats.manage")} &rarr;
                    </Button>
                </Link>
            </Card>
             <Card className="p-6 border-white/10 bg-white/5">
                <div className="text-sm text-gray-500 mb-2">{t("dashboard.stats.expires")}</div>
                <div className="text-2xl font-bold text-white">
                    {profile?.expiresAt}
                </div>
            </Card>
             <Card className="p-6 border-white/10 bg-white/5">
                <div className="text-sm text-gray-500 mb-2">{t("dashboard.stats.hwid")}</div>
                <div className="text-2xl font-bold text-gray-300">
                    {profile?.hwid}
                </div>
            </Card>
        </div>

        {/* License Key Section */}
        <Card className="p-8 border-primary/20 bg-primary/5 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t("dashboard.license.title")}</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <code className="flex-1 bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-primary text-lg text-center md:text-left">
                    {profile?.licenseKey || t("dashboard.license.none")}
                </code>
                <Button variant="outline" className="h-auto">{t("dashboard.license.copy")}</Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
                {t("dashboard.license.warning")}
            </p>
        </Card>

        {/* Redeem Key Section */}
        <div className="mb-8">
            <RedeemForm />
        </div>

        {/* Download Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2">
                 <Card className="p-8 border-white/10 bg-black/40 h-full"> 
                     <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Download className="w-5 h-5" /> {t("dashboard.loader.title")}
                     </h3>
                     <p className="text-gray-400 mb-6">
                        {t("dashboard.loader.description")}
                     </p>
                     <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t("dashboard.loader.updated")}: 2h ago</span>
                        <span>{t("dashboard.loader.version")}: 2.4.1</span>
                     </div>
                     <form action={downloadLoader}>
                        <Button variant="neon" size="lg" className="w-full sm:w-auto">
                            {t("dashboard.loader.title")}
                        </Button>
                     </form>
                 </Card>
             </div>

             <div>
                 <Card className="p-8 border-white/10 bg-black/40 h-full">
                     <h3 className="text-xl font-bold text-white mb-4">{t("dashboard.links.title")}</h3>
                     <ul className="space-y-4">
                         <li><Link href="/docs/installation" className="text-gray-300 hover:text-primary transition-colors block"> {t("dashboard.links.installation")}</Link></li>
                         <li><Link href="/docs/common-issues" className="text-gray-300 hover:text-primary transition-colors block"> {t("dashboard.links.issues")}</Link></li>
                         <li><a href="https://discord.gg/starlix" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors block"> {t("dashboard.links.discord")}</a></li>
                         <li><Link href="/dashboard/hwid-reset" className="text-gray-300 hover:text-primary transition-colors block"> {t("dashboard.links.hwid")}</Link></li>
                         {profile?.is_reseller && (
                             <li className="pt-2 border-t border-white/10 mt-2">
                                 <Link href="/dashboard/reseller" className="text-primary hover:text-primary/80 transition-colors block font-bold">
                                     💼 {t("dashboard.links.reseller")}
                                 </Link>
                             </li>
                         )}
                     </ul>
                 </Card>
             </div>
        </div>
      </div>
    </div>
  );
}
