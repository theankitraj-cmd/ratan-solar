"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer, glowPulse } from "@/lib/animations";
import { ArrowRight, Phone, Shield, Clock, Award } from "lucide-react";

const trustItems = [
    { icon: Shield, label: "25-Year Warranty" },
    { icon: Clock, label: "24/7 Monitoring" },
    { icon: Award, label: "ISO Certified" },
];

export function CTASection() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-emerald-900">
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-green-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl" />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center"
            >
                <motion.span
                    variants={fadeInUp}
                    className="text-green-300 text-sm font-semibold tracking-[0.2em] uppercase mb-6 block"
                >
                    Start Your Solar Journey
                </motion.span>

                <motion.h2
                    variants={fadeInUp}
                    className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                >
                    Go Solar,{" "}
                    <span className="text-green-300 italic">Save Lakhs</span>
                </motion.h2>

                <motion.p
                    variants={fadeInUp}
                    className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light mb-10"
                >
                    Get up to ₹78,000 subsidy under PM Surya Ghar Yojana. Calculate your savings
                    and get a free site assessment from our solar experts.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
                    <Link href="/calculator">
                        <motion.button
                            variants={glowPulse}
                            initial="initial"
                            animate="animate"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-white text-green-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm flex items-center gap-2"
                        >
                            Calculate Savings
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 text-sm font-semibold flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            Contact Us
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-wrap justify-center gap-6"
                >
                    {trustItems.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-white/60 text-sm">
                            <item.icon className="w-4 h-4 text-green-300" />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
