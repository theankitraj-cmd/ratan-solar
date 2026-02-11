"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/30",
                premium:
                    "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40",
                outline:
                    "border-2 border-green-600 text-green-700 hover:bg-green-50",
                ghost:
                    "text-green-700 hover:bg-green-50",
                secondary:
                    "bg-green-50 text-green-700 hover:bg-green-100",
            },
            size: {
                sm: "px-5 py-2 text-xs",
                md: "px-6 py-3 text-sm",
                lg: "px-8 py-4 text-base",
                xl: "px-10 py-5 text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Comp
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
