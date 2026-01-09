"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { 
    DollarSign, 
    Package, 
    ShoppingCart, 
    TrendingUp, 
    Download,
    Copy,
    CheckCircle2
} from "lucide-react";

interface DashboardStats {
    balance: number;
    totalSales: number;
    availableKeys: {
        Daily: number;
        Monthly: number;
        Yearly: number;
        Lifetime: number;
    };
}

interface WholesalePrices {
    daily: number;
    monthly: number;
    yearly: number;
    lifetime: number;
}

export default function ResellerDashboard() {
    const router = useRouter();
    
    const [API_URL, setApiUrl] = useState("http://localhost:4000");

    useEffect(() => {
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        setApiUrl(isLocal ? "http://localhost:4000" : "https://starlix-back.onrender.com");
    }, []);

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [prices, setPrices] = useState<WholesalePrices | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>("Monthly");
    const [quantity, setQuantity] = useState<number>(1);
    const [withdrawAmount, setWithdrawAmount] = useState<string>("");
    const [pixKey, setPixKey] = useState<string>("");
    const [copied, setCopied] = useState<string | null>(null);

    // Payment State
    const [billingType, setBillingType] = useState<"PIX" | "CREDIT_CARD">("PIX");
    const [paymentInfo, setPaymentInfo] = useState({
        name: "",
        cpfCnpj: "",
        phone: ""
    });
    const [cardInfo, setCardInfo] = useState({
        holderName: "",
        number: "",
        expiryMonth: "",
        expiryYear: "",
        ccv: ""
    });
    const [orderResult, setOrderResult] = useState<any>(null);
    const [pollingActive, setPollingActive] = useState(false);

    const [allKeys, setAllKeys] = useState<any[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Polling effect
    useEffect(() => {
        let interval: any;
        if (pollingActive && orderResult?.paymentId) {
            interval = setInterval(async () => {
                await checkPaymentStatus(orderResult.paymentId);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [pollingActive, orderResult]);

    const checkPaymentStatus = async (paymentId: string) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (!token) return;
        const accessToken = token.split('=')[1];

        try {
            const res = await fetch(`${API_URL}/api/payments/status/${paymentId}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const data = await res.json();

            if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
                setPollingActive(false);
                alert("Payment confirmed! Your inventory has been updated.");
                fetchDashboardData();
            }
        } catch (error) {
            console.error("Polling error:", error);
        }
    };

    const fetchDashboardData = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (!token) {
            router.push('/login');
            return;
        }

        const accessToken = token.split('=')[1];

        try {
            const [statsRes, pricesRes, keysRes] = await Promise.all([
                fetch(`${API_URL}/api/reseller/dashboard`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }),
                fetch(`${API_URL}/api/reseller/wholesale-prices`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }),
                fetch(`${API_URL}/api/reseller/keys`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                })
            ]);

            if (statsRes.ok && pricesRes.ok && keysRes.ok) {
                setStats(await statsRes.json());
                setPrices(await pricesRes.json());
                const keysData = await keysRes.json();
                setAllKeys(keysData.keys || []);
            } else {
                alert("Not authorized as reseller");
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Error fetching reseller data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchaseKeys = async () => {
        if (!paymentInfo.name || !paymentInfo.cpfCnpj || !paymentInfo.phone) {
            alert("Please fill in all personal information fields.");
            return;
        }

        if (billingType === 'CREDIT_CARD') {
            if (!cardInfo.number || !cardInfo.holderName || !cardInfo.expiryMonth || !cardInfo.expiryYear || !cardInfo.ccv) {
                alert("Please fill in all credit card fields.");
                return;
            }
        }

        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (!token) return;

        setPurchaseLoading(true);
        const accessToken = token.split('=')[1];

        try {
            const res = await fetch(`${API_URL}/api/reseller/purchase-keys`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ 
                    planType: selectedPlan, 
                    quantity,
                    billingType,
                    ...paymentInfo,
                    creditCard: billingType === 'CREDIT_CARD' ? cardInfo : undefined
                })
            });

            const data = await res.json();

            if (res.ok) {
                setOrderResult(data);
                if (data.status !== 'CONFIRMED') {
                    setPollingActive(true);
                } else {
                    alert(`Successfully purchased ${quantity} ${selectedPlan} keys!`);
                    fetchDashboardData();
                }
            } else {
                alert(data.error || "Purchase failed");
            }
        } catch (error) {
            alert("Failed to purchase keys");
        } finally {
            setPurchaseLoading(false);
        }
    };

    const handleWithdraw = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (!token) return;

        const amount = parseFloat(withdrawAmount);
        if (!amount || amount <= 0 || !pixKey) {
            alert("Please enter valid amount and PIX key");
            return;
        }

        const accessToken = token.split('=')[1];

        try {
            const res = await fetch(`${API_URL}/api/reseller/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ amount, pixKey })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Withdrawal request submitted!");
                setWithdrawAmount("");
                setPixKey("");
            } else {
                alert(data.error || "Withdrawal failed");
            }
        } catch (error) {
            alert("Failed to submit withdrawal");
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    const planPrices = [
        { name: "Daily", price: prices?.daily || 7, retail: 9.90, margin: "29%" },
        { name: "Monthly", price: prices?.monthly || 20, retail: 29.90, margin: "33%" },
        { name: "Yearly", price: prices?.yearly || 100, retail: 149.90, margin: "33%" },
        { name: "Lifetime", price: prices?.lifetime || 200, retail: 299.90, margin: "33%" }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <Link href="/dashboard">
                    <Button variant="ghost" className="mb-6">← Back to Dashboard</Button>
                </Link>

                <h1 className="text-4xl font-bold mb-2 text-primary">Reseller Dashboard</h1>
                <p className="text-gray-400 mb-8">Manage your wholesale keys and earnings</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Available Balance</p>
                                <p className="text-2xl font-bold text-white">R$ {stats?.balance.toFixed(2)}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Sales</p>
                                <p className="text-2xl font-bold text-white">R$ {stats?.totalSales.toFixed(2)}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Package className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Available Keys</p>
                                <p className="text-2xl font-bold text-white">
                                    {Object.values(stats?.availableKeys || {}).reduce((a, b) => a + b, 0)}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Purchase Keys */}
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6 text-primary" />
                            Purchase Wholesale Keys
                        </h2>

                        <div className="space-y-4 mb-6">
                            {planPrices.map((plan) => (
                                <div
                                    key={plan.name}
                                    onClick={() => setSelectedPlan(plan.name)}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                        selectedPlan === plan.name
                                            ? 'bg-primary/20 border-primary'
                                            : 'bg-black/40 border-white/10 hover:bg-white/5'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{plan.name}</p>
                                            <p className="text-sm text-gray-400">
                                                Retail: R$ {plan.retail} • Margin: {plan.margin}
                                            </p>
                                        </div>
                                        <p className="text-xl font-bold text-primary">R$ {plan.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="w-full bg-black/50 border border-white/20 rounded p-3"
                                />
                            </div>

                            {/* Personal Info */}
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <h3 className="text-lg font-bold">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={paymentInfo.name}
                                        onChange={(e) => setPaymentInfo({...paymentInfo, name: e.target.value})}
                                        className="w-full bg-black/50 border border-white/20 rounded p-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CPF / CNPJ"
                                        value={paymentInfo.cpfCnpj}
                                        onChange={(e) => setPaymentInfo({...paymentInfo, cpfCnpj: e.target.value})}
                                        className="w-full bg-black/50 border border-white/20 rounded p-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={paymentInfo.phone}
                                        onChange={(e) => setPaymentInfo({...paymentInfo, phone: e.target.value})}
                                        className="w-full bg-black/50 border border-white/20 rounded p-3"
                                    />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <h3 className="text-lg font-bold">Payment Method</h3>
                                <div className="flex gap-4">
                                    <Button
                                        variant={billingType === 'PIX' ? 'neon' : 'outline'}
                                        onClick={() => setBillingType('PIX')}
                                        className="flex-1"
                                    >
                                        PIX
                                    </Button>
                                    <Button
                                        variant={billingType === 'CREDIT_CARD' ? 'neon' : 'outline'}
                                        onClick={() => setBillingType('CREDIT_CARD')}
                                        className="flex-1"
                                    >
                                        Credit Card
                                    </Button>
                                </div>

                                {billingType === 'CREDIT_CARD' && (
                                    <div className="space-y-4 pt-2">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            value={cardInfo.number}
                                            onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                                            className="w-full bg-black/50 border border-white/20 rounded p-3"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Holder Name"
                                            value={cardInfo.holderName}
                                            onChange={(e) => setCardInfo({...cardInfo, holderName: e.target.value})}
                                            className="w-full bg-black/50 border border-white/20 rounded p-3"
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM"
                                                value={cardInfo.expiryMonth}
                                                onChange={(e) => setCardInfo({...cardInfo, expiryMonth: e.target.value})}
                                                className="w-full bg-black/50 border border-white/20 rounded p-3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="YYYY"
                                                value={cardInfo.expiryYear}
                                                onChange={(e) => setCardInfo({...cardInfo, expiryYear: e.target.value})}
                                                className="w-full bg-black/50 border border-white/20 rounded p-3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                value={cardInfo.ccv}
                                                onChange={(e) => setCardInfo({...cardInfo, ccv: e.target.value})}
                                                className="w-full bg-black/50 border border-white/20 rounded p-3"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                <p className="text-sm text-gray-400">Total Cost</p>
                                <p className="text-2xl font-bold text-primary">
                                    R$ {(planPrices.find(p => p.name === selectedPlan)?.price || 0) * quantity}
                                </p>
                            </div>

                            {orderResult ? (
                                <div className="space-y-4">
                                    {orderResult.status === 'CONFIRMED' ? (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
                                            <h4 className="font-bold flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5" /> Payment Confirmed!
                                            </h4>
                                            <p className="text-sm mt-2">Your keys have been generated and added to your inventory.</p>
                                            {orderResult.keys && (
                                                <div className="mt-4 space-y-2">
                                                    <p className="text-xs text-gray-400">New Keys:</p>
                                                    {orderResult.keys.map((key: string) => (
                                                        <div key={key} className="flex items-center gap-2 bg-black/40 p-2 rounded border border-white/10 font-mono text-xs">
                                                            <span className="flex-1">{key}</span>
                                                            <button onClick={() => copyToClipboard(key, key)} className="text-primary hover:text-white">
                                                                {copied === key ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <Button variant="outline" className="w-full mt-4" onClick={() => setOrderResult(null)}>Purchase More</Button>
                                        </div>
                                    ) : (
                                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center">
                                            {orderResult.pix ? (
                                                <div className="space-y-4">
                                                    <h4 className="font-bold text-primary">Pay with PIX</h4>
                                                    <div className="bg-white p-4 rounded-lg inline-block">
                                                        <img src={`data:image/png;base64,${orderResult.pix.encodedImage}`} alt="PIX QR Code" className="w-48 h-48" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-xs text-gray-400">Copy PIX Payload:</p>
                                                        <div className="flex items-center gap-2 bg-black/40 p-3 rounded border border-white/10">
                                                            <code className="flex-1 text-[10px] break-all text-left">{orderResult.pix.payload}</code>
                                                            <button onClick={() => copyToClipboard(orderResult.pix.payload, 'pix')} className="text-primary p-2">
                                                                {copied === 'pix' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                                                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                                        <span className="text-sm font-bold">Waiting for payment...</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <h4 className="font-bold text-yellow-500">Processing Payment...</h4>
                                                    <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                                                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                                        <span className="text-sm font-bold">Checking status...</span>
                                                    </div>
                                                </div>
                                            )}
                                            <Button variant="outline" className="w-full mt-6" onClick={() => setOrderResult(null)}>Cancel</Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    onClick={handlePurchaseKeys}
                                    disabled={purchaseLoading}
                                    className="w-full py-6 text-lg font-bold"
                                >
                                    {purchaseLoading ? 'Processing...' : 'Purchase Keys'}
                                </Button>
                            )}
                        </div>
                    </Card>


                    {/* Withdraw Balance */}
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Download className="w-6 h-6 text-green-500" />
                            Withdraw Balance
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Amount (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded p-3"
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">PIX Key</label>
                                <input
                                    type="text"
                                    value={pixKey}
                                    onChange={(e) => setPixKey(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded p-3"
                                    placeholder="Your PIX key (CPF, email, phone, etc.)"
                                />
                            </div>

                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-sm">
                                Withdrawal requests are processed manually within 24-48 hours.
                            </div>

                            <Button
                                onClick={handleWithdraw}
                                variant="outline"
                                className="w-full py-6 text-lg font-bold border-green-500 text-green-500 hover:bg-green-500/10"
                            >
                                Request Withdrawal
                            </Button>
                        </div>

                        {/* Key Inventory */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h3 className="font-bold mb-4 flex justify-between items-center">
                                <span>Key Inventory</span>
                                <span className="text-xs text-gray-400 font-normal">
                                    {allKeys.length} Total Keys
                                </span>
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {Object.entries(stats?.availableKeys || {}).map(([plan, count]) => (
                                    <div key={plan} className="p-3 bg-black/40 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-400">{plan}</p>
                                        <p className="text-xl font-bold">{count}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Keys</h4>
                                <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                    {allKeys.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 border border-dashed border-white/10 rounded-lg">
                                            No keys purchased yet.
                                        </div>
                                    ) : (
                                        allKeys.map((keyData) => (
                                            <div 
                                                key={keyData.id} 
                                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                                    keyData.status === 'available' 
                                                        ? 'bg-white/5 border-white/10 hover:border-primary/50' 
                                                        : 'bg-black/20 border-white/5 opacity-60'
                                                }`}
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-sm">{keyData.license_key}</span>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                                                            keyData.plan_type === 'Daily' ? 'bg-blue-500/20 text-blue-400' :
                                                            keyData.plan_type === 'Monthly' ? 'bg-green-500/20 text-green-400' :
                                                            keyData.plan_type === 'Yearly' ? 'bg-purple-500/20 text-purple-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                            {keyData.plan_type}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                                keyData.status === 'available' ? 'bg-green-500' : 
                                                                keyData.status === 'sold' ? 'bg-blue-500' : 'bg-gray-500'
                                                            }`}></span>
                                                            <span className="text-[10px] text-gray-400 uppercase font-semibold">{keyData.status}</span>
                                                        </div>
                                                        <span className="text-[10px] text-gray-500 border-l border-white/10 pl-3">
                                                            {new Date(keyData.created_at).toLocaleString('pt-BR', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: '2-digit',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => copyToClipboard(keyData.license_key, keyData.id)}
                                                    className="p-2 hover:bg-white/10 rounded-md text-primary transition-colors"
                                                    title="Copy Key"
                                                >
                                                    {copied === keyData.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
