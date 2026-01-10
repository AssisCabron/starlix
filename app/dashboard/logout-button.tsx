"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function LogoutButton() {
    const router = useRouter();
    const { t } = useLanguage();

    const handleLogout = () => {
        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Notify Navbar
        window.dispatchEvent(new Event('auth-change'));
        
        router.push("/login");
        router.refresh(); // Clear server component cache
    };

    return (
        <Button variant="ghost" className="gap-2 text-gray-400 hover:text-white" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> {t("dashboard.logout")}
        </Button>
    );
}
