"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { logoBlur } from "@/lib/blur-data";

const footerLinks = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Solutions",
        links: [
            { label: "Rooftop Solar", href: "/services" },
            { label: "Solar Farms", href: "/services" },
            { label: "Energy Storage", href: "/services" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Govt Schemes", href: "/schemes" },
            { label: "Savings Calculator", href: "/calculator" },
            { label: "Gallery", href: "/gallery" },
            { label: "Referral Program", href: "/referral" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 md:px-10"
            >
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
                    {/* Brand */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-5">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image src="/logo.jpg" alt="Ratan Solar" fill className="object-cover" placeholder="blur" blurDataURL={logoBlur} />
                            </div>
                            <span className="text-xl font-bold text-white">Ratan Solar</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                            India&apos;s trusted solar energy partner. Powering homes, businesses,
                            and industries with clean, sustainable solar solutions.
                        </p>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-400" />
                                <span>Bihar, India</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-400" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-green-400" />
                                <span>info@ratansolar.com</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Link Columns */}
                    {footerLinks.map((group) => (
                        <motion.div key={group.title} variants={fadeInUp}>
                            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                {group.title}
                            </h4>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-1 group"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={fadeInUp}
                    className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-500 text-xs">
                        © 2026 Ratan Solar. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>🌱 Committed to a greener India</span>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
