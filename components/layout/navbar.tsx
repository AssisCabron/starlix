"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check for auth cookie
    const checkAuth = () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        setIsLoggedIn(!!token);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-change", checkAuth); // Listen for login/logout events
    checkAuth(); // Initial check

    // Optional: interval to check for logout if user clears cookies manually or expires
    // For now, initial check is sufficient as navigating to login/dashboard refreshes page
    
    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const navLinks = [
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.reviews"), href: "#reviews" },
    { name: t("nav.pricing"), href: "/purchase" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-black/80 backdrop-blur-md border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
           <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
             <Rocket className="w-6 h-6 text-primary" />
           </div>
           <span className="text-xl font-bold tracking-wider text-white">
             STAR<span className="text-primary">LIX</span>
           </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors hover:glow-text uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          {/* Always show Dashboard link if logged in? Or just button? Let's keep it clean */}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
             <Link href="/dashboard">
                <Button variant="neon" size="sm">
                    {t("nav.dashboard")}
                </Button>
             </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                    {t("nav.login")}
                </Button>
              </Link>
              <Link href="/login?view=signup">
                <Button variant="neon" size="sm" className="hidden lg:flex">
                    {t("nav.get_access")}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                {isLoggedIn ? (
                     <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="neon" className="w-full">
                        {t("nav.dashboard")}
                        </Button>
                     </Link>
                ) : (
                    <>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">
                            {t("nav.login")}
                            </Button>
                        </Link>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="neon" className="w-full">
                            {t("nav.get_access")}
                            </Button>
                        </Link>
                    </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
