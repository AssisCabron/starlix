import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Assuming Inter is default, maybe add Space Grotesk for headers
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Particles } from "@/components/ui/particles";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Starlix Menu | The Ultimate FiveM Executor",
  description: "Undetected, External, and Powerful. Enhance your FiveM experience with Starlix Menu.",
  keywords: ["FiveM", "Cheat", "Mod Menu", "External", "Lua Executor", "Starlix"],
  icons: {
    icon: "/logo.png",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-white`}>
        <LanguageProvider>
          <Particles />
          <Navbar />
          <main className="relative z-10 min-h-screen">
              {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
