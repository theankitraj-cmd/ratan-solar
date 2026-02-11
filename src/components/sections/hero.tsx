"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, staggerContainer, chipStagger, chipItem, glowPulse } from "@/lib/animations";
import { Tag } from "@/components/ui/tag";
import { Sun, ArrowRight, Leaf, Zap, Globe } from "lucide-react";
import { SolarParticles } from "@/components/ui/solar-particles";

const heroTags = [
    "Rooftop Solar", "Solar Farms", "Green Hydrogen",
    "Energy Storage", "Smart Grid", "PM Surya Ghar",
    "EPC Solutions", "O&M Services"
];

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Solar Particles */}
            <SolarParticles />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-green-300 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-40 w-96 h-96 bg-emerald-200 rounded-full blur-3xl" />
            </div>

            {/* Floating Leaves */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 right-[15%] text-green-300 opacity-40"
            >
                <Leaf className="w-12 h-12" />
            </motion.div>
            <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 left-[10%] text-emerald-300 opacity-30"
            >
                <Globe className="w-16 h-16" />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center"
            >
                {/* Left Content */}
                <div>
                    <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
                        <span className="w-8 h-[2px] bg-green-500" />
                        <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase">
                            Greener Energy for India
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6"
                    >
                        Powering a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            Greener
                        </span>{" "}
                        Tomorrow
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed mb-8 font-light"
                    >
                        India&apos;s trusted solar EPC partner delivering rooftop, ground-mount, and
                        utility-scale solar solutions. Harness government subsidies and save up to
                        90% on electricity bills.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                        <Link href="/calculator">
                            <motion.button
                                variants={glowPulse}
                                initial="initial"
                                animate="animate"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 text-sm flex items-center gap-2"
                            >
                                <Sun className="w-5 h-5" />
                                Calculate Savings
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link href="/schemes">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 border-2 border-green-600 text-green-700 rounded-full hover:bg-green-50 transition-all duration-300 text-sm font-semibold flex items-center gap-2"
                            >
                                <Zap className="w-4 h-4" />
                                Govt Schemes
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Tags */}
                    <motion.div variants={chipStagger} className="flex flex-wrap gap-2">
                        {heroTags.map((tag) => (
                            <motion.div key={tag} variants={chipItem}>
                                <Tag variant="default">{tag}</Tag>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right - 3D Earth Globe */}
                <motion.div
                    variants={fadeInUp}
                    className="relative flex justify-center lg:justify-end"
                >
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]"
                    >
                        {/* Outer atmospheric glow */}
                        <motion.div
                            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-[-30px] bg-gradient-to-br from-green-400/30 via-emerald-300/20 to-cyan-400/25 rounded-full blur-3xl"
                        />
                        {/* Inner glow ring */}
                        <div className="absolute inset-[-8px] bg-gradient-to-br from-green-400/15 to-emerald-500/10 rounded-full blur-xl" />

                        {/* Globe Image */}
                        <div className="relative w-full h-full rounded-full overflow-hidden drop-shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                            <Image
                                src="/earth-solar-hero.png"
                                alt="Earth powered by solar energy"
                                fill
                                className="object-cover scale-[1.35]"
                                priority
                            />
                        </div>

                        {/* Orbiting Stat */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-24px]"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-green-600/10 px-4 py-2 border border-green-100">
                                <span className="text-green-600 font-bold text-sm">500+ MW</span>
                            </div>
                        </motion.div>
                        {/* Second orbiting stat */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-16px]"
                        >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-green-600/10 px-4 py-2 border border-green-100">
                                <span className="text-green-600 font-bold text-sm">☀️ 40% Subsidy</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
