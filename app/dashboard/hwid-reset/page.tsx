"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RefreshCw, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HWIDResetPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleReset = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Get token (simplistic client-side retrieval for now, ideally passed via context or props)
    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    const token = tokenRow ? tokenRow.split('=')[1] : null;

    if (!token) {
        setError("Not authenticated. Please login again.");
        setIsLoading(false);
        return;
    }

    try {
        const res = await fetch('https://starlix-back.onrender.com/api/user/hwid-reset', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to reset HWID');
        }

        setSuccess(data.message);
        router.refresh();
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/dashboard">
             <Button variant="ghost" className="mb-6">&larr; Back to Dashboard</Button>
        </Link>
        
        <Card className="p-8 border-white/10 bg-black/60 backdrop-blur-xl">
             <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/20 rounded-full mb-6 relative">
                    <RefreshCw className={`w-12 h-12 text-primary ${isLoading ? 'animate-spin' : ''}`} />
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-4">Request HWID Reset</h1>
                <p className="text-gray-400 mb-8 max-w-md">
                    Changing your PC? You can reset your Hardware ID (HWID) binding here.
                    Note that this action has a <strong>7-day cooldown</strong>.
                </p>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {success}
                    </div>
                )}

                {!success && (
                     <Button 
                        size="lg" 
                        variant="neon" 
                        onClick={handleReset} 
                        disabled={isLoading}
                        className="w-full max-w-xs"
                     >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Processing...
                            </>
                        ) : (
                            "Reset HWID Now"
                        )}
                    </Button>
                )}
             </div>
        </Card>
      </div>
    </div>
  );
}
