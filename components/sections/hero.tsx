"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300 mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Undetected & Working on Latest Build
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6"
        >
          <span className="text-white">DOMINATE</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-primary text-glow">
            THE SERVER
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The ultimate Lua executor for FiveM. 
          <span className="text-white font-semibold"> 100% External</span>, 
          safe execution, and premium features designed for the serious player.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a href="/login" className="w-full md:w-auto">
             <Button variant="neon" size="lg" className="w-full min-w-[200px] h-14 text-lg group">
                Get Access Now
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Button>
          </a>
          <a href="#features" className="w-full md:w-auto">
             <Button variant="outline" size="lg" className="w-full h-14 text-lg border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
                View Features
             </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8 md:gap-16 text-gray-500 grayscale opacity-70"
        >
           {/* Simple Trusted badges */}
           <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8" />
              <span className="text-xs uppercase tracking-wider">Secure</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Zap className="w-8 h-8" />
              <span className="text-xs uppercase tracking-wider">Fast Injection</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
