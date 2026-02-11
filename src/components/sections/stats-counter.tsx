"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Users, Award, TrendingUp } from "lucide-react";

const stats = [
    { icon: Zap, label: "MW Deployed", value: 50, suffix: "+", prefix: "" },
    { icon: Users, label: "Happy Customers", value: 12000, suffix: "+", prefix: "" },
    { icon: Award, label: "Subsidies Processed", value: 15, suffix: " Cr+", prefix: "₹" },
    { icon: TrendingUp, label: "Google Rating", value: 4.8, suffix: "★", prefix: "", decimals: 1 },
];

function AnimatedCounter({ value, prefix, suffix, decimals = 0 }: { value: number; prefix: string; suffix: string; decimals?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    useEffect(() => {
        if (!isInView) return;
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, value]);

    const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString("en-IN");

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{displayValue}{suffix}
        </span>
    );
}

export function StatsCounterBar() {
    return (
        <section className="relative bg-gradient-to-r from-green-700 via-green-800 to-emerald-800 overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.15),transparent)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-2">
                                <stat.icon className="w-5 h-5 text-green-300" />
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                                <AnimatedCounter
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals}
                                />
                            </div>
                            <div className="text-green-200/70 text-xs sm:text-sm font-medium tracking-wide">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
