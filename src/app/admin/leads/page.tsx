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

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">All Leads</h1>
                    <p className="text-gray-400 text-sm mt-1">{leads.length} total leads</p>
                </div>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search name, email, phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-72"
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
                                        <span className="text-gray-600 text-xs">
                                            {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Lead Detail Panel */}
                {selectedLead && (
                    <div className="w-96 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sticky top-8 h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-bold">Lead Details</h3>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="text-gray-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Avatar & Name */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                <span className="text-xl font-bold text-white">
                                    {selectedLead.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">{selectedLead.name}</h4>
                                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                                    {sourceLabels[selectedLead.source]}
                                </span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <a href={`tel:${selectedLead.phone}`} className="text-green-400 hover:underline">
                                    {selectedLead.phone}
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-300">{selectedLead.email || "—"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-300">
                                    {new Date(selectedLead.created_at).toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        {/* Message */}
                        {selectedLead.message && (
                            <div className="mb-6">
                                <label className="text-gray-400 text-xs font-medium block mb-2">
                                    <MessageSquare className="w-3 h-3 inline mr-1" />
                                    Message
                                </label>
                                <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded-xl">
                                    {selectedLead.message}
                                </p>
                            </div>
                        )}

                        {/* Referral Info */}
                        {selectedLead.referred_name && (
                            <div className="mb-6 bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                                <p className="text-purple-300 text-xs font-medium mb-2">Referred Person</p>
                                <p className="text-white text-sm font-medium">{selectedLead.referred_name}</p>
                                <p className="text-gray-400 text-xs">{selectedLead.referred_phone}</p>
                                {selectedLead.referred_email && (
                                    <p className="text-gray-400 text-xs">{selectedLead.referred_email}</p>
                                )}
                            </div>
                        )}

                        {/* Status Update */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-xs font-medium block mb-2">
                                Status
                            </label>
                            <select
                                value={selectedLead.status}
                                onChange={(e) => handleStatusUpdate(selectedLead.id, e.target.value as LeadStatus)}
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
                            onClick={() => handleDelete(selectedLead.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition-colors w-full justify-center"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Lead
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
