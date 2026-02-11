"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ClipboardCheck, MapPin, Wrench, Banknote } from "lucide-react";

const steps = [
    {
        icon: ClipboardCheck,
        step: "01",
        title: "Free Consultation",
        description: "Tell us about your electricity needs. We'll recommend the perfect solar system size and estimate your savings.",
        color: "from-green-400 to-green-500",
    },
    {
        icon: MapPin,
        step: "02",
        title: "Site Survey",
        description: "Our engineers visit your location for a detailed assessment — roof condition, shadow analysis, and electrical setup.",
        color: "from-emerald-400 to-emerald-500",
    },
    {
        icon: Wrench,
        step: "03",
        title: "Installation",
        description: "Professional installation in 3-5 days with Tier-1 solar panels. Net metering setup and grid connection included.",
        color: "from-teal-400 to-teal-500",
    },
    {
        icon: Banknote,
        step: "04",
        title: "Subsidy & Savings",
        description: "We handle your PM Surya Ghar subsidy application. Start saving from Day 1 while your subsidy gets credited directly.",
        color: "from-cyan-400 to-cyan-500",
    },
];

export function HowItWorksSection() {
    return (
        <section className="bg-white">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Simple Process
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How It <span className="text-green-600">Works</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        Go solar in 4 simple steps. We manage everything from paperwork to installation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Connector Line (desktop) */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-green-200 via-emerald-200 to-cyan-200" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -6 }}
                            className="relative text-center group"
                        >
                            {/* Step Circle */}
                            <div className="relative mx-auto mb-6">
                                <motion.div
                                    whileHover={{ rotate: 6 }}
                                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl rotate-3 flex items-center justify-center mx-auto shadow-lg shadow-green-600/10 group-hover:shadow-xl group-hover:shadow-green-600/20 transition-shadow duration-500`}
                                >
                                    <step.icon className="w-8 h-8 text-white -rotate-3" />
                                </motion.div>
                                {/* Step Number Badge */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-green-200 flex items-center justify-center shadow-sm">
                                    <span className="text-green-700 text-xs font-bold">{step.step}</span>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
