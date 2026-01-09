import { Rocket, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-wider text-white">
                STAR<span className="text-primary">LIX</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm">
              The ultimate external Lua execution platform for FiveM. 
              Undetected, powerful, and designed for winners.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500" /> VAC Secure</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-primary" /> Trusted by 10k+</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/status" className="hover:text-primary transition-colors">Status Page</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Starlix Menu. All rights reserved.</p>
          <p className="mt-2 text-xs">Not affiliated with Rockford Makers or FiveM.</p>
        </div>
      </div>
    </footer>
  );
}
