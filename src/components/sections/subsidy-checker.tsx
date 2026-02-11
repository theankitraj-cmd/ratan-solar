"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeInUp } from "@/lib/animations";
import {
    MapPin, Home, Zap, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, IndianRupee,
} from "lucide-react";

const states = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
    "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand",
    "West Bengal",
];

interface Result {
    subsidy: string;
    systemSize: string;
    totalCost: string;
    afterSubsidy: string;
    monthlySavings: string;
}

function getResult(state: string, ownership: string, connection: string): Result | null {
    if (ownership === "rented" || connection === "no") {
        return null;
    }
    // Simplified subsidy calculation based on PM Surya Ghar norms
    const highSubsidy = ["Bihar", "Jharkhand", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Chhattisgarh", "Odisha", "Assam"];
    const isHigh = highSubsidy.includes(state);
    return {
        subsidy: isHigh ? "₹78,000" : "₹60,000",
        systemSize: "3 kW Rooftop",
        totalCost: isHigh ? "₹1,89,000" : "₹2,10,000",
        afterSubsidy: isHigh ? "₹1,11,000" : "₹1,50,000",
        monthlySavings: isHigh ? "₹2,800" : "₹2,400",
    };
}

const steps = [
    { icon: MapPin, label: "Select State", desc: "Where is your property?" },
    { icon: Home, label: "Roof Ownership", desc: "Do you own your roof?" },
    { icon: Zap, label: "Grid Connection", desc: "Existing electricity connection?" },
];

export function SubsidyCheckerSection() {
    const [step, setStep] = useState(0);
    const [state, setState] = useState("");
    const [ownership, setOwnership] = useState("");
    const [connection, setConnection] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
        else setShowResult(true);
    };

    const handleBack = () => {
        if (showResult) { setShowResult(false); return; }
        if (step > 0) setStep(step - 1);
    };

    const reset = () => {
        setStep(0);
        setState("");
        setOwnership("");
        setConnection("");
        setShowResult(false);
    };

    const canProceed =
        (step === 0 && state) ||
        (step === 1 && ownership) ||
        (step === 2 && connection);

    const result = getResult(state, ownership, connection);

    return (
        <section className="bg-gradient-to-b from-white to-green-50/50 py-20 md:py-28">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Check Eligibility
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Are You Eligible for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                            Solar Subsidy?
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        Answer 3 simple questions to find out your subsidy amount under PM Surya Ghar Yojana.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-10">
                    {steps.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${i < step || showResult
                                    ? "bg-green-500 text-white"
                                    : i === step && !showResult
                                        ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                                        : "bg-gray-100 text-gray-400"
                                }`}>
                                {i < step || showResult ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                            </div>
                            <span className="hidden sm:block text-xs font-medium text-gray-500">{s.label}</span>
                            {i < 2 && <div className={`w-8 sm:w-16 h-[2px] transition-colors duration-500 ${i < step || showResult ? "bg-green-400" : "bg-gray-200"
                                }`} />}
                        </div>
                    ))}
                </motion.div>

                {/* Question Card */}
                <motion.div variants={fadeInUp} className="max-w-lg mx-auto">
                    <div className="bg-white rounded-3xl border border-green-100 shadow-xl shadow-green-600/5 p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2" />

                        <AnimatePresence mode="wait">
                            {!showResult ? (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6`}>
                                        {step === 0 && <MapPin className="w-7 h-7 text-green-600" />}
                                        {step === 1 && <Home className="w-7 h-7 text-green-600" />}
                                        {step === 2 && <Zap className="w-7 h-7 text-green-600" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{steps[step].desc}</h3>

                                    {step === 0 && (
                                        <select
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className="w-full mt-4 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                                        >
                                            <option value="">Select your state...</option>
                                            {states.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    )}

                                    {step === 1 && (
                                        <div className="flex gap-3 mt-4">
                                            {[{ val: "owned", label: "Yes, I own it" }, { val: "rented", label: "No, it's rented" }].map((o) => (
                                                <button
                                                    key={o.val}
                                                    onClick={() => setOwnership(o.val)}
                                                    className={`flex-1 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${ownership === o.val
                                                            ? "border-green-500 bg-green-50 text-green-700"
                                                            : "border-gray-200 text-gray-600 hover:border-green-300"
                                                        }`}
                                                >
                                                    {o.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="flex gap-3 mt-4">
                                            {[{ val: "yes", label: "Yes" }, { val: "no", label: "No" }].map((o) => (
                                                <button
                                                    key={o.val}
                                                    onClick={() => setConnection(o.val)}
                                                    className={`flex-1 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${connection === o.val
                                                            ? "border-green-500 bg-green-50 text-green-700"
                                                            : "border-gray-200 text-gray-600 hover:border-green-300"
                                                        }`}
                                                >
                                                    {o.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative z-10 text-center"
                                >
                                    {result ? (
                                        <>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                                            >
                                                <Sparkles className="w-10 h-10 text-green-600" />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                🎉 You&apos;re Eligible!
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-6">
                                                Based on your inputs, here&apos;s your estimated subsidy:
                                            </p>
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-100">
                                                <div className="flex items-center justify-center gap-2 mb-4">
                                                    <IndianRupee className="w-8 h-8 text-green-600" />
                                                    <span className="text-4xl font-bold text-green-700">{result.subsidy}</span>
                                                </div>
                                                <p className="text-green-600 text-sm font-semibold">Government Subsidy</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-left">
                                                {[
                                                    { label: "System Size", value: result.systemSize },
                                                    { label: "Total Cost", value: result.totalCost },
                                                    { label: "After Subsidy", value: result.afterSubsidy },
                                                    { label: "Monthly Savings", value: result.monthlySavings },
                                                ].map((item) => (
                                                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                                                        <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                                                        <p className="text-sm font-bold text-gray-800">{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                                                <Home className="w-10 h-10 text-orange-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                Not Eligible Yet
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-4">
                                                The PM Surya Ghar scheme requires roof ownership and an existing grid connection.
                                                Contact us to explore other solar options!
                                            </p>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="relative z-10 flex justify-between mt-8">
                            <button
                                onClick={step === 0 && !showResult ? reset : handleBack}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${step === 0 && !showResult
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                disabled={step === 0 && !showResult}
                            >
                                <span className="flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</span>
                            </button>
                            {!showResult ? (
                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed}
                                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1 ${canProceed
                                            ? "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/25"
                                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    {step === 2 ? "Check Result" : "Next"} <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={reset}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/25 transition-all"
                                >
                                    Check Again
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </SectionWrapper>
        </section>
    );
}
