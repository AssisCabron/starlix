"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const API_URL = isLocal ? "http://localhost:4000" : "https://starlix-back.onrender.com";

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Store token in cookie
        document.cookie = `access_token=${data.session.access_token}; path=/; max-age=3600; SameSite=Lax`;

        // Notify Navbar to update immediately
        window.dispatchEvent(new Event('auth-change'));

        router.push("/dashboard");
        router.refresh();
    } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
      setIsLoading(true);
      setError(null);

      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const API_URL = isLocal ? "http://localhost:4000" : "https://starlix-back.onrender.com";

      try {
          const res = await fetch(`${API_URL}/api/auth/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });

          const data = await res.json();

          if (!res.ok) {
              throw new Error(data.error || 'Signup failed');
          }

          setError("Account created! Redirecting to login...");
          setTimeout(() => {
              // Automatically switch to login view or just let user click
               const params = new URLSearchParams(window.location.search);
               params.delete('view'); 
               router.push(`/login?${params.toString()}`);
               window.location.reload(); // Force reload to clear state/view
          }, 1500);
      } catch (err: any) {
          setError(err.message);
      } finally {
          setIsLoading(false);
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background z-0" />
      
      <Card className="w-full max-w-md p-8 border-white/10 bg-black/60 backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(255,0,60,0.1)]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
             <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
               <Rocket className="w-6 h-6 text-primary" />
             </div>
             <span className="text-xl font-bold tracking-wider text-white">
               STAR<span className="text-primary">LIX</span>
             </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" variant="neon" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-500">Or</span>
            </div>
          </div>
          
           <Button type="button" variant="outline" className="w-full" onClick={handleSignUp} disabled={isLoading}>
            Create Account
          </Button>

        </form>
      </Card>
    </div>
  );
}
