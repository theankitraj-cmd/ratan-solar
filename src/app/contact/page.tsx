"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        service: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setSubmitted(true);
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: MapPin, label: "Address", value: "Ratan Solar Pvt. Ltd.\nBihar, India" },
        { icon: Phone, label: "Phone", value: "+91 98765 43210" },
        { icon: Mail, label: "Email", value: "info@ratansolar.com" },
        { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9am – 6pm" },
    ];

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
                            Contact Us
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Let&apos;s Build Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                Solar Future
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            Get a free consultation and site assessment. Our solar experts are ready to
                            help you switch to clean, affordable energy.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section className="bg-white py-12 pb-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-2 space-y-6"
                        >
                            {contactInfo.map((info) => (
                                <motion.div
                                    key={info.label}
                                    variants={fadeInUp}
                                    className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                                        <info.icon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{info.label}</h4>
                                        <p className="text-gray-500 text-sm whitespace-pre-line">{info.value}</p>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                                <h3 className="font-bold text-lg mb-3">Why Choose Ratan Solar?</h3>
                                <ul className="space-y-3">
                                    {["Free site assessment", "Government subsidy assistance", "25-year warranty", "24/7 monitoring support", "12,000+ happy customers"].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                                            <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-3"
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-50 rounded-3xl border border-green-200 p-12 text-center"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                                        Thank You!
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        We&apos;ve received your inquiry. Our solar expert will contact you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setFormState({ name: "", phone: "", email: "", city: "", service: "", message: "" }); }}
                                        className="text-green-600 font-semibold text-sm hover:underline"
                                    >
                                        Submit another inquiry
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    variants={fadeInUp}
                                    onSubmit={handleSubmit}
                                    className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm"
                                >
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">
                                        Get a Free Quote
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                placeholder="Your name"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formState.phone}
                                                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                                            <input
                                                type="email"
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">City *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.city}
                                                onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                                                placeholder="e.g. Patna"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Interested In</label>
                                        <select
                                            value={formState.service}
                                            onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="residential">Residential Rooftop Solar</option>
                                            <option value="commercial">Commercial Solar</option>
                                            <option value="industrial">Industrial / Ground-mount</option>
                                            <option value="oam">O&M Services</option>
                                            <option value="subsidy">Subsidy Assistance</option>
                                        </select>
                                    </div>

                                    <div className="mb-8">
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                                        <textarea
                                            rows={4}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            placeholder="Tell us about your requirements..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-md shadow-green-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Inquiry
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Google Maps */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 text-center">
                            Visit Our Office
                        </h3>
                        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-[350px] md:h-[400px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115135.38725446849!2d85.0502843!3d25.5940947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1707000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ratan Solar Office Location"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
