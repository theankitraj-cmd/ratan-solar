"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Save, ShoppingCart } from "lucide-react";
import {
    PRODUCT_CATALOG,
    generateInvoiceNumber,
    type InvoiceItem,
    type InvoiceCustomer,
} from "@/lib/billing-types";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function CreateInvoicePage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);

    const [customer, setCustomer] = useState<InvoiceCustomer>({
        name: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        gstin: "",
    });

    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [dueDate, setDueDate] = useState(
        new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]
    );
    const [notes, setNotes] = useState(
        "Warranty: 25 years on panels, 10 years on inverter. 1 year free maintenance."
    );

    const subtotal = items.reduce((s, i) => s + i.amount, 0);
    const cgst = Math.round(subtotal * 0.09);
    const sgst = Math.round(subtotal * 0.09);
    const total = subtotal + cgst + sgst;

    const addFromCatalog = (product: (typeof PRODUCT_CATALOG)[0]) => {
        setItems([
            ...items,
            { ...product, amount: product.qty * product.rate },
        ]);
        setShowCatalog(false);
    };

    const addCustomItem = () => {
        setItems([
            ...items,
            { name: "", hsn: "", qty: 1, rate: 0, amount: 0 },
        ]);
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const updated = [...items];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (updated[index] as any)[field] = value;
        if (field === "qty" || field === "rate") {
            updated[index].amount = updated[index].qty * updated[index].rate;
        }
        setItems(updated);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSave = async (status: "draft" | "sent") => {
        if (!customer.name || !customer.phone || items.length === 0) {
            alert("Please fill in customer name, phone, and add at least one item");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch("/api/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invoice_number: generateInvoiceNumber(),
                    date,
                    due_date: dueDate,
                    status,
                    customer,
                    items,
                    subtotal,
                    cgst,
                    sgst,
                    total,
                    notes,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/admin/billing/${data.invoice.id}`);
            } else {
                const err = await res.json();
                alert("Error: " + err.error);
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Failed to save. Check console for details.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">New Invoice</h1>
                        <p className="text-gray-400 text-sm">Create a new invoice for your customer</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleSave("draft")}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-600 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSave("sent")}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-500 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        Save & Send
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Details */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-4">Customer Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Customer Name *"
                                value={customer.name}
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Phone *"
                                value={customer.phone}
                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={customer.address}
                                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="City, State, PIN"
                                value={customer.city}
                                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={customer.email}
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="GSTIN (optional)"
                                value={customer.gstin}
                                onChange={(e) => setCustomer({ ...customer, gstin: e.target.value })}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-bold">Items</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowCatalog(!showCatalog)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-600/30"
                                >
                                    <ShoppingCart className="w-3 h-3" />
                                    Product Catalog
                                </button>
                                <button
                                    onClick={addCustomItem}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-xs font-medium hover:bg-green-600/30"
                                >
                                    <Plus className="w-3 h-3" />
                                    Custom Item
                                </button>
                            </div>
                        </div>

                        {/* Product Catalog Modal */}
                        {showCatalog && (
                            <div className="mb-4 bg-gray-800 border border-gray-700 rounded-xl p-4 max-h-64 overflow-y-auto">
                                <p className="text-gray-400 text-xs font-medium mb-2">Click to add:</p>
                                <div className="space-y-1">
                                    {PRODUCT_CATALOG.map((product, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => addFromCatalog(product)}
                                            className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <span className="text-white text-sm">{product.name}</span>
                                            <span className="text-green-400 text-sm font-medium">{formatCurrency(product.rate)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Items List */}
                        {items.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No items added yet</p>
                                <p className="text-xs mt-1">Use the catalog or add a custom item</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {items.map((item, idx) => (
                                    <div key={idx} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                                        <div className="flex items-start gap-2">
                                            <span className="text-gray-500 text-xs mt-2 w-5 flex-shrink-0">{idx + 1}.</span>
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-6 gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Item name"
                                                    value={item.name}
                                                    onChange={(e) => updateItem(idx, "name", e.target.value)}
                                                    className="sm:col-span-3 bg-gray-800 border border-gray-700 text-white text-xs rounded-lg px-2 py-1.5"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="HSN"
                                                    value={item.hsn}
                                                    onChange={(e) => updateItem(idx, "hsn", e.target.value)}
                                                    className="bg-gray-800 border border-gray-700 text-white text-xs rounded-lg px-2 py-1.5"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Qty"
                                                    value={item.qty}
                                                    onChange={(e) => updateItem(idx, "qty", Number(e.target.value))}
                                                    className="bg-gray-800 border border-gray-700 text-white text-xs rounded-lg px-2 py-1.5"
                                                    min={1}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Rate"
                                                    value={item.rate}
                                                    onChange={(e) => updateItem(idx, "rate", Number(e.target.value))}
                                                    className="bg-gray-800 border border-gray-700 text-white text-xs rounded-lg px-2 py-1.5"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-green-400 text-xs font-semibold whitespace-nowrap">{formatCurrency(item.amount)}</span>
                                                <button
                                                    onClick={() => removeItem(idx)}
                                                    className="text-red-400 hover:text-red-300 p-1"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-3">Notes / Terms</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5 resize-none focus:ring-green-500"
                        />
                    </div>
                </div>

                {/* Sidebar — Summary */}
                <div className="space-y-4">
                    {/* Dates */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-3">Invoice Dates</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-gray-400 text-xs block mb-1">Invoice Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs block mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2.5"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-3">Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>CGST (9%)</span>
                                <span className="text-white font-medium">{formatCurrency(cgst)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>SGST (9%)</span>
                                <span className="text-white font-medium">{formatCurrency(sgst)}</span>
                            </div>
                            <div className="border-t border-gray-800 pt-2 mt-2">
                                <div className="flex justify-between">
                                    <span className="text-white font-bold">Total</span>
                                    <span className="text-green-400 font-bold text-lg">{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                        <p className="text-green-400 text-xs font-medium mb-2">ℹ️ Info</p>
                        <ul className="text-green-300/80 text-xs space-y-1">
                            <li>• GST is auto-calculated at 18% (9% CGST + 9% SGST)</li>
                            <li>• Invoice number is auto-generated</li>
                            <li>• You can download PDF after saving</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
