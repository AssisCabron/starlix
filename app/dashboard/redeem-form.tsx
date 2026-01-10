"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Ticket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RedeemForm() {
    const { t } = useLanguage();
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
    const [API_URL, setApiUrl] = useState("http://localhost:4000");

    useEffect(() => {
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        setApiUrl(isLocal ? "http://localhost:4000" : "https://starlix-back.onrender.com");
    }, []);

    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!key) return;

        setLoading(true);
        setResult(null);

        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (!token) {
            setResult({ success: false, message: t("dashboard.redeem.errors.login") });
            setLoading(false);
            return;
        }

        const accessToken = token.split('=')[1];

        try {
            const res = await fetch(`${API_URL}/api/payments/redeem-key`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ licenseKey: key })
            });

            const data = await res.json();
            if (res.ok) {
                setResult({ success: true, message: data.message || t("dashboard.redeem.success") });
                // Refresh page after 2 seconds to show new status
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setResult({ success: false, message: data.error || t("dashboard.redeem.errors.failed") });
            }
        } catch (error) {
            setResult({ success: false, message: t("dashboard.redeem.errors.connect") });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-8 border-yellow-500/20 bg-yellow-500/5">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-yellow-500" /> {t("dashboard.redeem.title")}
            </h2>
            <p className="text-sm text-gray-400 mb-6">
                {t("dashboard.redeem.description")}
            </p>

            {result ? (
                <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                    result.success ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                }`}>
                    {result.success && <CheckCircle2 className="w-5 h-5" />}
                    <span className="text-sm font-medium">{result.message}</span>
                </div>
            ) : (
                <form onSubmit={handleRedeem} className="flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder={t("dashboard.redeem.placeholder")}
                        value={key}
                        onChange={(e) => setKey(e.target.value.toUpperCase())}
                        className="flex-1 bg-black/50 border-white/10"
                    />
                    <Button type="submit" disabled={loading} variant="neon">
                        {loading ? t("dashboard.redeem.redeeming") : t("dashboard.redeem.button")}
                    </Button>
                </form>
            )}
        </Card>
    );
}
