"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        q: "How much does solar panel installation cost?",
        a: "For residential systems, the cost ranges from ₹45,000 to ₹60,000 per kW (before subsidy). A typical 3 kW system costs around ₹1.5–1.8 Lakh, but with PM Surya Ghar subsidy (₹78,000), your net cost could be as low as ₹72,000–1 Lakh.",
    },
    {
        q: "How long does the installation take?",
        a: "The physical installation takes 3–5 days. However, the complete process — including site survey, design, permissions, installation, and net metering — typically takes 2–4 weeks. We handle all the paperwork for you.",
    },
    {
        q: "Who handles the subsidy application process?",
        a: "We handle everything! Our team manages the entire PM Surya Ghar subsidy process — from application to documentation to follow-up. The subsidy amount (up to ₹78,000) gets credited directly to your bank account within 30–60 days after installation.",
    },
    {
        q: "What happens on cloudy or rainy days?",
        a: "Solar panels still generate electricity on cloudy days, just at reduced efficiency (about 25–40% of peak output). With net metering, excess power generated on sunny days gets exported to the grid, earning you credits that offset cloudy day consumption.",
    },
    {
        q: "What is the warranty period?",
        a: "We provide 25-year performance warranty on solar panels (guaranteeing at least 80% output after 25 years), 10-year product warranty, and 5-year warranty on inverters. We also offer Annual Maintenance Contracts (AMC) for continued support.",
    },
    {
        q: "Does solar work for apartments and multi-story buildings?",
        a: "Yes! For apartment societies, we install shared solar systems on the terrace. Individual apartment owners can also install small systems (1–2 kW) using their allotted terrace space. We've done many apartment installations across Bihar.",
    },
    {
        q: "How much electricity bill savings can I expect?",
        a: "A well-sized system can reduce your bill by 70–90%. For example, a ₹3,000/month bill can drop to ₹300–500/month. Use our Solar Calculator to get personalized savings estimates based on your exact usage.",
    },
    {
        q: "Do I need to clean the solar panels regularly?",
        a: "Light cleaning every 2–3 months is recommended. Rain water naturally cleans the panels, but dust accumulation in dry months can reduce efficiency by 5–10%. We offer optional O&M (Operations & Maintenance) packages that include regular cleaning.",
    },
];

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
    return (
        <motion.div
            variants={fadeInUp}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-green-200 bg-green-50/30 shadow-sm" : "border-gray-100 bg-white hover:border-green-100"
                }`}
        >
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
            >
                <span className={`text-sm font-semibold ${isOpen ? "text-green-700" : "text-gray-800"}`}>
                    {q}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? "text-green-600" : "text-gray-400"}`} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-gray-50/50">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Got Questions?
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Frequently Asked <span className="text-green-600">Questions</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        Everything you need to know about going solar. Can&apos;t find your answer? WhatsApp us!
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            q={faq.q}
                            a={faq.a}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>

                <motion.div variants={fadeInUp} className="text-center mt-10">
                    <div className="inline-flex items-center gap-2 bg-white border border-green-100 rounded-full px-5 py-3 text-sm text-gray-600 shadow-sm">
                        <HelpCircle className="w-4 h-4 text-green-500" />
                        Still have questions?{" "}
                        <a href="https://wa.me/919876543210" className="text-green-600 font-semibold hover:underline">
                            Chat with us
                        </a>
                    </div>
                </motion.div>
            </SectionWrapper>
        </section>
    );
}
