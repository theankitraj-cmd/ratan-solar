"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { Target, Eye, Heart, Users, Award, Leaf } from "lucide-react";

const values = [
    { icon: Leaf, title: "Sustainability First", description: "Every decision we make is guided by our commitment to environmental stewardship and a cleaner planet." },
    { icon: Target, title: "Excellence in Execution", description: "From design to commissioning, we deliver projects that exceed industry benchmarks in quality and performance." },
    { icon: Heart, title: "Customer-Centric", description: "We treat every installation as if it were our own — with care, precision, and a long-term partnership mindset." },
    { icon: Users, title: "Community Impact", description: "We empower local communities with clean energy access, creating jobs and reducing carbon footprints across India." },
];

const milestones = [
    { year: "2015", title: "Founded", description: "Ratan Solar was established in Bihar with a vision to make solar energy accessible to every Indian household." },
    { year: "2018", title: "100 MW Milestone", description: "Crossed 100 MW of installed capacity across residential, commercial, and industrial sectors." },
    { year: "2021", title: "Pan-India Expansion", description: "Expanded operations to 200+ cities, becoming one of India's fastest-growing solar EPC companies." },
    { year: "2024", title: "500 MW & Beyond", description: "Reached 500 MW installed capacity with 12,000+ happy customers and a 99.8% system uptime." },
];

export default function AboutPage() {
    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-6 md:px-10"
                >
                    <motion.div variants={fadeInUp} className="max-w-3xl">
                        <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                            About Us
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Building India&apos;s{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                Solar Future
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            Ratan Solar is a premier solar EPC company committed to making clean,
                            renewable energy accessible and affordable for every Indian home, business,
                            and community. From rooftops in Bihar to solar farms across the nation —
                            we engineer a greener tomorrow.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white">
                <SectionWrapper>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div variants={fadeInLeft}>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border border-green-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <Eye className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    To be India&apos;s most trusted solar energy company — powering a nation
                                    where every home runs on clean, affordable, and sustainable energy.
                                    We envision a future where India leads the world in renewable energy adoption.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInRight}>
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-10 border border-green-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <Target className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    To provide world-class solar EPC solutions with unmatched quality,
                                    transparent pricing, and end-to-end service — enabling India&apos;s
                                    transition to 100% clean energy while maximizing value for every customer.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </SectionWrapper>
            </section>

            {/* Values */}
            <section className="bg-green-50/40">
                <SectionWrapper>
                    <motion.div variants={fadeInUp} className="text-center mb-14">
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Our Core <span className="text-green-600">Values</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((v) => (
                            <motion.div
                                key={v.title}
                                variants={fadeInUp}
                                whileHover={{ y: -4 }}
                                className="bg-white rounded-2xl p-8 border border-green-100 shadow-sm hover:shadow-lg hover:shadow-green-600/5 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                                    <v.icon className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </SectionWrapper>
            </section>

            {/* Timeline */}
            <section className="bg-white">
                <SectionWrapper>
                    <motion.div variants={fadeInUp} className="text-center mb-14">
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Our <span className="text-green-600">Journey</span>
                        </h2>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-200 hidden md:block" />
                        <div className="space-y-12">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={m.year}
                                    variants={fadeInUp}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                        <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm inline-block">
                                            <span className="text-green-600 font-bold text-2xl block mb-2">{m.year}</span>
                                            <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                                            <p className="text-gray-500 text-sm">{m.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-green-100 flex-shrink-0 relative z-10" />
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            </section>

            <Footer />
        </main>
    );
}
