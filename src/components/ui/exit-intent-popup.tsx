"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shownInSession = sessionStorage.getItem("exit-intent-shown");
        if (shownInSession) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem("exit-intent-shown", "true");
            }
        };

        const handleTimer = () => {
            if (!hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem("exit-intent-shown", "true");
            }
        };

        // Desktop exit intent
        document.addEventListener("mouseleave", handleMouseLeave);

        // Mobile fallback (15 seconds)
        const timer = setTimeout(handleTimer, 15000);

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timer);
        };
    }, [hasShown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsVisible(false), 3000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="grid md:grid-cols-2">
                            <div className="relative hidden bg-green-600 p-8 text-white md:flex md:flex-col md:justify-center">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                                <div className="relative z-10">
                                    <Gift className="mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-2xl font-bold">Wait! Don't Miss Out</h3>
                                    <p className="text-green-50">
                                        Get our exclusive <span className="font-semibold text-white">"Solar Savings Guide 2026"</span> completely free.
                                    </p>
                                </div>
                            </div>

                            <div className="p-8">
                                {isSuccess ? (
                                    <div className="flex h-full flex-col justify-center text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            <Gift className="h-8 w-8" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">It's on the way!</h3>
                                        <p className="text-sm text-gray-600">
                                            Check your inbox for your free guide.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="mb-2 text-2xl font-bold text-gray-900 md:hidden">
                                            Wait! Free Gift 🎁
                                        </h3>
                                        <p className="mb-6 text-gray-600">
                                            Join 10,000+ homeowners saving money with solar. Enter your email to get the guide.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <Input
                                                    type="email"
                                                    required
                                                    placeholder="Your email address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full bg-green-600 hover:bg-green-700"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Sending..." : "Send Me the Guide"}
                                            </Button>
                                            <p className="text-center text-xs text-gray-400">
                                                No spam. Unsubscribe anytime.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
