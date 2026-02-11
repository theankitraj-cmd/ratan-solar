"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagProps {
    children: React.ReactNode;
    variant?: "default" | "outline" | "accent";
    className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
    const variants = {
        default: "bg-green-50 text-green-700 border-green-200",
        outline: "bg-transparent border-gray-200 text-gray-600",
        accent: "bg-green-600 text-white border-green-600",
    };

    return (
        <motion.span
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium border",
                "transition-colors duration-300 cursor-default",
                variants[variant],
                className
            )}
        >
            {children}
        </motion.span>
    );
}
