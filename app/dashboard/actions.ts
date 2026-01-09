"use server";

import { cookies } from "next/headers";

export async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return null;
  }

  // Force localhost for development
  const API_URL = 'http://localhost:4000';
  
  console.log('[Server Action] getUserProfile - API_URL:', API_URL);

  try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
          headers: {
              'Authorization': `Bearer ${token.value}`
          },
          cache: 'no-store'
      });

      console.log('[Server Action] getUserProfile - Response status:', res.status);

      if (!res.ok) {
          console.log('[Server Action] getUserProfile - Response not OK');
          return null;
      }

      const data = await res.json();
      console.log('[Server Action] getUserProfile - is_reseller:', data.is_reseller);
      return data;
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

  const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:4000' 
    : 'https://starlix-back.onrender.com';

  try {
      const res = await fetch(`${API_URL}/api/user/billing`, {
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
