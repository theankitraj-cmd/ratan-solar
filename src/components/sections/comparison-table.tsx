"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp } from "@/lib/animations";
import {
    Zap, Battery, Globe, Check, X, Star, ArrowRight,
} from "lucide-react";
import Link from "next/link";

const systems = [
    {
        id: "on-grid",
        name: "On-Grid",
        icon: Globe,
        tagline: "Most Popular",
        color: "green",
        price: "₹50K – ₹3.5L",
        description: "Connected to the grid with net metering. Sell excess power back.",
        features: {
            "Grid Connected": true,
            "Battery Backup": false,
            "Net Metering": true,
            "Works in Power Cuts": false,
            "Lowest Cost": true,
            "Govt Subsidy": true,
            "Maintenance": "Low",
            "Best For": "Homes with reliable grid",
            "ROI Period": "3-4 years",
        },
    },
    {
        id: "off-grid",
        name: "Off-Grid",
        icon: Battery,
        tagline: "Full Independence",
        color: "blue",
        price: "₹1.5L – ₹6L",
        description: "Complete independence from the grid with battery storage.",
        features: {
            "Grid Connected": false,
            "Battery Backup": true,
            "Net Metering": false,
            "Works in Power Cuts": true,
            "Lowest Cost": false,
            "Govt Subsidy": false,
            "Maintenance": "Medium",
            "Best For": "Remote / rural areas",
            "ROI Period": "5-7 years",
        },
    },
    {
        id: "hybrid",
        name: "Hybrid",
        icon: Zap,
        tagline: "Best of Both",
        color: "purple",
        price: "₹1.2L – ₹5L",
        description: "Grid + battery combo for uninterrupted power, day and night.",
        features: {
            "Grid Connected": true,
            "Battery Backup": true,
            "Net Metering": true,
            "Works in Power Cuts": true,
            "Lowest Cost": false,
            "Govt Subsidy": true,
            "Maintenance": "Medium",
            "Best For": "Frequent power cuts",
            "ROI Period": "4-6 years",
        },
    },
];

const featureKeys = Object.keys(systems[0].features);

export function ComparisonTableSection() {
    const [highlighted, setHighlighted] = useState("on-grid");

    return (
        <section className="bg-white py-20 md:py-28">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Compare Systems
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Which Solar System is{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            Right for You?
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        Compare On-Grid, Off-Grid, and Hybrid solar systems to find your perfect match.
                    </p>
                </motion.div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-6">
                    {systems.map((sys) => (
                        <motion.div
                            key={sys.id}
                            variants={fadeInUp}
                            className={`rounded-3xl border p-6 transition-all duration-300 ${sys.id === "on-grid"
                                    ? "border-green-200 bg-green-50/30 shadow-lg shadow-green-600/5"
                                    : "border-gray-100 bg-white"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sys.color === "green" ? "bg-green-100" : sys.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                                    }`}>
                                    <sys.icon className={`w-6 h-6 ${sys.color === "green" ? "text-green-600" : sys.color === "blue" ? "text-blue-600" : "text-purple-600"
                                        }`} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-gray-900">{sys.name}</h3>
                                        {sys.id === "on-grid" && (
                                            <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                <Star className="w-3 h-3" /> POPULAR
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{sys.price}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{sys.description}</p>
                            <div className="space-y-2">
                                {featureKeys.map((key) => {
                                    const val = sys.features[key as keyof typeof sys.features];
                                    return (
                                        <div key={key} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                                            <span className="text-xs text-gray-500">{key}</span>
                                            <span className="text-xs font-semibold text-gray-800">
                                                {typeof val === "boolean" ? (
                                                    val ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-gray-300" />
                                                ) : val}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <motion.div variants={fadeInUp} className="hidden lg:block">
                    <div className="rounded-3xl border border-green-100 overflow-hidden shadow-xl shadow-green-600/5">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-green-100">
                                    <th className="text-left p-6 text-sm font-semibold text-gray-500 w-1/4">Features</th>
                                    {systems.map((sys) => (
                                        <th
                                            key={sys.id}
                                            className={`p-6 text-center cursor-pointer transition-all duration-300 ${highlighted === sys.id ? "bg-green-50" : ""
                                                }`}
                                            onMouseEnter={() => setHighlighted(sys.id)}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${sys.color === "green" ? "bg-green-100" : sys.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                                                    }`}>
                                                    <sys.icon className={`w-7 h-7 ${sys.color === "green" ? "text-green-600" : sys.color === "blue" ? "text-blue-600" : "text-purple-600"
                                                        }`} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 justify-center">
                                                        <span className="text-lg font-bold text-gray-900">{sys.name}</span>
                                                        {sys.id === "on-grid" && (
                                                            <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                                <Star className="w-3 h-3" /> POPULAR
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-semibold text-green-600">{sys.price}</span>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {featureKeys.map((key, i) => (
                                    <tr key={key} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
                                        <td className="p-5 text-sm font-medium text-gray-700">{key}</td>
                                        {systems.map((sys) => {
                                            const val = sys.features[key as keyof typeof sys.features];
                                            return (
                                                <td
                                                    key={sys.id}
                                                    className={`p-5 text-center transition-colors duration-300 ${highlighted === sys.id ? "bg-green-50/50" : ""
                                                        }`}
                                                    onMouseEnter={() => setHighlighted(sys.id)}
                                                >
                                                    {typeof val === "boolean" ? (
                                                        val ? (
                                                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                                                        ) : (
                                                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                                                        )
                                                    ) : (
                                                        <span className="text-sm font-semibold text-gray-700">{val}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeInUp} className="text-center mt-10">
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg shadow-green-600/25 transition-all text-sm inline-flex items-center gap-2"
                        >
                            Get Expert Recommendation <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </motion.div>
            </SectionWrapper>
        </section>
    );
}
