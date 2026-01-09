"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, QrCode, Lock, ShieldCheck, Copy, CheckCircle2, RotateCw } from "lucide-react";

// Plans data
const PLANS: Record<string, { title: string; price: number }> = {
    daily: { title: 'Daily Access', price: 9.90 },
    monthly: { title: 'Monthly Plan', price: 29.90 },
    yearly: { title: 'Yearly Pro', price: 149.90 },
    lifetime: { title: 'Lifetime Elite', price: 299.90 }
};

function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planId = searchParams.get('plan') || 'daily';
    const selectedPlan = PLANS[planId] || PLANS['daily'];

    const [loading, setLoading] = useState(false);
    const [billingType, setBillingType] = useState<'PIX' | 'CREDIT_CARD'>('PIX');
    const [pixData, setPixData] = useState<{ encodedImage: string, payload: string } | null>(null);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        cpfCnpj: '',
        phone: '',
        // Card Data
        ccName: '',
        ccNumber: '',
        ccExpiry: '',
        ccCvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const copyToClipboard = () => {
        if (pixData?.payload) {
            navigator.clipboard.writeText(pixData.payload);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (paymentId && (paymentStatus === 'PENDING' || !paymentStatus)) {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const API_URL = isLocal ? 'http://localhost:4000' : 'https://starlix-back.onrender.com';

            interval = setInterval(async () => {
                try {
                    const res = await fetch(`${API_URL}/api/payments/status/${paymentId}`);
                    const data = await res.json();
                    
                    if (data.status === 'PAID' || data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
                        setPaymentStatus('PAID');
                        clearInterval(interval);
                        setTimeout(() => {
                            router.push('/dashboard/subscription');
                        }, 2000);
                    }
                } catch (err) {
                    console.error("Polling error:", err);
                }
            }, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [paymentId, paymentStatus, router]);

    const handleCheckout = async () => {
        // Basic Validation
        if (!formData.name || !formData.cpfCnpj || !formData.phone) {
            alert("Please fill in all personal details.");
            return;
        }
        if (billingType === 'CREDIT_CARD') {
            if (!formData.ccName || !formData.ccNumber || !formData.ccExpiry || !formData.ccCvv) {
                alert("Please fill in all credit card details.");
                return;
            }
        }

        setLoading(true);

        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (!token) {
            router.push(`/login?redirect=/checkout?plan=${planId}`);
            return;
        }

        try {
            const accessToken = token.split('=')[1];
            
            // Determine API URL
            // Determine API URL
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const API_URL = isLocal ? 'http://localhost:4000' : 'https://starlix-back.onrender.com';
            
            console.log("Using API URL:", API_URL);
            
            // Format Expiry
            let creditCard = null;
            if (billingType === 'CREDIT_CARD') {
                const [month, year] = formData.ccExpiry.split('/');
                creditCard = {
                    holderName: formData.ccName,
                    number: formData.ccNumber.replace(/\s/g, ''),
                    expiryMonth: month,
                    expiryYear: year.length === 2 ? `20${year}` : year,
                    ccv: formData.ccCvv
                };
            }

            const res = await fetch(`${API_URL}/api/payments/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ 
                    planId, 
                    billingType, 
                    cpfCnpj: formData.cpfCnpj,
                    name: formData.name,
                    phone: formData.phone,
                    creditCard
                })
            });

            const data = await res.json();
            console.log("DEBUG: Raw Checkout Data:", data);

            if (res.ok) {
                console.log("DEBUG: PaymentID being set:", data.paymentId);
                setPaymentId(data.paymentId);
                if (billingType === 'CREDIT_CARD') {
                    if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
                        setPaymentStatus('PAID');
                        setTimeout(() => router.push('/dashboard/subscription'), 2000);
                    } else {
                        setPaymentStatus('PENDING');
                    }
                } else {
                    // Pix - Set data for display
                    if (data.pix) {
                        setPixData(data.pix);
                        setPaymentStatus('PENDING');
                    } else {
                        // If no PIX data, something is wrong with backend or Asaas communication
                        alert("Could not generate PIX QR Code. Please try again or contact support.");
                        console.error("Missing PIX data in response:", data);
                    }
                }
            } else {
                alert("Checkout Error: " + (data.error || "Unknown error"));
            }
        } catch (error) {
           console.error("Checkout Request Error:", error);
           alert("Failed to process payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="text-primary" /> Secure Checkout
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* LEFT: PAYMENT FORM */}
                <div className="md:col-span-2 space-y-6">
                    
                    {/* Personal Info */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                        <h2 className="text-xl font-bold mb-4">1. Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
                                <input name="name" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">CPF / CNPJ</label>
                                <input name="cpfCnpj" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="000.000.000-00" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs text-gray-400 mb-1 block">Mobile Phone</label>
                                <input name="phone" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="(11) 99999-9999" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                        <h2 className="text-xl font-bold mb-6">2. Payment Method</h2>
                        
                        <div className="flex gap-4 mb-6">
                            <button 
                                onClick={() => setBillingType('PIX')}
                                className={`flex-1 p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${billingType === 'PIX' ? 'bg-primary/20 border-primary text-primary' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
                            >
                                <QrCode className="w-6 h-6" />
                                <span className="font-bold">PIX</span>
                            </button>
                            <button 
                                onClick={() => setBillingType('CREDIT_CARD')}
                                className={`flex-1 p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${billingType === 'CREDIT_CARD' ? 'bg-primary/20 border-primary text-primary' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
                            >
                                <CreditCard className="w-6 h-6" />
                                <span className="font-bold">Credit Card</span>
                            </button>
                        </div>

                        {billingType === 'CREDIT_CARD' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Cardholder Name</label>
                                    <input name="ccName" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="Name as printed on card" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Card Number</label>
                                    <input name="ccNumber" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">Expiry</label>
                                        <input name="ccExpiry" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">CVV</label>
                                        <input name="ccCvv" onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {billingType === 'PIX' && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center text-green-400 text-sm">
                                Approved instantly. You will receive a QR Code after clicking Pay Now.
                            </div>
                        )}
                    </div>

                </div>

                {/* RIGHT: ORDER SUMMARY */}
                <div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                            <span>{selectedPlan.title}</span>
                            <span className="font-bold">R$ {selectedPlan.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold mb-8">
                            <span>Total</span>
                            <span className="text-primary">R$ {selectedPlan.price.toFixed(2)}</span>
                        </div>
                        
                        {!pixData ? (
                            <Button className="w-full py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,0,60,0.3)] hover:shadow-[0_0_30px_rgba(255,0,60,0.6)] transition-all" onClick={handleCheckout} disabled={loading}>
                                {loading ? 'Processing...' : `Pay R$ ${selectedPlan.price.toFixed(2)}`}
                            </Button>
                        ) : (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                {paymentStatus === 'PAID' ? (
                                    <div className="flex flex-col items-center gap-4 p-6 bg-green-500/20 border border-green-500/50 rounded-xl">
                                        <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                                        <div className="text-center">
                                            <h4 className="font-bold text-lg">Payment Confirmed!</h4>
                                            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-white p-3 rounded-xl mx-auto w-fit">
                                            <img src={`data:image/png;base64,${pixData.encodedImage}`} alt="PIX QR Code" className="w-48 h-48" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs text-center text-gray-400">Copy and paste the code below:</p>
                                            <div className="flex gap-2">
                                                <input 
                                                    readOnly 
                                                    value={pixData.payload} 
                                                    className="flex-1 bg-black/50 border border-white/20 rounded p-2 text-xs truncate"
                                                />
                                                <Button size="icon" variant="outline" onClick={copyToClipboard} className="shrink-0 transition-colors">
                                                    {copied ? <CheckCircle2 className="text-green-500" /> : <Copy className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 pt-2">
                                            <div className="flex items-center gap-2 text-xs text-primary animate-pulse">
                                                <RotateCw className="w-3 h-3 animate-spin" />
                                                Waiting for payment...
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Lock className="w-3 h-3" /> Encrypted & Secure
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
             
             <Suspense fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
             }>
                <CheckoutForm />
             </Suspense>
        </div>
    );
}
