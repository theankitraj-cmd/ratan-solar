"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "relative bg-white rounded-2xl border border-gray-100 p-6",
                "shadow-sm hover:shadow-xl hover:shadow-green-600/5 transition-shadow duration-500",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

interface StatCardProps {
    value: string;
    suffix?: string;
    label: string;
}

export function StatCard({ value, suffix, label }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-green-100 p-8 text-center shadow-sm hover:shadow-lg hover:shadow-green-600/5 transition-all duration-500"
        >
            <div className="text-4xl md:text-5xl font-bold text-green-700 mb-2">
                {value}
                {suffix && <span className="text-2xl text-green-500">{suffix}</span>}
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                {label}
            </div>
        </motion.div>
    );
}
