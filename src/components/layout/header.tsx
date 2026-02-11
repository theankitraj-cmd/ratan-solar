"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-provider";
import { logoBlur } from "@/lib/blur-data";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Schemes", href: "/schemes" },
    { label: "Gallery", href: "/gallery" },
    { label: "Refer & Earn", href: "/referral" },
    { label: "Calculator", href: "/calculator" },
    { label: "Contact", href: "/contact" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-green-900/5 border-b border-green-100"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-green-500/20 shadow-md shadow-green-600/10 group-hover:ring-green-500/40 transition-all duration-300">
                        <Image src="/logo.jpg" alt="Ratan Solar" fill className="object-cover" placeholder="blur" blurDataURL={logoBlur} />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[1.35rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600 tracking-tight group-hover:from-green-700 group-hover:to-emerald-500 transition-all duration-300">
                            Ratan
                        </span>
                        <span className="text-[0.7rem] font-semibold text-green-600/70 tracking-[0.25em] uppercase">
                            Solar
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === link.href
                                ? "bg-green-50 text-green-700"
                                : "text-gray-600 hover:text-green-700 hover:bg-green-50/50"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="ml-2 p-2.5 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30 transition-all duration-300"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <Link
                        href="/contact"
                        className="ml-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/30"
                    >
                        Get Quote
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden p-2 rounded-xl text-green-800 hover:bg-green-50 transition-colors"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-green-100 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === link.href
                                        ? "bg-green-50 text-green-700"
                                        : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex items-center gap-3 mt-3">
                                <button
                                    onClick={toggleTheme}
                                    className="flex-shrink-0 p-3 rounded-xl text-gray-500 hover:text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors border border-gray-200 dark:border-green-800"
                                    aria-label="Toggle dark mode"
                                >
                                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 block px-4 py-3 bg-green-600 text-white text-center text-sm font-semibold rounded-xl"
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
