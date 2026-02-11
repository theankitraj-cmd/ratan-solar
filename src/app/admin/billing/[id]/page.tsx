"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Share2, Printer } from "lucide-react";
import QRCode from "qrcode";
import { COMPANY_INFO, numberToWords, invoiceStatusColors, invoiceStatusLabels } from "@/lib/billing-types";
import type { Invoice, InvoiceStatus } from "@/lib/billing-types";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function InvoiceViewPage() {
    const { id } = useParams();
    const router = useRouter();
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [qrDataUrl, setQrDataUrl] = useState("");

    const fetchInvoice = useCallback(async () => {
        try {
            const res = await fetch(`/api/invoices`);
            const data = await res.json();
            const found = (data.invoices || []).find((i: Invoice) => i.id === id);
            if (found) {
                // Map flat fields to nested structure
                const inv: Invoice = {
                    ...found,
                    customer: {
                        name: found.customer_name,
                        address: found.customer_address,
                        city: found.customer_city,
                        phone: found.customer_phone,
                        email: found.customer_email,
                        gstin: found.customer_gstin,
                    },
                };
                setInvoice(inv);
            }
        } catch (error) {
            console.error("Failed to fetch invoice:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { fetchInvoice(); }, [fetchInvoice]);

    // Generate real UPI QR code
    useEffect(() => {
        if (!invoice) return;
        const upiUrl = `upi://pay?pa=${COMPANY_INFO.upiId}&pn=${encodeURIComponent(COMPANY_INFO.name)}&am=${invoice.total}&cu=INR&tn=Invoice%20${invoice.invoice_number}`;
        QRCode.toDataURL(upiUrl, {
            width: 160,
            margin: 1,
            color: { dark: "#1f2937", light: "#ffffff" },
        }).then(setQrDataUrl).catch(console.error);
    }, [invoice]);

    const handleDownloadPDF = async () => {
        if (!invoiceRef.current) return;
        const html2canvas = (await import("html2canvas")).default;
        const jsPDF = (await import("jspdf")).default;

        const canvas = await html2canvas(invoiceRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${invoice?.invoice_number || "download"}.pdf`);
    };

    const handleWhatsAppShare = () => {
        if (!invoice) return;
        const msg = `*Invoice #${invoice.invoice_number}*\n\nDear ${invoice.customer.name},\n\nPlease find your invoice details:\n\nAmount: ${formatCurrency(Number(invoice.total))}\nDue Date: ${new Date(invoice.due_date).toLocaleDateString("en-IN")}\n\nPay via UPI: ${COMPANY_INFO.upiId}\n\nThank you!\n${COMPANY_INFO.name}`;
        window.open(`https://wa.me/91${invoice.customer.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(msg)}`);
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-500">
                <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
                Loading invoice...
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">Invoice not found</p>
                <button onClick={() => router.push("/admin/billing")} className="text-green-400 mt-2 text-sm">
                    ← Back to Billing
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 no-print">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("/admin/billing")} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white">#{invoice.invoice_number}</h1>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${invoiceStatusColors[invoice.status]}`}>
                            {invoiceStatusLabels[invoice.status]}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-500">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button onClick={handleWhatsAppShare} className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-600">
                        <Share2 className="w-4 h-4" /> WhatsApp
                    </button>
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-700">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                </div>
            </div>

            {/* Invoice Document */}
            <div className="max-w-4xl mx-auto">
                <div ref={invoiceRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none" id="invoice-pdf">
                    {/* Green Top Bar */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-1.5" />

                    {/* Header */}
                    <div className="px-6 md:px-10 pt-8 pb-6">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex items-start gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/logo.jpg" alt="Logo" className="w-14 h-14 rounded-xl object-cover shadow-lg" />
                                <div>
                                    <h2 className="text-2xl font-extrabold text-gray-900">{COMPANY_INFO.name}</h2>
                                    <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mt-0.5">{COMPANY_INFO.tagline}</p>
                                    <div className="mt-3 text-xs text-gray-500 space-y-0.5">
                                        <p>{COMPANY_INFO.address}</p>
                                        <p>{COMPANY_INFO.city}</p>
                                        <p>📞 {COMPANY_INFO.phone} · ✉️ {COMPANY_INFO.email}</p>
                                        <p className="font-medium text-gray-600">GSTIN: {COMPANY_INFO.gstin}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <div className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-xl">
                                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Tax Invoice</p>
                                    <p className="text-lg font-bold">#{invoice.invoice_number}</p>
                                </div>
                                <div className="mt-3 space-y-1 text-xs text-gray-500">
                                    <p><span className="font-semibold text-gray-700">Date:</span> {new Date(invoice.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                    <p><span className="font-semibold text-gray-700">Due:</span> {new Date(invoice.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                    <p>
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${invoice.status === "paid" ? "bg-green-100 text-green-700" : invoice.status === "overdue" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            ● {invoice.status.toUpperCase()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-6 md:mx-10 border-t border-gray-200" />

                    {/* Bill To */}
                    <div className="px-6 md:px-10 py-6">
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
                            <h3 className="text-base font-bold text-gray-900">{invoice.customer.name}</h3>
                            <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                                {invoice.customer.address && <p>{invoice.customer.address}</p>}
                                {invoice.customer.city && <p>{invoice.customer.city}</p>}
                                <p>📞 {invoice.customer.phone}{invoice.customer.email ? ` · ✉️ ${invoice.customer.email}` : ""}</p>
                                {invoice.customer.gstin && <p className="font-medium text-gray-600">GSTIN: {invoice.customer.gstin}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="px-6 md:px-10 pb-6">
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-900 text-white">
                                        <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider">#</th>
                                        <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider">Item Description</th>
                                        <th className="text-center py-3 px-4 font-semibold text-xs uppercase tracking-wider">HSN</th>
                                        <th className="text-center py-3 px-4 font-semibold text-xs uppercase tracking-wider">Qty</th>
                                        <th className="text-right py-3 px-4 font-semibold text-xs uppercase tracking-wider">Rate</th>
                                        <th className="text-right py-3 px-4 font-semibold text-xs uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(invoice.items || []).map((item, idx) => (
                                        <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                                            <td className="py-3 px-4 text-gray-400 text-xs">{idx + 1}</td>
                                            <td className="py-3 px-4 font-medium text-gray-800 text-sm">{item.name}</td>
                                            <td className="py-3 px-4 text-center text-gray-500 text-xs font-mono">{item.hsn}</td>
                                            <td className="py-3 px-4 text-center text-gray-700 font-medium">{item.qty}</td>
                                            <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(item.rate)}</td>
                                            <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(item.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mt-4">
                            <div className="w-full md:w-80 space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{formatCurrency(Number(invoice.subtotal))}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>CGST (9%)</span>
                                    <span className="font-medium">{formatCurrency(Number(invoice.cgst))}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>SGST (9%)</span>
                                    <span className="font-medium">{formatCurrency(Number(invoice.sgst))}</span>
                                </div>
                                <div className="border-t-2 border-gray-900 pt-2">
                                    <div className="flex justify-between">
                                        <span className="text-base font-bold text-gray-900">Total Amount</span>
                                        <span className="text-base font-bold text-gray-900">{formatCurrency(Number(invoice.total))}</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 mt-2">
                                    <div className="flex justify-between text-white">
                                        <span className="font-bold text-sm">AMOUNT DUE</span>
                                        <span className="font-extrabold text-lg">{formatCurrency(Number(invoice.total))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amount in Words */}
                    <div className="px-6 md:px-10 pb-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="text-xs text-green-700">
                                <span className="font-bold">Amount in Words:</span> {numberToWords(Number(invoice.total))}
                            </p>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="px-6 md:px-10 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Real QR Code */}
                            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Scan to Pay (UPI)</p>
                                {qrDataUrl && (
                                    <div className="border-4 border-gray-200 rounded-xl p-2 bg-white">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={qrDataUrl} alt="UPI QR Code" width={140} height={140} />
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-2 font-mono">{COMPANY_INFO.upiId}</p>
                                <p className="text-xs text-green-600 font-bold mt-1">Pay {formatCurrency(Number(invoice.total))}</p>
                            </div>

                            {/* Bank Details */}
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Bank Transfer</p>
                                <div className="space-y-2 text-xs">
                                    <div><p className="text-gray-400">Account Name</p><p className="text-gray-800 font-semibold">{COMPANY_INFO.bank.name}</p></div>
                                    <div><p className="text-gray-400">Bank</p><p className="text-gray-800 font-semibold">{COMPANY_INFO.bank.bank}</p></div>
                                    <div><p className="text-gray-400">Account No.</p><p className="text-gray-800 font-semibold font-mono">{COMPANY_INFO.bank.account}</p></div>
                                    <div><p className="text-gray-400">IFSC</p><p className="text-gray-800 font-semibold font-mono">{COMPANY_INFO.bank.ifsc}</p></div>
                                </div>
                            </div>

                            {/* Signature */}
                            <div className="flex flex-col items-center justify-between bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Authorized Signatory</p>
                                <div className="flex-1 flex items-center">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-700 font-serif italic">{COMPANY_INFO.name}</p>
                                        <div className="w-32 border-b-2 border-gray-300 mx-auto mt-2 mb-1" />
                                        <p className="text-xs text-gray-400">Authorized Signature</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="px-6 md:px-10 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Terms & Conditions</p>
                            <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                                <li>Payment is due within 14 days from invoice date.</li>
                                <li>Warranty: 25 years on panels, 10 years on inverter, 1 year free maintenance.</li>
                                <li>Subsidy amount (if applicable) will be adjusted after DISCOM approval.</li>
                                <li>This is a computer-generated invoice and is valid without signature.</li>
                            </ol>
                            {invoice.notes && (
                                <p className="text-xs text-gray-500 mt-2 italic">Note: {invoice.notes}</p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 md:px-10 py-5">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <p className="text-white/90 text-sm font-medium">Thank you for choosing solar energy! ☀️</p>
                            <p className="text-green-200 text-xs">{COMPANY_INFO.name} — Making India Solar-Powered 🇮🇳</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body { background: white !important; }
                    .no-print, nav, aside, header { display: none !important; }
                    #invoice-pdf { box-shadow: none !important; border-radius: 0 !important; margin: 0; max-width: 100%; }
                }
            `}</style>
        </div>
    );
}
