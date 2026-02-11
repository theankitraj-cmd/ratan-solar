"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/card";
import { fadeInUp } from "@/lib/animations";
import { Sun, Battery, Workflow, Shield, Zap, Leaf } from "lucide-react";

const features = [
    {
        icon: Sun,
        title: "Total Energy Independence",
        description: "High-efficiency solar systems that power your home or enterprise 24/7. Break free from grid dependency.",
        color: "text-yellow-500",
        bg: "bg-yellow-50",
    },
    {
        icon: Battery,
        title: "Advanced Energy Storage",
        description: "State-of-the-art battery solutions that store excess solar energy for seamless 24/7 power supply.",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        icon: Leaf,
        title: "Green Hydrogen Systems",
        description: "Pioneering hydrogen energy storage for industrial-scale clean energy backed by cutting-edge technology.",
        color: "text-green-500",
        bg: "bg-green-50",
    },
    {
        icon: Workflow,
        title: "Smart Grid Integration",
        description: "Intelligent grid connectivity with net metering support, allowing you to sell excess power back to the grid.",
        color: "text-purple-500",
        bg: "bg-purple-50",
    },
    {
        icon: Shield,
        title: "25-Year Warranty",
        description: "Industry-leading warranty coverage with comprehensive maintenance support for decades of reliable power.",
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    {
        icon: Zap,
        title: "Government Subsidy Support",
        description: "Complete assistance with PM Surya Ghar and KUSUM scheme applications. Maximize your solar savings.",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
];

export function FeaturesSection() {
    return (
        <section className="bg-white py-20 md:py-28">
            <SectionWrapper id="features">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Our Expertise
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Engineering the Future{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            of Clean Energy
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-light">
                        From rooftop installations to utility-scale farms, we deliver end-to-end solar EPC
                        solutions built for performance and longevity.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <motion.div key={feature.title} variants={fadeInUp}>
                            <GlassCard className="h-full group">
                                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                                <div className="mt-5 h-[2px] w-0 group-hover:w-16 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" />
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
