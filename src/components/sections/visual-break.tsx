"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { premiumEase } from "@/lib/animations";

export function VisualBreakSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={ref} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            {/* Parallax Image */}
            <motion.div style={{ y }} className="absolute inset-[-15%] w-full h-[130%]">
                <Image
                    src="/rooftop-solar.png"
                    alt="Solar panels on Indian rooftops"
                    fill
                    className="object-cover"
                />
            </motion.div>

            {/* Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-900/40 to-green-900/70" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "4rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: premiumEase }}
                    className="h-[2px] bg-gradient-to-r from-green-400 to-transparent mb-6"
                />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 max-w-3xl">
                    Lighting the Path{" "}
                    <span className="text-green-300 italic">to Sustainability</span>
                </h2>
                <p className="text-white/70 text-base md:text-lg max-w-xl font-light">
                    Every rooftop we transform is a step towards India&apos;s clean energy independence.
                    Join the solar revolution today.
                </p>
            </div>

            {/* Bottom gradient fade */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: premiumEase }}
            />
        </section>
    );
}
