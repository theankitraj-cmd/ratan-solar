"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Sun, IndianRupee, Leaf, Zap, TrendingDown, Calendar, ArrowRight, Info, X, Send, CheckCircle } from "lucide-react";
import { FAQSection } from "@/components/sections/faq";

// Average solar irradiation in India: ~4.5-5.5 kWh/m²/day
// 1 kW system → ~1400 units/year in India
const UNITS_PER_KW_PER_YEAR = 1400;
const COST_PER_KW = 55000; // ₹ installed cost per kW (after reduction over years)
const CO2_PER_UNIT = 0.82; // kg CO₂ per unit from coal
const RATE_INCREASE_PER_YEAR = 0.05; // 5% yearly tariff increase

function getSubsidy(capacityKw: number): number {
    if (capacityKw <= 0) return 0;
    if (capacityKw <= 2) return capacityKw * 30000;
    if (capacityKw <= 3) return 60000 + (capacityKw - 2) * 18000;
    return 78000; // Max subsidy ₹78,000
}

function formatCurrency(amount: number): string {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} Lakh`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CalculatorPage() {
    const [monthlyBill, setMonthlyBill] = useState(3000);
    const [electricityRate, setElectricityRate] = useState(8);
    const [roofArea, setRoofArea] = useState(200);

    // Lead capture state
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [quoteForm, setQuoteForm] = useState({ name: "", phone: "", email: "" });
    const [quoteSubmitting, setQuoteSubmitting] = useState(false);
    const [quoteSuccess, setQuoteSuccess] = useState(false);
    const [quoteError, setQuoteError] = useState("");

    const results = useMemo(() => {
        // Monthly consumption
        const monthlyUnits = monthlyBill / electricityRate;
        const yearlyUnits = monthlyUnits * 12;

        // System size needed (1 kW ≈ 10 sq.m roof space)
        const sizeByConsumption = yearlyUnits / UNITS_PER_KW_PER_YEAR;
        const sizeByRoof = roofArea / 10;
        const recommendedKw = Math.min(Math.ceil(sizeByConsumption), Math.floor(sizeByRoof), 10); // max 10 kW for residential
        const actualKw = Math.max(1, recommendedKw);

        // Generation
        const yearlyGeneration = actualKw * UNITS_PER_KW_PER_YEAR;
        const coveragePercent = Math.min(100, Math.round((yearlyGeneration / yearlyUnits) * 100));

        // Costs
        const systemCost = actualKw * COST_PER_KW;
        const subsidy = getSubsidy(actualKw);
        const netCost = systemCost - subsidy;

        // Savings over 25 years
        const yearlySavings = Math.min(yearlyGeneration, yearlyUnits) * electricityRate;
        let totalSavings25 = 0;
        for (let y = 0; y < 25; y++) {
            totalSavings25 += yearlySavings * Math.pow(1 + RATE_INCREASE_PER_YEAR, y);
        }

        // Payback period
        let payback = 0;
        let cumSavings = 0;
        while (cumSavings < netCost && payback < 25) {
            cumSavings += yearlySavings * Math.pow(1 + RATE_INCREASE_PER_YEAR, payback);
            payback++;
        }

        // Environmental
        const co2Saved = (yearlyGeneration * CO2_PER_UNIT * 25) / 1000; // tonnes
        const treesEquivalent = Math.round(co2Saved * 45); // 1 tonne CO₂ ≈ 45 trees

        return {
            monthlyUnits: Math.round(monthlyUnits),
            actualKw,
            yearlyGeneration: Math.round(yearlyGeneration),
            coveragePercent,
            systemCost,
            subsidy,
            netCost,
            yearlySavings: Math.round(yearlySavings),
            totalSavings25: Math.round(totalSavings25),
            paybackYears: payback,
            co2Saved: Math.round(co2Saved),
            treesEquivalent,
        };
    }, [monthlyBill, electricityRate, roofArea]);

    const handleQuoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!quoteForm.name || !quoteForm.phone) return;
        setQuoteSubmitting(true);
        setQuoteError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: quoteForm.name,
                    email: quoteForm.email,
                    phone: quoteForm.phone,
                    service: "Solar Quote from Calculator",
                    message: `Calculator results: ${results.actualKw} kW system, ₹${results.netCost.toLocaleString("en-IN")} net cost, ${results.paybackYears} year payback, monthly bill ₹${monthlyBill}`,
                }),
            });

            if (res.ok) {
                setQuoteSuccess(true);
            } else {
                const data = await res.json();
                setQuoteError(data.error || "Something went wrong");
            }
        } catch {
            setQuoteError("Network error. Please try again.");
        } finally {
            setQuoteSubmitting(false);
        }
    };

    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-12 bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-6 md:px-10"
                >
                    <motion.div variants={fadeInUp} className="max-w-3xl">
                        <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                            Solar Savings Calculator
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            How Much Can{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                You Save?
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            Enter your electricity details below and see your estimated savings including
                            government subsidy under PM Surya Ghar Yojana.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Calculator */}
            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Inputs */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-2 space-y-6"
                        >
                            <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                                <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-green-600" />
                                    Your Electricity Details
                                </h3>

                                {/* Monthly Bill */}
                                <div className="mb-6">
                                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                        <span>Monthly Electricity Bill</span>
                                        <span className="text-green-600 font-bold">₹{monthlyBill.toLocaleString("en-IN")}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={500}
                                        max={25000}
                                        step={100}
                                        value={monthlyBill}
                                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                                        className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer accent-green-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>₹500</span>
                                        <span>₹25,000</span>
                                    </div>
                                </div>

                                {/* Electricity Rate */}
                                <div className="mb-6">
                                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                        <span>Per Unit Rate</span>
                                        <span className="text-green-600 font-bold">₹{electricityRate}/unit</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={3}
                                        max={15}
                                        step={0.5}
                                        value={electricityRate}
                                        onChange={(e) => setElectricityRate(Number(e.target.value))}
                                        className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer accent-green-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>₹3</span>
                                        <span>₹15</span>
                                    </div>
                                </div>

                                {/* Roof Area */}
                                <div>
                                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                        <span>Available Roof Area</span>
                                        <span className="text-green-600 font-bold">{roofArea} sq ft</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={100}
                                        max={2000}
                                        step={50}
                                        value={roofArea}
                                        onChange={(e) => setRoofArea(Number(e.target.value))}
                                        className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer accent-green-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>100 sq ft</span>
                                        <span>2000 sq ft</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex items-start gap-3 bg-green-50 rounded-2xl p-5 border border-green-100">
                                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-600">
                                    Estimates are based on average Indian solar irradiation of ~4.5 kWh/m²/day
                                    and include PM Surya Ghar subsidy (for systems up to 10 kW).
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-3 space-y-6"
                        >
                            {/* Recommended System */}
                            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sun className="w-5 h-5 text-green-200" />
                                    <span className="text-green-200 text-sm font-semibold uppercase tracking-wider">
                                        Recommended System
                                    </span>
                                </div>
                                <div className="text-5xl md:text-6xl font-bold mb-1">
                                    {results.actualKw} kW
                                </div>
                                <p className="text-white/70 text-sm">
                                    Solar rooftop system covering {results.coveragePercent}% of your electricity needs
                                </p>
                            </motion.div>

                            {/* Financial Summary */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                                        <IndianRupee className="w-4 h-4" />
                                        System Cost
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.systemCost)}</div>
                                    <div className="text-green-600 text-sm font-semibold mt-1">
                                        - {formatCurrency(results.subsidy)} subsidy
                                    </div>
                                    <div className="border-t border-gray-100 mt-3 pt-3">
                                        <span className="text-xs text-gray-400">Your Investment</span>
                                        <div className="text-xl font-bold text-green-700">{formatCurrency(results.netCost)}</div>
                                    </div>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                                        <TrendingDown className="w-4 h-4" />
                                        Yearly Savings
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.yearlySavings)}</div>
                                    <div className="text-green-600 text-sm font-semibold mt-1">
                                        ≈ {formatCurrency(Math.round(results.yearlySavings / 12))}/month
                                    </div>
                                    <div className="border-t border-gray-100 mt-3 pt-3">
                                        <span className="text-xs text-gray-400">25-Year Total Savings</span>
                                        <div className="text-xl font-bold text-green-700">{formatCurrency(results.totalSavings25)}</div>
                                    </div>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                                        <Calendar className="w-4 h-4" />
                                        Payback Period
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{results.paybackYears} Years</div>
                                    <p className="text-sm text-gray-500 mt-1">Free electricity after payback</p>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                                        <Leaf className="w-4 h-4" />
                                        CO₂ Offset (25 yrs)
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{results.co2Saved} Tonnes</div>
                                    <p className="text-sm text-gray-500 mt-1">≈ {results.treesEquivalent.toLocaleString("en-IN")} trees planted</p>
                                </motion.div>
                            </div>

                            {/* Generation Details */}
                            <motion.div variants={fadeInUp} className="bg-green-50/50 rounded-2xl border border-green-100 p-6">
                                <h4 className="font-bold text-gray-900 mb-4">Generation Details</h4>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Monthly Usage</div>
                                        <div className="text-lg font-bold text-gray-900">{results.monthlyUnits} units</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Annual Generation</div>
                                        <div className="text-lg font-bold text-green-700">{results.yearlyGeneration.toLocaleString("en-IN")} units</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Coverage</div>
                                        <div className="text-lg font-bold text-green-700">{results.coveragePercent}%</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => {
                                        setShowQuoteModal(true);
                                        setQuoteSuccess(false);
                                        setQuoteError("");
                                    }}
                                    className="px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-md shadow-green-600/25 cursor-pointer"
                                >
                                    🎯 Get Personalized Quote <ArrowRight className="w-4 h-4" />
                                </button>
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-md shadow-green-600/25"
                                >
                                    Get Free Site Assessment <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/schemes"
                                    className="px-8 py-4 border-2 border-green-200 text-green-700 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 text-sm"
                                >
                                    View Govt Schemes
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quote Modal */}
            <AnimatePresence>
                {showQuoteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setShowQuoteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 relative">
                                <button
                                    onClick={() => setShowQuoteModal(false)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                                <h3 className="text-white text-xl font-bold">Get Your Personalized Quote</h3>
                                <p className="text-white/70 text-sm mt-1">
                                    Based on your {results.actualKw} kW system calculation
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <div className="bg-white/15 rounded-xl px-3 py-2">
                                        <div className="text-white/60 text-[10px] uppercase tracking-wider">Net Cost</div>
                                        <div className="text-white font-bold text-sm">{formatCurrency(results.netCost)}</div>
                                    </div>
                                    <div className="bg-white/15 rounded-xl px-3 py-2">
                                        <div className="text-white/60 text-[10px] uppercase tracking-wider">Monthly Savings</div>
                                        <div className="text-white font-bold text-sm">{formatCurrency(Math.round(results.yearlySavings / 12))}</div>
                                    </div>
                                    <div className="bg-white/15 rounded-xl px-3 py-2">
                                        <div className="text-white/60 text-[10px] uppercase tracking-wider">Payback</div>
                                        <div className="text-white font-bold text-sm">{results.paybackYears} yrs</div>
                                    </div>
                                </div>
                            </div>

                            {/* Form or Success */}
                            <div className="p-6">
                                {quoteSuccess ? (
                                    <div className="text-center py-6">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Quote Requested! 🎉</h4>
                                        <p className="text-gray-500 text-sm">
                                            Our solar expert will call you within 2 hours with a personalized quote for your {results.actualKw} kW system.
                                        </p>
                                        <button
                                            onClick={() => setShowQuoteModal(false)}
                                            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-semibold text-sm hover:bg-green-700 transition-colors"
                                        >
                                            Done
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={quoteForm.name}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                                                placeholder="Enter your full name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={quoteForm.phone}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Email (optional)</label>
                                            <input
                                                type="email"
                                                value={quoteForm.email}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            />
                                        </div>

                                        {quoteError && (
                                            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{quoteError}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={quoteSubmitting}
                                            className="w-full py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-600/20"
                                        >
                                            {quoteSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Get My Personalized Quote
                                                </>
                                            )}
                                        </button>

                                        <p className="text-gray-400 text-xs text-center">
                                            🔒 Your information is secure and will not be shared.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <FAQSection />

            <Footer />
        </main>
    );
}
