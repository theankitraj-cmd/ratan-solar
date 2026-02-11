"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getSupabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    useSupabaseAuth: boolean;
    signIn: (emailOrPassword: string, password?: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FALLBACK_PASSWORD = "ratan2026";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [fallbackAuth, setFallbackAuth] = useState(false);

    const supabase = getSupabase();
    const useSupabaseAuth = !!supabase;

    useEffect(() => {
        if (supabase) {
            // Check existing Supabase session
            supabase.auth.getSession().then(({ data: { session } }) => {
                setUser(session?.user ?? null);
                setLoading(false);
            });

            // Listen for auth changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                (_event, session) => {
                    setUser(session?.user ?? null);
                }
            );

            return () => subscription.unsubscribe();
        } else {
            // Fallback: check sessionStorage
            const saved = sessionStorage.getItem("admin_auth");
            if (saved === "true") setFallbackAuth(true);
            setLoading(false);
        }
    }, [supabase]);

    const signIn = useCallback(
        async (emailOrPassword: string, password?: string): Promise<{ error: string | null }> => {
            // Always check fallback password first (works without Supabase user)
            const passwordToCheck = password || emailOrPassword;
            if (passwordToCheck === FALLBACK_PASSWORD) {
                sessionStorage.setItem("admin_auth", "true");
                setFallbackAuth(true);
                return { error: null };
            }

            // Then try Supabase Auth if configured and email+password provided
            if (supabase && password) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: emailOrPassword,
                    password,
                });
                if (error) return { error: error.message };
                return { error: null };
            }

            return { error: "Incorrect password" };
        },
        [supabase]
    );

    const signOut = useCallback(async () => {
        if (supabase) {
            await supabase.auth.signOut();
            setUser(null);
        } else {
            sessionStorage.removeItem("admin_auth");
            setFallbackAuth(false);
        }
    }, [supabase]);

    const isAuthenticated = useSupabaseAuth ? !!user : fallbackAuth;

    return (
        <AuthContext.Provider
            value={{ user, loading, isAuthenticated, useSupabaseAuth, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
