"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Home, Building2, Factory, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
    {
        icon: Home,
        title: "Residential Rooftop Solar",
        subtitle: "For Homes & Apartments",
        description: "Transform your rooftop into a power plant. Save up to 90% on electricity bills with government subsidies up to ₹78,000 under PM Surya Ghar Yojana.",
        features: ["1 kW to 10 kW Systems", "Net Metering Support", "PM Surya Ghar Subsidy", "25-Year Performance Warranty", "Free Site Assessment"],
        color: "from-green-500 to-emerald-500",
        bg: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        icon: Building2,
        title: "Commercial Solar",
        subtitle: "For Offices & Institutions",
        description: "Reduce your operational costs dramatically with customized commercial solar solutions. Ideal for offices, schools, hospitals, and shopping complexes.",
        features: ["10 kW to 500 kW Systems", "Accelerated Depreciation (40%)", "Custom Design & Engineering", "Remote Monitoring Dashboard", "Quick ROI — 3-4 Years"],
        color: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        icon: Factory,
        title: "Industrial & Ground-Mount",
        subtitle: "For Factories & Solar Farms",
        description: "Large-scale solar solutions for factories, warehouses, and open-access ground-mount installations. Utility-grade quality with maximum ROI.",
        features: ["500 kW to 50 MW+ Scale", "Open Access & Captive Models", "MNRE/SECI Compliant", "Land Procurement Support", "Battery Storage Integration"],
        color: "from-orange-500 to-amber-500",
        bg: "bg-orange-50",
        iconColor: "text-orange-600",
    },
    {
        icon: Wrench,
        title: "O&M Services",
        subtitle: "Operations & Maintenance",
        description: "Comprehensive maintenance services to ensure your solar investment performs at peak efficiency throughout its lifetime.",
        features: ["Preventive Maintenance", "Performance Optimization", "Module Cleaning & Repair", "24/7 Remote Monitoring", "Annual Health Reports"],
        color: "from-purple-500 to-violet-500",
        bg: "bg-purple-50",
        iconColor: "text-purple-600",
    },
];

export default function ServicesPage() {
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
                            Our Services
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Solar Solutions for{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                Every Scale
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            From a single rooftop to multi-megawatt solar farms — we provide complete
                            turnkey EPC solutions tailored to your energy needs.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="bg-white">
                <SectionWrapper>
                    <div className="space-y-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                variants={fadeInUp}
                                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-green-600/5 transition-all duration-500"
                            >
                                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                                    {/* Content */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6`}>
                                            <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                                        </div>
                                        <span className="text-sm text-gray-400 font-medium mb-1">{service.subtitle}</span>
                                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                                        <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
                                        <ul className="space-y-2 mb-8">
                                            {service.features.map((f) => (
                                                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
                                        >
                                            Get a Quote <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    {/* Decorative gradient */}
                                    <div className={`hidden lg:flex items-center justify-center bg-gradient-to-br ${service.color} relative min-h-[300px]`}>
                                        <service.icon className="w-32 h-32 text-white/20" />
                                        <div className="absolute inset-0 bg-black/5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </SectionWrapper>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                        Ready to Go Solar?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 font-light">
                        Get a free site assessment and customized solar proposal.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/calculator"
                            className="px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-all duration-300 text-sm"
                        >
                            Calculate Savings
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
