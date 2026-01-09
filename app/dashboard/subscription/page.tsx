import { getUserProfile, getBillingHistory } from "../actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CreditCard, Calendar, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default async function SubscriptionPage() {
  const profile = await getUserProfile();
  const paymentHistory = await getBillingHistory();

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dashboard">
             <Button variant="ghost" className="mb-6">&larr; Back to Dashboard</Button>
        </Link>
        
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-primary mb-2">Subscription Management</h1>
                <p className="text-gray-400">Manage your active plan, renewals, and billing.</p>
            </div>
        </div>

        <div className="grid gap-8">
            {/* Current Plan Status */}
            <Card className="p-8 border-primary/20 bg-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Current Plan: <span className="text-primary">{profile.plan}</span></h2>
                    <div className="flex items-center gap-4 text-gray-300">
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Status: {profile.status}</span>
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /> Expires: {profile.expiresAt}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                     <Link href="/#pricing">
                        <Button variant="neon">Renew / Upgrade</Button>
                     </Link>
                </div>
            </Card>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="p-6 border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" /> Billing History
                    </h3>
                    <p className="text-gray-400 mb-6">View your past invoices and payment methods.</p>
                    
                    <div className="space-y-3">
                        {paymentHistory.length === 0 ? (
                            <div className="text-sm text-gray-500 italic">No payment history found.</div>
                        ) : (
                            paymentHistory.map((payment: any) => (
                                <div key={payment.id} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5">
                                    <div>
                                        <div className="font-bold text-white">R$ {payment.amount}</div>
                                        <div className="text-xs text-gray-400">{new Date(payment.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            payment.status === 'PAID' ? 'bg-green-500/20 text-green-500' : 
                                            payment.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                                        }`}>
                                            {payment.status}
                                        </span>
                                        {payment.invoice_url && (
                                            <a href={payment.invoice_url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                                                View
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                 </Card>

                 <Card className="p-6 border-red-500/20 bg-red-500/5">
                    <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5" /> Cancel Subscription
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Auto-renewal is currently <span className="text-white font-bold">DISABLED</span>. Your plan will expire automatically on {profile.expiresAt}.
                    </p>
                    <Button variant="ghost" className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10">Cancel Immediately</Button>
                 </Card>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 mt-0.5" />
                 <div>
                     <h4 className="font-bold">Note regarding cancellations</h4>
                     <p className="text-sm opacity-90">Cancelling your subscription will verify that no further payments are taken. You will retain access until your current period expires.</p>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
}
