"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";
const DEFAULT_MESSAGE = "Hi! I'm interested in solar panel installation. Can you help me?";

export function FloatingWhatsApp() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showTooltip && !dismissed) {
            const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
            return () => clearTimeout(hideTimer);
        }
    }, [showTooltip, dismissed]);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Tooltip Message */}
            <AnimatePresence>
                {showTooltip && !dismissed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="relative bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-4 max-w-[260px]"
                    >
                        <button
                            onClick={() => setDismissed(true)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <X className="w-3 h-3 text-gray-500" />
                        </button>
                        <p className="text-sm text-gray-700 font-medium">👋 Need help with solar?</p>
                        <p className="text-xs text-gray-500 mt-1">Chat with us on WhatsApp for instant answers!</p>
                        {/* Arrow */}
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-shadow"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="w-7 h-7 text-white" />
            </motion.a>

            {/* Pulse ring */}
            <motion.div
                className="absolute bottom-0 right-0 w-16 h-16 rounded-full border-2 border-[#25D366] pointer-events-none"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
        </div>
    );
}
