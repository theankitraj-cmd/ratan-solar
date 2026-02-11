import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if Supabase is configured
function isConfigured(): boolean {
    return supabaseUrl.startsWith("http") && supabaseAnonKey.length > 10;
}

// Client-side Supabase client (uses anon key, respects RLS)
let _supabase: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient | null {
    if (!isConfigured()) return null;
    if (!_supabase) _supabase = createClient(supabaseUrl, supabaseAnonKey);
    return _supabase;
}

// Server-side Supabase client (uses service role key, bypasses RLS)
export function getServiceSupabase(): SupabaseClient | null {
    if (!isConfigured()) return null;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    if (serviceRoleKey.length < 10) return null;
    return createClient(supabaseUrl, serviceRoleKey);
}
