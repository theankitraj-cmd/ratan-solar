import Link from "next/link";
import { Sun, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* Animated Sun */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 bg-yellow-200/30 rounded-full animate-pulse" />
                    <div className="absolute inset-4 bg-yellow-100/50 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sun className="w-16 h-16 text-yellow-500" style={{ animation: "spin 8s linear infinite" }} />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="font-serif text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-4">
                    404
                </h1>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    This page went{" "}
                    <span className="text-green-600 italic">off-grid!</span> ☀️
                </h2>
                <p className="text-gray-500 text-base mb-8 font-light">
                    Looks like the page you&apos;re looking for has been absorbed by the sun.
                    Don&apos;t worry, let&apos;s get you back on track!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg shadow-green-600/25 transition-all text-sm flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 border-2 border-green-600 text-green-700 rounded-full hover:bg-green-50 transition-all text-sm font-semibold flex items-center gap-2"
                    >
                        Contact Us
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                    <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                        <Search className="w-4 h-4 text-green-500" />
                        Perhaps you were looking for:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { label: "Solar Calculator", href: "/calculator" },
                            { label: "Govt Schemes", href: "/schemes" },
                            { label: "Our Services", href: "/services" },
                            { label: "About Us", href: "/about" },
                            { label: "Gallery", href: "/gallery" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 bg-green-50 text-green-700 text-xs font-semibold rounded-full hover:bg-green-100 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
