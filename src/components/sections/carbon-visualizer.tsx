"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp } from "@/lib/animations";
import { TreePine, Droplets, Fuel, Home, Leaf } from "lucide-react";

function useCountUp(end: number, duration: number, start: boolean): number {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number;
        let animId: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) animId = requestAnimationFrame(animate);
        };
        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [end, duration, start]);
    return count;
}

const systemSizes = [1, 2, 3, 5, 7, 10];

// Approximate values per kW
const CO2_PER_KW = 1.4; // tonnes/year
const TREES_PER_KW = 46; // equivalent trees
const FUEL_PER_KW = 600; // liters of petrol saved
const HOMES_PER_KW = 0.3; // homes powered

export function CarbonVisualizerSection() {
    const [selectedSize, setSelectedSize] = useState(3);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const co2 = Math.round(selectedSize * CO2_PER_KW * 10) / 10;
    const trees = Math.round(selectedSize * TREES_PER_KW);
    const fuel = Math.round(selectedSize * FUEL_PER_KW);
    const homes = Math.round(selectedSize * HOMES_PER_KW * 10) / 10;

    const co2Count = useCountUp(Math.floor(co2), 1.5, isInView);
    const treesCount = useCountUp(trees, 1.8, isInView);
    const fuelCount = useCountUp(fuel, 2, isInView);

    const stats = [
        {
            icon: Leaf,
            value: `${co2Count}+`,
            label: "Tonnes CO₂ Saved / Year",
            color: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-100",
        },
        {
            icon: TreePine,
            value: `${treesCount}+`,
            label: "Equivalent Trees Planted",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
        {
            icon: Fuel,
            value: `${fuelCount}L`,
            label: "Petrol Saved / Year",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
        },
        {
            icon: Home,
            value: `${homes}`,
            label: "Homes Powered Equivalent",
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
        },
    ];

    return (
        <section ref={ref} className="bg-gradient-to-b from-green-50/30 to-white py-20 md:py-28">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Environmental Impact
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your Solar{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            Carbon Footprint
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        See how much positive environmental impact your solar system creates every year.
                    </p>
                </motion.div>

                {/* System Size Selector */}
                <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
                    {systemSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedSize === size
                                    ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                                }`}
                        >
                            {size} kW
                        </button>
                    ))}
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className={`${stat.bg} rounded-3xl border ${stat.border} p-6 md:p-8 text-center transition-all duration-300 cursor-default`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <motion.p
                                key={`${stat.label}-${selectedSize}`}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}
                            >
                                {stat.value}
                            </motion.p>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Motivational Banner */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-6 md:p-8 text-center text-white"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Droplets className="w-5 h-5" />
                        <span className="text-sm font-semibold tracking-wider uppercase">Planet Impact</span>
                    </div>
                    <p className="text-lg md:text-xl font-bold">
                        A {selectedSize} kW system saves {co2} tonnes of CO₂ per year —<br className="hidden md:block" />
                        that&apos;s like planting <span className="text-green-200">{trees} trees</span> every single year! 🌍
                    </p>
                </motion.div>
            </SectionWrapper>
        </section>
    );
}
