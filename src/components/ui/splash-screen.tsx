"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun } from "lucide-react";

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem("splash-shown");
        if (shown) {
            setIsVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("splash-shown", "true");
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-green-950"
                >
                    {/* Radial glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.6, 0.3] }}
                            transition={{ duration: 1.8, ease: "easeOut" }}
                            className="w-96 h-96 rounded-full bg-gradient-radial from-green-400/40 via-emerald-500/20 to-transparent blur-3xl"
                        />
                    </div>

                    {/* Logo + Text */}
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative">
                                <Sun className="w-20 h-20 text-yellow-400" />
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 w-20 h-20 bg-yellow-400/30 rounded-full blur-xl"
                                />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight"
                        >
                            Ratan Solar
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-green-300/80 text-sm tracking-[0.3em] uppercase"
                        >
                            Powering a Greener Tomorrow
                        </motion.p>

                        {/* Loading dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex gap-1.5 mt-4"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                    className="w-2 h-2 bg-green-400 rounded-full"
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
