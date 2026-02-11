"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, FileText, Trash2, Eye, Download, Search, Filter } from "lucide-react";
import type { InvoiceStatus } from "@/lib/billing-types";
import { invoiceStatusColors, invoiceStatusLabels } from "@/lib/billing-types";

interface InvoiceSummary {
    id: string;
    invoice_number: string;
    date: string;
    due_date: string;
    status: InvoiceStatus;
    customer_name: string;
    customer_phone: string;
    total: number;
    created_at: string;
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function BillingPage() {
    const [invoices, setInvoices] = useState<InvoiceSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        fetchInvoices();
    }, [statusFilter]);

    const fetchInvoices = async () => {
        try {
            const res = await fetch(`/api/invoices?status=${statusFilter}`);
            const data = await res.json();
            setInvoices(data.invoices || []);
        } catch (error) {
            console.error("Failed to fetch invoices:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this invoice?")) return;
        await fetch(`/api/invoices?id=${id}`, { method: "DELETE" });
        setInvoices((prev) => prev.filter((i) => i.id !== id));
    };

    const handleStatusUpdate = async (id: string, status: InvoiceStatus) => {
        await fetch("/api/invoices", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        setInvoices((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status } : i))
        );
    };

    const filtered = invoices.filter(
        (i) =>
            i.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
            i.customer_name.toLowerCase().includes(search.toLowerCase())
    );

    // Stats
    const totalRevenue = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + Number(i.total), 0);
    const pendingAmount = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + Number(i.total), 0);
    const totalInvoices = invoices.length;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white">Billing & Invoices</h1>
                    <p className="text-gray-400 text-sm mt-1">{totalInvoices} invoices</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin/billing/create"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-500 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">New Invoice</span>
                        <span className="sm:hidden">New</span>
                    </Link>
                    <Link
                        href="/admin/billing/preview"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Preview Template</span>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-green-400 text-lg">₹</span>
                        </div>
                        <span className="text-green-400 text-xs font-medium">Revenue Collected</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-yellow-400 text-lg">⏳</span>
                        </div>
                        <span className="text-yellow-400 text-xs font-medium">Pending Amount</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{formatCurrency(pendingAmount)}</p>
                </div>
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-blue-400 text-xs font-medium">Total Invoices</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalInvoices}</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search invoice number or customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 text-sm focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl px-3 py-2"
                    >
                        <option value="all">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Invoice List */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">
                    <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
                    Loading invoices...
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                    <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">No invoices yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Create your first invoice to get started</p>
                    <Link
                        href="/admin/billing/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-500"
                    >
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </Link>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map((invoice) => (
                        <div
                            key={invoice.id}
                            className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-white text-sm font-bold">#{invoice.invoice_number}</p>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${invoiceStatusColors[invoice.status]}`}>
                                                {invoiceStatusLabels[invoice.status]}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs mt-0.5">
                                            {invoice.customer_name} · {new Date(invoice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <p className="text-white font-bold text-sm">{formatCurrency(Number(invoice.total))}</p>
                                    <div className="flex items-center gap-1">
                                        <select
                                            value={invoice.status}
                                            onChange={(e) => handleStatusUpdate(invoice.id, e.target.value as InvoiceStatus)}
                                            className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="sent">Sent</option>
                                            <option value="paid">Paid</option>
                                            <option value="overdue">Overdue</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <Link
                                            href={`/admin/billing/${invoice.id}`}
                                            className="p-2 text-gray-500 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-colors"
                                            title="View Invoice"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(invoice.id)}
                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
