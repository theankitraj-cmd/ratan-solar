"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Users,
    Search,
    Trash2,
    Phone,
    Mail,
    Calendar,
    MessageSquare,
    Save,
    X,
    ChevronLeft,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { statusColors, statusLabels, sourceLabels } from "@/lib/types";

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [notes, setNotes] = useState("");

    const fetchLeads = useCallback(async () => {
        try {
            const res = await fetch("/api/leads?limit=200");
            const data = await res.json();
            setLeads(data.leads || []);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchLeads(); }, [fetchLeads]);

    const handleStatusUpdate = async (id: string, status: LeadStatus) => {
        await fetch("/api/leads", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
        if (selectedLead?.id === id) setSelectedLead((p) => p ? { ...p, status } : null);
    };

    const handleSaveNotes = async () => {
        if (!selectedLead) return;
        await fetch("/api/leads", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selectedLead.id, notes }),
        });
        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes } : l)));
        setSelectedLead((p) => p ? { ...p, notes } : null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
    };

    const filtered = leads.filter(
        (l) =>
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.email.toLowerCase().includes(search.toLowerCase()) ||
            l.phone.includes(search)
    );

    // Lead Detail Panel content (shared between desktop sidebar and mobile drawer)
    const LeadDetailContent = ({ lead }: { lead: Lead }) => (
        <>
            {/* Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                        {lead.name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h4 className="text-white font-semibold">{lead.name}</h4>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                        {sourceLabels[lead.source]}
                    </span>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href={`tel:${lead.phone}`} className="text-green-400 hover:underline">
                        {lead.phone}
                    </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300">{lead.email || "—"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300">
                        {new Date(lead.created_at).toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {/* Message */}
            {lead.message && (
                <div className="mb-6">
                    <label className="text-gray-400 text-xs font-medium block mb-2">
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        Message
                    </label>
                    <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded-xl">
                        {lead.message}
                    </p>
                </div>
            )}

            {/* Referral Info */}
            {lead.referred_name && (
                <div className="mb-6 bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                    <p className="text-purple-300 text-xs font-medium mb-2">Referred Person</p>
                    <p className="text-white text-sm font-medium">{lead.referred_name}</p>
                    <p className="text-gray-400 text-xs">{lead.referred_phone}</p>
                    {lead.referred_email && (
                        <p className="text-gray-400 text-xs">{lead.referred_email}</p>
                    )}
                </div>
            )}

            {/* Status Update */}
            <div className="mb-6">
                <label className="text-gray-400 text-xs font-medium block mb-2">
                    Status
                </label>
                <select
                    value={lead.status}
                    onChange={(e) => handleStatusUpdate(lead.id, e.target.value as LeadStatus)}
                    className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                </select>
            </div>

            {/* Notes */}
            <div className="mb-6">
                <label className="text-gray-400 text-xs font-medium block mb-2">
                    Notes
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this lead..."
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500 resize-none"
                />
                <button
                    onClick={handleSaveNotes}
                    className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-500 transition-colors"
                >
                    <Save className="w-3 h-3" />
                    Save Notes
                </button>
            </div>

            {/* Delete */}
            <button
                onClick={() => handleDelete(lead.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition-colors w-full justify-center"
            >
                <Trash2 className="w-4 h-4" />
                Delete Lead
            </button>
        </>
    );

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white">All Leads</h1>
                    <p className="text-gray-400 text-sm mt-1">{leads.length} total leads</p>
                </div>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search name, email, phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-72"
                    />
                </div>
            </div>

            <div className="flex gap-6">
                {/* Lead List */}
                <div className="flex-1 space-y-2">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">
                            <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
                            Loading...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
                            <p>No leads found</p>
                        </div>
                    ) : (
                        filtered.map((lead) => (
                            <button
                                key={lead.id}
                                onClick={() => {
                                    setSelectedLead(lead);
                                    setNotes(lead.notes || "");
                                }}
                                className={`w-full text-left bg-gray-900/60 border rounded-xl p-4 transition-all duration-200 hover:border-gray-600 ${selectedLead?.id === lead.id
                                    ? "border-green-600/50 bg-green-600/5"
                                    : "border-gray-800"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
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
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[lead.status]}`}>
                                            {statusLabels[lead.status]}
                                        </span>
                                        <span className="text-gray-600 text-xs hidden sm:inline">
                                            {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Lead Detail Panel — Desktop only */}
                {selectedLead && (
                    <div className="hidden md:block w-96 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sticky top-8 h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-bold">Lead Details</h3>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="text-gray-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <LeadDetailContent lead={selectedLead} />
                    </div>
                )}
            </div>

            {/* Lead Detail Drawer — Mobile only (full-screen overlay) */}
            {selectedLead && (
                <div className="md:hidden fixed inset-0 z-50 bg-gray-950">
                    {/* Drawer Header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
                        <button
                            onClick={() => setSelectedLead(null)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-white font-bold text-sm">Lead Details</h3>
                    </div>
                    {/* Drawer Body */}
                    <div className="p-4 overflow-auto" style={{ maxHeight: "calc(100vh - 56px)" }}>
                        <LeadDetailContent lead={selectedLead} />
                    </div>
                </div>
            )}
        </div>
    );
}
