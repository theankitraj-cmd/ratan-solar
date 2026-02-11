"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/card";
import { fadeInUp } from "@/lib/animations";
import { Cpu, BarChart3, Settings2, Wifi } from "lucide-react";

const techItems = [
    {
        icon: Cpu,
        title: "Tier-1 Monocrystalline",
        description: "Premium solar cells with 22%+ efficiency. Industry-leading degradation rates ensuring 25+ year performance.",
    },
    {
        icon: BarChart3,
        title: "AI-Powered Monitoring",
        description: "Real-time performance analytics with predictive maintenance alerts, ensuring 99.8% uptime across all installations.",
    },
    {
        icon: Settings2,
        title: "Precision Engineering",
        description: "Custom-designed mounting systems with wind-load analysis, optimized tilt angles, and anti-PID modules.",
    },
    {
        icon: Wifi,
        title: "IoT Integration",
        description: "Smart inverters with remote diagnostics, weather-adaptive MPPT tracking, and smart grid compatibility.",
    },
];

export function TechSection() {
    return (
        <section className="bg-gradient-to-b from-white to-green-50/30">
            <SectionWrapper id="technology">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Technology
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Precision in{" "}
                        <span className="text-green-600">Every Watt</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-light">
                        Advanced solar engineering powered by cutting-edge technology and rigorous quality standards.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {techItems.map((item) => (
                        <motion.div key={item.title} variants={fadeInUp}>
                            <GlassCard className="flex items-start gap-5 h-full">
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
