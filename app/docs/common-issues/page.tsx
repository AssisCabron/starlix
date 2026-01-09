import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CommonIssuesPage() {
  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dashboard">
             <Button variant="ghost" className="mb-6">&larr; Back to Dashboard</Button>
        </Link>
        
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Fix Common Issues</h1>
            <p className="text-gray-400 text-lg">Solutions to the most frequent problems users encounter.</p>
        </div>

        <div className="grid gap-6">
            <Card className="p-6 border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">Loader crashes instantly</h3>
                <p className="text-gray-300">
                    Ensure you have the latest Visual C++ Redistributables installed. Also, check if your antivirus is completely disabled.
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">"HWID Mismatch" Error</h3>
                <p className="text-gray-300">
                    This means you are trying to use the cheat on a different computer than the one you originally used. You can request an HWID reset in the Dashboard.
                </p>
            </Card>

            <Card className="p-6 border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">Menu not opening in-game</h3>
                <p className="text-gray-300">
                    Make sure your game is in "Borderless Windowed" mode. Fullscreen exclusive mode can sometimes block the overlay.
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
