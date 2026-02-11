"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Rajesh Kumar",
        location: "Patna, Bihar",
        system: "3 kW Rooftop",
        rating: 5,
        text: "Ratan Solar ne humara pura process handle kiya — subsidy se lekar installation tak. Ab bijli ka bill almost zero aa raha hai. Best decision ever!",
        savings: "₹2,400/month saved",
    },
    {
        name: "Priya Singh",
        location: "Gaya, Bihar",
        system: "5 kW Rooftop",
        rating: 5,
        text: "PM Surya Ghar scheme ka full benefit mila. ₹78,000 subsidy directly bank account mein aaya. Installation bhi sirf 5 din mein complete ho gaya.",
        savings: "₹4,200/month saved",
    },
    {
        name: "Amit Enterprises",
        location: "Muzaffarpur, Bihar",
        system: "10 kW Commercial",
        rating: 5,
        text: "Our factory electricity bill dropped from ₹45,000 to ₹8,000 per month! The ROI has been incredible. Ratan Solar team is very professional and responsive.",
        savings: "₹37,000/month saved",
    },
    {
        name: "Dr. Sunita Devi",
        location: "Bhagalpur, Bihar",
        system: "2 kW Rooftop",
        rating: 5,
        text: "Being a senior citizen, I was worried about the process. But the team made it so simple. Free site visit, paperwork handled, and now I get almost free electricity!",
        savings: "₹1,800/month saved",
    },
];

export function TestimonialsSection() {
    return (
        <section className="bg-green-50/30">
            <SectionWrapper>
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Customer Stories
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        What Our <span className="text-green-600">Customers Say</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto font-light">
                        Real stories from real customers who made the switch to solar with Ratan Solar.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-3xl border border-green-100 p-8 shadow-sm hover:shadow-lg hover:shadow-green-600/5 transition-all duration-500 relative"
                        >
                            {/* Quote icon */}
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-green-100" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Savings Badge */}
                            <div className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-4">
                                {t.savings}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                    <p className="text-gray-400 text-xs">{t.location} · {t.system}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
