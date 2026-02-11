"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Users,
    TrendingUp,
    UserCheck,
    IndianRupee,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Filter,
    RefreshCw,
    Download,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { statusColors, statusLabels, sourceLabels } from "@/lib/types";
import { LeadsChart } from "./components/leads-chart";

interface StatsCard {
    title: string;
    value: string | number;
    change: string;
    icon: React.ElementType;
    color: string;
    trend: "up" | "down";
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");
    const [refreshing, setRefreshing] = useState(false);

    const fetchLeads = useCallback(async () => {
        try {
            const res = await fetch("/api/leads");
            const data = await res.json();
            setLeads(data.leads || []);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchLeads();
    };

    const exportCSV = () => {
        if (leads.length === 0) return;
        const headers = ["Name", "Email", "Phone", "Source", "Status", "Message", "Date"];
        const rows = leads.map((l) => [
            l.name,
            l.email,
            l.phone,
            l.source,
            l.status,
            (l.message || "").replace(/[\n\r,]/g, " "),
            new Date(l.created_at).toLocaleDateString("en-IN"),
        ]);
        const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ratan-solar-leads-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleStatusUpdate = async (id: string, newStatus: LeadStatus) => {
        try {
            await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            setLeads((prev) =>
                prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
            );
        } catch (error) {
            console.error("Failed to update lead:", error);
        }
    };

    // Calculate stats
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const thisWeek = leads.filter((l) => new Date(l.created_at) > weekAgo).length;
    const thisMonth = leads.filter((l) => new Date(l.created_at) > monthAgo).length;
    const converted = leads.filter((l) => l.status === "converted").length;
    const conversionRate = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;
    const estimatedRevenue = converted * 150000; // Avg deal size ₹1.5L

    const stats: StatsCard[] = [
        {
            title: "Total Leads",
            value: leads.length,
            change: `${thisWeek} this week`,
            icon: Users,
            color: "from-blue-500 to-blue-600",
            trend: "up",
        },
        {
            title: "This Month",
            value: thisMonth,
            change: "Active leads",
            icon: TrendingUp,
            color: "from-green-500 to-emerald-600",
            trend: "up",
        },
        {
            title: "Conversion Rate",
            value: `${conversionRate}%`,
            change: `${converted} converted`,
            icon: UserCheck,
            color: "from-purple-500 to-purple-600",
            trend: conversionRate > 10 ? "up" : "down",
        },
        {
            title: "Est. Revenue",
            value: `₹${(estimatedRevenue / 100000).toFixed(1)}L`,
            change: "From converted leads",
            icon: IndianRupee,
            color: "from-amber-500 to-orange-600",
            trend: "up",
        },
    ];

    const filteredLeads =
        filter === "all"
            ? leads
            : leads.filter((l) => l.status === filter || l.source === filter);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Welcome back! Here&apos;s your lead overview.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={exportCSV}
                        disabled={leads.length === 0}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:bg-gray-750 transition-all text-xs md:text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export</span> CSV
                    </button>
                    <button
                        onClick={handleRefresh}
                        className={`flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:bg-gray-750 transition-all text-xs md:text-sm ${refreshing ? "animate-pulse" : ""
                            }`}
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                            >
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <span
                                className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                )}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        <p className="text-gray-500 text-xs mt-1">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Lead Activity Chart */}
            <div className="mb-8">
                <LeadsChart leads={leads} />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
                <Filter className="w-4 h-4 text-gray-500" />
                {["all", "new", "contacted", "qualified", "converted", "contact", "referral"].map(
                    (f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f
                                ? "bg-green-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    )
                )}
            </div>

            {/* Leads Table (Desktop) */}
            <div className="hidden md:block bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Source
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-500">
                                        <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
                                        Loading leads...
                                    </td>
                                </tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-500">
                                        <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                        <p>No leads found</p>
                                        <p className="text-xs mt-1">
                                            Leads will appear here when customers submit forms
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="text-white text-sm font-medium">
                                                    {lead.name}
                                                </p>
                                                {lead.referred_name && (
                                                    <p className="text-gray-500 text-xs mt-0.5">
                                                        → Referred: {lead.referred_name}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-gray-300 text-sm">{lead.phone}</p>
                                            <p className="text-gray-500 text-xs">{lead.email}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded-md">
                                                {sourceLabels[lead.source] || lead.source}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[lead.status]
                                                    }`}
                                            >
                                                {statusLabels[lead.status] || lead.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-400 text-xs flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(lead.created_at).toLocaleDateString(
                                                    "en-IN",
                                                    { day: "numeric", month: "short" }
                                                )}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={lead.status}
                                                onChange={(e) =>
                                                    handleStatusUpdate(
                                                        lead.id,
                                                        e.target.value as LeadStatus
                                                    )
                                                }
                                                className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:ring-green-500 focus:border-green-500"
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="qualified">Qualified</option>
                                                <option value="converted">Converted</option>
                                                <option value="lost">Lost</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Leads Cards (Mobile) */}
            <div className="md:hidden space-y-3">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
                        Loading leads...
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        <p>No leads found</p>
                    </div>
                ) : (
                    filteredLeads.map((lead) => (
                        <div
                            key={lead.id}
                            className="bg-gray-900/60 border border-gray-800 rounded-xl p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-bold text-gray-400">
                                            {lead.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{lead.name}</p>
                                        <p className="text-gray-500 text-xs">{lead.phone}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[lead.status]}`}>
                                    {statusLabels[lead.status]}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                                        {sourceLabels[lead.source] || lead.source}
                                    </span>
                                    <span className="text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                    </span>
                                </div>
                                <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusUpdate(lead.id, e.target.value as LeadStatus)}
                                    className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1 focus:ring-green-500"
                                >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="converted">Converted</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                            {lead.message && (
                                <p className="text-gray-400 text-xs mt-2 truncate">{lead.message}</p>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Quick Info */}
            <div className="mt-6 text-center">
                <p className="text-gray-600 text-xs">
                    Data refreshes automatically. Last updated:{" "}
                    {new Date().toLocaleTimeString("en-IN")}
                </p>
            </div>
        </div>
    );
}
