"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, User } from "lucide-react";

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Control <br />
              <span className="text-primary">Dashboard</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Manage your license, view your subscription status, and download the latest loader directly from our secure user panel. Everything you need, one click away.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Instant License Activation",
                "Cloud-Based Config Management",
                "Real-time Status Updates",
                "24/7 Support Ticket System"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <a href="/login">
                <Button variant="neon" size="lg">
                Access Dashboard
                </Button>
            </a>
          </div>

          {/* Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 perspective-1000"
          >
            <div className="relative rounded-xl border border-white/10 bg-[#0F0F0F] shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
              {/* Fake Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/60">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-4 text-xs text-gray-500 font-mono">dashboard.starlix.net</div>
              </div>

              {/* Dashboard Content Mockup */}
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="text-primary" />
                     </div>
                     <div>
                        <div className="text-white font-bold">User_Admin</div>
                        <div className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Online
                        </div>
                     </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">Logout</Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div className="text-green-500 font-bold flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4" /> Active
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Subscription</div>
                        <div className="text-primary font-bold">Lifetime</div>
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm text-white font-medium mb-1">Starlix_Loader_v2.exe</div>
                            <div className="text-xs text-gray-500">Last updated: 2 hours ago</div>
                        </div>
                        <Button size="sm" variant="neon">Download</Button>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
