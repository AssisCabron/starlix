"use server";

import { cookies } from "next/headers";

export async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return null;
  }

  try {
      const res = await fetch('https://starlix-back.onrender.com/api/user/profile', {
          headers: {
              'Authorization': `Bearer ${token.value}`
          },
          cache: 'no-store'
      });

      if (!res.ok) return null;

      return await res.json();
  } catch (error) {
      console.error("Backend Fetch Error:", error);
      return null;
  }
}

import { redirect } from "next/navigation";

export async function downloadLoader(formData: FormData) {
    // Mock secure download link generation
    redirect("https://starlix.net/download/loader_v2.exe");
}

export async function getBillingHistory() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) return [];

  try {
      const res = await fetch('https://starlix-back.onrender.com/api/user/billing', {
          headers: {
              'Authorization': `Bearer ${token.value}`
          },
          cache: 'no-store'
      });

      if (!res.ok) return [];

      const data = await res.json();
      return data.history;
  } catch (error) {
      console.error("Billing History Fetch Error:", error);
      return [];
  }
}
