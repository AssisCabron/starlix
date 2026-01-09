"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();


  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.dispatchEvent(new Event('auth-change'));
    router.push("/login");
    router.refresh();
  };

  return (
    <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 gap-2">
      <LogOut className="w-4 h-4" /> Logout
    </Button>
  );
}
