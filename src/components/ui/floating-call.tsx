"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

export function FloatingCall() {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        className="bg-white rounded-xl shadow-lg shadow-blue-600/10 border border-blue-100 px-4 py-3 mr-2"
                    >
                        <p className="text-sm font-semibold text-gray-800 mb-1">Call Us Now</p>
                        <a
                            href="tel:+919876543210"
                            className="text-blue-600 font-bold text-lg hover:underline"
                        >
                            +91 98765 43210
                        </a>
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <X className="w-3 h-3 text-gray-500" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.a
                href="tel:+919876543210"
                onMouseEnter={() => setShowTooltip(true)}
                onClick={() => setShowTooltip(!showTooltip)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-shadow relative"
            >
                <Phone className="w-6 h-6 text-white" />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
            </motion.a>
        </div>
    );
}
