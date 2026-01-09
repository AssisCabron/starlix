import { Card } from "@/components/ui/card";
import { Rocket, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dashboard">
             <Button variant="ghost" className="mb-6">&larr; Back to Dashboard</Button>
        </Link>
        
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Installation Guide</h1>
            <p className="text-gray-400 text-lg">Follow these steps to install and run Starlix Menu correctly.</p>
        </div>

        <div className="space-y-8">
            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Download the Loader
                </h2>
                <p className="text-gray-300 mb-4">
                    Go to your dashboard and download the latest version of the loader (`Starlix_Loader.exe`).
                </p>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-sm">Make sure to disable Windows Defender or any other antivirus real-time protection, as they might flag the loader as a false positive due to obfuscation.</p>
                </div>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Run as Administrator
                </h2>
                <p className="text-gray-300">
                    Right-click the loader file and select <strong>"Run as Administrator"</strong>. This is required for the loader to inject into the game process properly.
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Log In
                </h2>
                <p className="text-gray-300">
                    Enter your Starlix account credentials (email and password) into the loader and click "Login".
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Inject
                </h2>
                <p className="text-gray-300">
                    Once logged in, ensure FiveM is running or waiting to be launched. Click "Load" on the cheat you want to use.
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
