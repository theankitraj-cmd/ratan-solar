"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { StatCard } from "@/components/ui/card";
import { fadeInUp } from "@/lib/animations";

const stats = [
    { value: "500", suffix: "+", label: "MW Installed" },
    { value: "12", suffix: "K+", label: "Happy Customers" },
    { value: "200", suffix: "+", label: "Cities Powered" },
    { value: "99.8", suffix: "%", label: "System Uptime" },
];

export function StatsSection() {
    return (
        <section className="bg-green-50/50">
            <SectionWrapper id="stats">
                <motion.div variants={fadeInUp} className="text-center mb-14">
                    <span className="text-green-600 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                        Impact at Scale
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Numbers That{" "}
                        <span className="text-green-600">Speak</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <motion.div key={stat.label} variants={fadeInUp}>
                            <StatCard {...stat} />
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
