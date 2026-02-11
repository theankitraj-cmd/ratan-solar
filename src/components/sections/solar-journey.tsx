"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp } from "@/lib/animations";
import {
    ClipboardCheck, Ruler, FileCheck, Wrench, PlugZap, MonitorSmartphone,
} from "lucide-react";

const journeySteps = [
    {
        icon: ClipboardCheck,
        title: "Site Survey",
        description: "Our experts visit your location to assess roof area, sun exposure, and structural integrity.",
        day: "Day 1-2",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Ruler,
        title: "Custom Design",
        description: "We design a system optimized for your roof layout, energy needs, and budget.",
        day: "Day 3-4",
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: FileCheck,
        title: "Permits & Subsidy",
        description: "We handle all paperwork — DISCOM application, net metering, and PM Surya Ghar subsidy.",
        day: "Day 5-10",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: Wrench,
        title: "Installation",
        description: "Professional installation by trained technicians. Most systems go up in just 1-2 days.",
        day: "Day 11-12",
        color: "bg-green-50 text-green-600",
    },
    {
        icon: PlugZap,
        title: "Grid Connection",
        description: "Net meter installation and final DISCOM inspection. Your system goes live!",
        day: "Day 13-15",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: MonitorSmartphone,
        title: "Live Monitoring",
        description: "Track your solar generation in real-time via our app. 24/7 support for peace of mind.",
        day: "Day 15+",
        color: "bg-cyan-50 text-cyan-600",
    },
];

export function SolarJourneySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="bg-green-50/30 py-20 md:py-28">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Installation Process
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your Solar Journey in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            15 Days
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        From first call to free electricity — here&apos;s how your solar journey unfolds.
                    </p>
                </motion.div>

                {/* Journey Steps */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Central Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-green-200 -translate-x-1/2" />

                    {journeySteps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative flex gap-6 mb-10 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Card */}
                            <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                                <div className={`bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-lg hover:shadow-green-600/5 transition-all duration-500 group ${i % 2 === 0 ? "md:text-right" : ""
                                    }`}>
                                    <div className={`inline-flex items-center gap-2 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                        <div className={`w-10 h-10 rounded-xl ${step.color.split(" ")[0]} flex items-center justify-center`}>
                                            <step.icon className={`w-5 h-5 ${step.color.split(" ")[1]}`} />
                                        </div>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                                            {step.day}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                                    <div className={`mt-3 h-[2px] w-0 group-hover:w-12 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 ${i % 2 === 0 ? "md:ml-auto" : ""
                                        }`} />
                                </div>
                            </div>

                            {/* Node */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-green-500 shadow-md shadow-green-600/20 z-10 mt-6" />

                            {/* Spacer */}
                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
