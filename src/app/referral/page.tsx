"use client";

import { motion } from "framer-motion";
import { Users, Gift, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";

export default function ReferralPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        referrerName: "",
        referrerEmail: "",
        referrerPhone: "",
        friendName: "",
        friendPhone: "",
        friendCity: "",
        friendRelation: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/referral", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setIsSuccess(true);
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            <Header />
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-green-50 py-20 lg:py-32">
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                            Refer & Earn Program
                        </span>
                        <h1 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-6xl">
                            Share the Sun, <span className="text-green-600">Earn ₹5,000</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                            Help your friends and family switch to solar energy. When they install a system via your referral, you get a cash reward!
                        </p>
                    </motion.div>
                </div>
                {/* Background Decorative Pattern */}
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(#22c55e 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
            </section>

            {/* How it Works */}
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                        How It <span className="text-green-600">Works</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Users, title: "Refer a Friend", desc: "Fill in your friend's details using the form below." },
                        { icon: Gift, title: "They Go Solar", desc: "Our team contacts them and helps with the installation." },
                        { icon: CheckCircle, title: "You Earn ₹5,000", desc: "Once installed, you receive your referral reward!" },
                    ].map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="text-center p-6 rounded-2xl bg-green-50/50 border border-green-100"
                        >
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                <step.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Referral Form */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl md:p-12">
                        <div className="mb-10 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">Start Referring Now</h2>
                            <p className="text-gray-600">It only takes a minute to help someone go green.</p>
                        </div>

                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <CheckCircle className="h-10 w-10" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900">Referral Submitted!</h3>
                                <p className="text-gray-600">
                                    Thank you for referring. We&apos;ll be in touch with your friend shortly.
                                </p>
                                <Button
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setForm({ referrerName: "", referrerEmail: "", referrerPhone: "", friendName: "", friendPhone: "", friendCity: "", friendRelation: "" });
                                    }}
                                    className="mt-8 bg-green-600 hover:bg-green-700"
                                >
                                    Refer Another Friend
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Referrer Details */}
                                <div>
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">1</span>
                                        Your Details
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Input required placeholder="Your Name" value={form.referrerName} onChange={(e) => setForm({ ...form, referrerName: e.target.value })} />
                                        <Input required type="email" placeholder="Your Email" value={form.referrerEmail} onChange={(e) => setForm({ ...form, referrerEmail: e.target.value })} />
                                        <Input required type="tel" placeholder="Your Phone Number" value={form.referrerPhone} onChange={(e) => setForm({ ...form, referrerPhone: e.target.value })} />
                                    </div>
                                </div>

                                {/* Referee Details */}
                                <div>
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">2</span>
                                        Friend&apos;s Details
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Input required placeholder="Friend's Name" value={form.friendName} onChange={(e) => setForm({ ...form, friendName: e.target.value })} />
                                        <Input required type="tel" placeholder="Friend's Phone Number" value={form.friendPhone} onChange={(e) => setForm({ ...form, friendPhone: e.target.value })} />
                                        <Input required placeholder="City / Location" value={form.friendCity} onChange={(e) => setForm({ ...form, friendCity: e.target.value })} />
                                        <Input placeholder="Relationship (e.g. Neighbor, Colleague)" value={form.friendRelation} onChange={(e) => setForm({ ...form, friendRelation: e.target.value })} />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 py-6 text-lg font-bold hover:bg-green-700"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Referral"} <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                    <p className="mt-4 text-center text-xs text-gray-400">
                                        By submitting, you agree to our Referral Program Terms & Conditions.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
