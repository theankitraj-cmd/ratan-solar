"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MapPin, Zap, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Residential", "Commercial", "Industrial"];

const projects = [
    {
        title: "3 kW Rooftop System",
        location: "Patna, Bihar",
        type: "Residential",
        size: "3 kW",
        panels: 8,
        savings: "₹2,400/mo",
        gradient: "from-green-400 to-emerald-500",
    },
    {
        title: "5 kW Home Solar",
        location: "Gaya, Bihar",
        type: "Residential",
        size: "5 kW",
        panels: 14,
        savings: "₹4,200/mo",
        gradient: "from-emerald-400 to-teal-500",
    },
    {
        title: "10 kW Factory Rooftop",
        location: "Muzaffarpur, Bihar",
        type: "Commercial",
        size: "10 kW",
        panels: 28,
        savings: "₹9,500/mo",
        gradient: "from-cyan-400 to-blue-500",
    },
    {
        title: "25 kW Warehouse System",
        location: "Darbhanga, Bihar",
        type: "Commercial",
        size: "25 kW",
        panels: 70,
        savings: "₹22,000/mo",
        gradient: "from-blue-400 to-indigo-500",
    },
    {
        title: "50 kW Industrial Plant",
        location: "Bhagalpur, Bihar",
        type: "Industrial",
        size: "50 kW",
        panels: 140,
        savings: "₹45,000/mo",
        gradient: "from-violet-400 to-purple-500",
    },
    {
        title: "2 kW Budget Solar",
        location: "Samastipur, Bihar",
        type: "Residential",
        size: "2 kW",
        panels: 6,
        savings: "₹1,600/mo",
        gradient: "from-lime-400 to-green-500",
    },
    {
        title: "100 kW Solar Farm",
        location: "Nalanda, Bihar",
        type: "Industrial",
        size: "100 kW",
        panels: 280,
        savings: "₹85,000/mo",
        gradient: "from-amber-400 to-orange-500",
    },
    {
        title: "7 kW Home + Battery",
        location: "Begusarai, Bihar",
        type: "Residential",
        size: "7 kW",
        panels: 20,
        savings: "₹6,800/mo",
        gradient: "from-teal-400 to-cyan-500",
    },
    {
        title: "15 kW Office Complex",
        location: "Purnia, Bihar",
        type: "Commercial",
        size: "15 kW",
        panels: 42,
        savings: "₹14,000/mo",
        gradient: "from-green-500 to-emerald-600",
    },
];

export default function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.type === activeFilter);

    return (
        <main>
            <Header />
            <section className="pt-28 pb-20 bg-gradient-to-b from-green-50 via-white to-white">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-6 md:px-10"
                >
                    {/* Page Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                            Our Portfolio
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            Installation{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                Gallery
                            </span>
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-light">
                            Browse our completed solar installations across Bihar. Each project is a step towards a greener India.
                        </p>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${activeFilter === cat
                                        ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                                    }`}
                            >
                                {cat === "All" && <Filter className="w-3.5 h-3.5" />}
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.title}
                                variants={fadeInUp}
                                layout
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-3xl border border-green-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-green-600/5 transition-all duration-500 group"
                            >
                                {/* Image Placeholder with Gradient */}
                                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10" />
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                            <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                                                <Zap className="w-3 h-3 text-green-600" />
                                                {project.size}
                                            </span>
                                        </div>
                                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                            <span className="text-xs font-bold text-green-700">{project.savings}</span>
                                        </div>
                                    </div>
                                    {/* Panel Pattern */}
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.3) 24px, rgba(255,255,255,0.3) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.3) 24px, rgba(255,255,255,0.3) 25px)",
                                    }} />
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${project.type === "Residential" ? "bg-green-50 text-green-700" :
                                                project.type === "Commercial" ? "bg-blue-50 text-blue-700" :
                                                    "bg-purple-50 text-purple-700"
                                            }`}>
                                            {project.type}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {project.location}
                                        </div>
                                        <span className="text-xs font-medium text-gray-400">{project.panels} panels</span>
                                    </div>
                                    <div className="mt-3 h-[2px] w-0 group-hover:w-12 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} className="text-center mt-16">
                        <p className="text-gray-500 text-sm mb-4">
                            Want to see your rooftop here? Let&apos;s make it happen!
                        </p>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg shadow-green-600/25 transition-all text-sm inline-flex items-center gap-2"
                            >
                                Get Your Free Quote <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
            <Footer />
        </main>
    );
}
