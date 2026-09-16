import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function isSupabaseConfigured() {
  return Boolean(url && anon);
}

export function getSupabase(): SupabaseClient {
  if (!url || !anon) {
    throw new Error("Supabase is not configured.");
  }
  return createClient(url, anon, {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: false,
    },
  });
}

let browserClient: SupabaseClient | null = null;

export function getBrowserSupabase() {
  if (!browserClient) browserClient = getSupabase();
  return browserClient;
}
