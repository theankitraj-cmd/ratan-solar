"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    LogOut,
    Sun,
    Lock,
    Eye,
    EyeOff,
    Mail,
    Shield,
    Menu,
    X,
    FileText,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/auth-provider";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads", icon: Users },
    { href: "/admin/billing", label: "Billing", icon: FileText },
];

function AdminContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading, user, useSupabaseAuth, signIn, signOut } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showEmailLogin, setShowEmailLogin] = useState(false);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Login gate
    if (!isAuthenticated) {
        const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setSubmitting(true);
            setError("");

            const { error: authError } = showEmailLogin
                ? await signIn(email, password)
                : await signIn(password);

            if (authError) setError(authError);
            setSubmitting(false);
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                            <Sun className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Ratan Solar Admin</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Enter admin password to continue
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                        {/* Email field (only when toggled) */}
                        {showEmailLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@ratansolar.com"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        )}

                        {/* Password field */}
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                <Lock className="w-4 h-4 inline mr-2" />
                                {useSupabaseAuth ? "Password" : "Admin Password"}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    autoFocus
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-6">
                        <Link href="/" className="hover:text-gray-400 transition-colors">← Back to Website</Link>
                    </p>
                </div>
            </div>
        );
    }

    // Sidebar content (shared between mobile overlay and desktop)
    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-gray-800">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Sun className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm">Ratan Solar</h2>
                        <p className="text-gray-500 text-xs">Admin Panel</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-green-600/10 text-green-400 border border-green-600/20"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User info + Logout */}
            <div className="p-4 border-t border-gray-800">
                {user && (
                    <div className="px-4 py-2 mb-2">
                        <p className="text-gray-500 text-xs">Signed in as</p>
                        <p className="text-gray-300 text-xs font-medium truncate">{user.email}</p>
                    </div>
                )}
                <button
                    onClick={signOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </>
    );

    // Authenticated admin layout
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row">
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-gray-800 sticky top-0 z-40 backdrop-blur-sm">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Sun className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold text-sm">Ratan Solar</span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="absolute left-0 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-800 flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-end p-3">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-gray-900/50 border-r border-gray-800 flex-col min-h-screen">
                <SidebarContent />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="p-4 md:p-8">{children}</div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminContent>{children}</AdminContent>
        </AuthProvider>
    );
}
