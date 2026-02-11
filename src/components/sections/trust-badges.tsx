"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Shield, Award, BadgeCheck, Handshake, Star } from "lucide-react";

const badges = [
    { icon: Shield, label: "MNRE Approved", sub: "Ministry of New & Renewable Energy" },
    { icon: Award, label: "ISO 9001:2015", sub: "Quality Management Certified" },
    { icon: BadgeCheck, label: "BIS Certified", sub: "Bureau of Indian Standards" },
    { icon: Handshake, label: "DISCOM Empaneled", sub: "State Level Registration" },
    { icon: Star, label: "5-Star Rating", sub: "Google Business Reviews" },
    { icon: Shield, label: "MNRE Approved", sub: "Ministry of New & Renewable Energy" },
    { icon: Award, label: "ISO 9001:2015", sub: "Quality Management Certified" },
    { icon: BadgeCheck, label: "BIS Certified", sub: "Bureau of Indian Standards" },
    { icon: Handshake, label: "DISCOM Empaneled", sub: "State Level Registration" },
    { icon: Star, label: "5-Star Rating", sub: "Google Business Reviews" },
];

const partners = [
    "Tata Power Solar", "Adani Solar", "Luminous", "Havells", "Microtek",
    "Waaree", "Vikram Solar", "Loom Solar", "UTL Solar", "Livguard",
    "Tata Power Solar", "Adani Solar", "Luminous", "Havells", "Microtek",
    "Waaree", "Vikram Solar", "Loom Solar", "UTL Solar", "Livguard",
];

export function TrustBadgesSection() {
    return (
        <section className="bg-gray-50/50 py-16 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase">
                    Trusted & Certified
                </span>
            </motion.div>

            {/* Scrolling Badges */}
            <div className="relative mb-8">
                <div className="flex animate-scroll-left">
                    {badges.map((badge, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-3 bg-white rounded-2xl border border-green-100 px-6 py-4 flex items-center gap-3 shadow-sm min-w-[240px]"
                        >
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                                <badge.icon className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{badge.label}</p>
                                <p className="text-[11px] text-gray-400">{badge.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrolling Partners - reverse direction */}
            <div className="relative">
                <div className="flex animate-scroll-right">
                    {partners.map((name, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-3 bg-white rounded-xl border border-gray-100 px-6 py-3 flex items-center justify-center shadow-sm min-w-[160px]"
                        >
                            <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">{name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-left {
                    animation: scroll-left 30s linear infinite;
                }
                .animate-scroll-right {
                    animation: scroll-right 35s linear infinite;
                }
            `}</style>
        </section>
    );
}
