"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp } from "@/lib/animations";
import { TrendingUp, IndianRupee, Calendar, Sparkles } from "lucide-react";

const milestones = [
    { month: 0, label: "Installation", desc: "System goes live", icon: "🔧" },
    { month: 1, label: "Day 1 Savings", desc: "Electricity bill drops immediately", icon: "⚡" },
    { month: 12, label: "Year 1", desc: "₹30,000+ saved already", icon: "💰" },
    { month: 36, label: "Year 3", desc: "₹90,000+ total savings", icon: "📈" },
    { month: 48, label: "Payback!", desc: "Investment fully recovered", icon: "🎉" },
    { month: 300, label: "25 Years", desc: "₹7,50,000+ total savings", icon: "🏆" },
];

export function ROITimelineSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="bg-white py-20 md:py-28 overflow-hidden">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Your Returns
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Solar Pays for Itself in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            3-4 Years
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        See how your investment grows over 25 years of free, clean electricity.
                    </p>
                </motion.div>

                {/* ROI Progress Bar */}
                <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-16">
                    <div className="relative">
                        {/* Labels */}
                        <div className="flex justify-between mb-3">
                            <span className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                                <IndianRupee className="w-3.5 h-3.5" /> Payback Period
                            </span>
                            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> Pure Profit
                            </span>
                        </div>
                        {/* Bar */}
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "16%" } : {}}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-l-full"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "84%" } : {}}
                                transition={{ duration: 1.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute right-0 top-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-r-full"
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-400">Year 0</span>
                            <span className="text-xs text-gray-400 font-semibold">Year 4 (Breakeven)</span>
                            <span className="text-xs text-gray-400">Year 25</span>
                        </div>
                    </div>
                </motion.div>

                {/* Key Numbers */}
                <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                    {[
                        { icon: IndianRupee, label: "Avg. Investment", value: "₹1.1L", sub: "After subsidy (3kW)" },
                        { icon: Calendar, label: "Payback Period", value: "3-4 Yrs", sub: "With net metering" },
                        { icon: TrendingUp, label: "25-Year Savings", value: "₹7.5L+", sub: "On a 3kW system" },
                        { icon: Sparkles, label: "Monthly Savings", value: "₹2,500", sub: "Average estimate" },
                    ].map((item) => (
                        <div key={item.label} className="bg-green-50/50 rounded-2xl border border-green-100 p-5 text-center">
                            <item.icon className="w-6 h-6 text-green-600 mx-auto mb-3" />
                            <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
                            <p className="text-xs font-semibold text-green-600 mb-0.5">{item.label}</p>
                            <p className="text-[11px] text-gray-400">{item.sub}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Timeline */}
                <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                    <h3 className="text-center text-lg font-bold text-gray-900 mb-8">Your Solar Investment Journey</h3>
                    <div className="relative">
                        {/* Central line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-green-200 -translate-x-1/2" />

                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.month}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                                className={`relative flex items-center gap-4 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ml-14 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                                    <div className={`inline-block bg-white rounded-2xl border border-green-100 p-4 shadow-sm hover:shadow-md transition-shadow ${m.month === 48 ? "border-green-300 bg-green-50" : ""
                                        }`}>
                                        <span className="text-2xl mb-1 block">{m.icon}</span>
                                        <h4 className="font-bold text-gray-900 text-sm">{m.label}</h4>
                                        <p className="text-gray-500 text-xs">{m.desc}</p>
                                    </div>
                                </div>
                                {/* Node */}
                                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${m.month <= 48 ? "border-orange-400 bg-orange-100" : "border-green-500 bg-green-100"
                                    }`} />
                                {/* Spacer for other side */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </SectionWrapper>
        </section>
    );
}
