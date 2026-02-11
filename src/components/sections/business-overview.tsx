"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import { CheckCircle2 } from "lucide-react";
import { logoBlur, solarFarmBlur } from "@/lib/blur-data";

const capabilities = [
    "Ground-mount & rooftop EPC",
    "Solar farm development",
    "Green hydrogen production",
    "Battery energy storage systems",
    "Smart grid integration",
    "O&M and lifecycle management",
];

export function BusinessOverviewSection() {
    return (
        <section className="bg-white">
            <SectionWrapper id="about">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <motion.div variants={fadeInLeft}>
                            <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                                About Ratan Solar
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                                Powering India&apos;s{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 italic">
                                    Clean Energy Future
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            variants={fadeInLeft}
                            className="text-gray-600 text-base leading-relaxed mt-6 mb-8 font-light"
                        >
                            Ratan Solar is a premier EPC company specializing in turnkey solar energy
                            solutions. From initial feasibility studies to commissioning and beyond, we
                            deliver projects that set the benchmark for quality, efficiency, and reliability
                            in the renewable energy sector.
                        </motion.p>

                        <motion.div
                            variants={fadeInLeft}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {capabilities.map((cap) => (
                                <div key={cap} className="flex items-center gap-3 text-sm text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>{cap}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right - Card */}
                    <motion.div variants={fadeInRight}>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden border border-green-100 shadow-xl shadow-green-600/5">
                            <div className="relative h-72 md:h-80">
                                <Image
                                    src="/solar-farm.png"
                                    alt="Solar Farm by Ratan Solar"
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                    blurDataURL={solarFarmBlur}
                                />
                            </div>
                            <div className="p-6 flex items-center gap-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-green-200">
                                    <Image src="/logo.jpg" alt="Ratan Solar" fill className="object-cover" placeholder="blur" blurDataURL={logoBlur} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Ratan Solar</h4>
                                    <p className="text-sm text-gray-500">Solar EPC & Renewable Energy</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </SectionWrapper>
        </section>
    );
}
