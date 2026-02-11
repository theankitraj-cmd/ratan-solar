"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Sun, Landmark, IndianRupee, CheckCircle2, ArrowRight, Zap, Users, FileText } from "lucide-react";

const schemes = [
    {
        id: "pm-surya-ghar",
        icon: Sun,
        title: "PM Surya Ghar Muft Bijli Yojana",
        subtitle: "Free Electricity for Indian Homes",
        tagline: "Up to ₹78,000 Subsidy",
        description: "The Government of India's flagship scheme to provide free electricity to 1 crore households by installing rooftop solar panels. Get up to 300 units of free electricity per month.",
        subsidy: [
            { capacity: "Up to 2 kW", amount: "₹30,000 per kW", total: "₹60,000" },
            { capacity: "2 kW to 3 kW", amount: "₹18,000 per kW (for 3rd kW)", total: "₹78,000" },
            { capacity: "Above 3 kW", amount: "No additional subsidy", total: "₹78,000 (max)" },
        ],
        eligibility: [
            "Indian citizen with a residential electricity connection",
            "The rooftop must be owned by the applicant",
            "Only grid-connected rooftop solar systems qualify",
            "Must apply through the national portal or registered vendor",
            "Subsidy is available for systems from 1 kW to 10 kW",
        ],
        howToApply: [
            "Visit the PM Surya Ghar portal (pmsuryaghar.gov.in)",
            "Register with your electricity consumer number",
            "Choose a registered vendor (like Ratan Solar)",
            "Get site feasibility assessment done",
            "Apply for subsidy after installation and net metering",
            "Subsidy credited directly to your bank account",
        ],
        color: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-50",
        iconColor: "text-yellow-600",
        borderColor: "border-yellow-200",
    },
    {
        id: "pm-kusum",
        icon: Landmark,
        title: "PM-KUSUM Yojana",
        subtitle: "Kisan Urja Suraksha evam Utthaan Mahabhiyan",
        tagline: "For Farmers & Agriculture",
        description: "Dedicated to empowering Indian farmers with solar energy for irrigation and income generation. Install solar pumps, solarize existing pumps, or set up mini solar farms on barren land.",
        components: [
            {
                name: "Component A",
                desc: "Install solar power plants of up to 2 MW capacity on barren/fallow land. Farmers can sell excess power to DISCOMs.",
            },
            {
                name: "Component B",
                desc: "Replace diesel-powered agricultural pumps with standalone solar pumps of capacity up to 7.5 HP. Central & state subsidy covers 60%.",
            },
            {
                name: "Component C",
                desc: "Solarize grid-connected agricultural pumps. Government provides 30% subsidy; farmer invests or takes a loan for the remaining.",
            },
        ],
        eligibility: [
            "Individual farmers, farmer groups, cooperatives, FPOs, panchayats",
            "Must own agricultural land (Component A & B)",
            "For Component C: must have an existing grid-connected pump",
            "Available across all states (subject to state participation)",
        ],
        color: "from-green-500 to-emerald-500",
        bg: "bg-green-50",
        iconColor: "text-green-600",
        borderColor: "border-green-200",
    },
];

const stateSubsidies = [
    { state: "Bihar", subsidy: "Additional ₹10,000-15,000 on rooftop systems" },
    { state: "Uttar Pradesh", subsidy: "30% state subsidy on solar pumps" },
    { state: "Rajasthan", subsidy: "60% subsidy on solar water heaters" },
    { state: "Gujarat", subsidy: "Additional top-up on PM Surya Ghar for BPL families" },
    { state: "Maharashtra", subsidy: "Net metering with 100% banking facility" },
    { state: "Tamil Nadu", subsidy: "Generation-based incentive for rooftop solar" },
];

export default function SchemesPage() {
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
                            Government Schemes
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Solar Subsidies &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                Govt Schemes
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            The Indian government offers generous subsidies to make solar energy affordable.
                            We help you navigate and maximize benefits from PM Surya Ghar, PM-KUSUM, and state-level schemes.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Scheme Cards */}
            <section className="bg-white">
                <SectionWrapper>
                    <motion.div className="space-y-16" variants={staggerContainer}>
                        {schemes.map((scheme) => (
                            <motion.div
                                key={scheme.id}
                                variants={fadeInUp}
                                id={scheme.id}
                                className="scroll-mt-24"
                            >
                                {/* Scheme Header */}
                                <div className={`rounded-3xl border ${scheme.borderColor} overflow-hidden`}>
                                    <div className={`bg-gradient-to-r ${scheme.color} p-8 md:p-12`}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                                <scheme.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <span className="text-white/80 text-sm font-medium block">{scheme.tagline}</span>
                                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{scheme.title}</h2>
                                            </div>
                                        </div>
                                        <p className="text-white/80 text-sm font-light">{scheme.subtitle}</p>
                                    </div>

                                    <div className="p-8 md:p-12 bg-white space-y-10">
                                        <p className="text-gray-600 leading-relaxed text-base">{scheme.description}</p>

                                        {/* Subsidy Table (PM Surya Ghar) */}
                                        {scheme.subsidy && (
                                            <div>
                                                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                                                    <IndianRupee className="w-5 h-5 text-green-600" />
                                                    Subsidy Structure
                                                </h3>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm">
                                                        <thead>
                                                            <tr className="bg-green-50">
                                                                <th className="text-left p-4 font-semibold text-gray-700 rounded-tl-xl">System Capacity</th>
                                                                <th className="text-left p-4 font-semibold text-gray-700">Subsidy Rate</th>
                                                                <th className="text-left p-4 font-semibold text-gray-700 rounded-tr-xl">Max Subsidy</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {scheme.subsidy.map((row) => (
                                                                <tr key={row.capacity} className="border-t border-green-100">
                                                                    <td className="p-4 text-gray-600">{row.capacity}</td>
                                                                    <td className="p-4 text-gray-600">{row.amount}</td>
                                                                    <td className="p-4 font-semibold text-green-700">{row.total}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}

                                        {/* Components (KUSUM) */}
                                        {scheme.components && (
                                            <div>
                                                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                                                    <Zap className="w-5 h-5 text-green-600" />
                                                    Scheme Components
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {scheme.components.map((c) => (
                                                        <div key={c.name} className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
                                                            <h4 className="font-bold text-green-700 mb-2">{c.name}</h4>
                                                            <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Eligibility */}
                                        <div>
                                            <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                                                <Users className="w-5 h-5 text-green-600" />
                                                Eligibility
                                            </h3>
                                            <ul className="space-y-2">
                                                {scheme.eligibility.map((e) => (
                                                    <li key={e} className="flex items-start gap-3 text-gray-600 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span>{e}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* How to Apply (PM Surya Ghar) */}
                                        {scheme.howToApply && (
                                            <div>
                                                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                                                    <FileText className="w-5 h-5 text-green-600" />
                                                    How to Apply
                                                </h3>
                                                <ol className="space-y-3">
                                                    {scheme.howToApply.map((step, i) => (
                                                        <li key={i} className="flex items-start gap-4 text-gray-600 text-sm">
                                                            <span className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                {i + 1}
                                                            </span>
                                                            <span className="pt-1">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </SectionWrapper>
            </section>

            {/* State Subsidies */}
            <section className="bg-green-50/40">
                <SectionWrapper>
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            State-Level <span className="text-green-600">Subsidies</span>
                        </h2>
                        <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                            Many states offer additional subsidies on top of central government schemes.
                        </p>
                    </motion.div>
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerContainer}>
                        {stateSubsidies.map((item) => (
                            <motion.div
                                key={item.state}
                                variants={fadeInUp}
                                whileHover={{ y: -4 }}
                                className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-lg hover:shadow-green-600/5 transition-all duration-500"
                            >
                                <h4 className="font-bold text-gray-900 mb-2">{item.state}</h4>
                                <p className="text-gray-500 text-sm">{item.subsidy}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </SectionWrapper>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                        Let Us Handle Your Subsidy Application
                    </h2>
                    <p className="text-white/80 text-lg mb-8 font-light">
                        Our team manages the entire process — from application to subsidy disbursement.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/calculator"
                            className="px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-all duration-300 text-sm inline-flex items-center gap-2"
                        >
                            Calculate Your Savings <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
