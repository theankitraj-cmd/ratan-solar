export interface InvoiceItem {
    name: string;
    hsn: string;
    qty: number;
    rate: number;
    amount: number;
}

export interface InvoiceCustomer {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    gstin?: string;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface Invoice {
    id: string;
    invoice_number: string;
    date: string;
    due_date: string;
    status: InvoiceStatus;
    customer: InvoiceCustomer;
    items: InvoiceItem[];
    subtotal: number;
    cgst: number;
    sgst: number;
    total: number;
    notes: string;
    created_at: string;
    updated_at: string;
}

export const COMPANY_INFO = {
    name: "Ratan Solar",
    tagline: "Total Energy Independence",
    address: "Main Road, Motihari",
    city: "East Champaran, Bihar 845401",
    phone: "+91 87094 57031",
    email: "ratansolar@gmail.com",
    gstin: "10AABCR1234F1Z5",
    upiId: "7070291173@axl",
    bank: {
        name: "Ratan Solar",
        bank: "State Bank of India",
        account: "39281047562",
        ifsc: "SBIN0003456",
        branch: "Motihari Branch",
    },
};

export const PRODUCT_CATALOG: Omit<InvoiceItem, "amount">[] = [
    { name: "Loom Solar 440W Mono PERC Panel", hsn: "85414011", qty: 1, rate: 18500 },
    { name: "Loom Solar 540W Bi-Facial Panel", hsn: "85414011", qty: 1, rate: 22000 },
    { name: "Growatt 3kW On-Grid Inverter", hsn: "85044090", qty: 1, rate: 32000 },
    { name: "Growatt 5kW On-Grid Inverter", hsn: "85044090", qty: 1, rate: 45000 },
    { name: "Growatt 10kW On-Grid Inverter", hsn: "85044090", qty: 1, rate: 78000 },
    { name: "Luminous 3kVA Off-Grid Inverter", hsn: "85044090", qty: 1, rate: 28000 },
    { name: "Luminous 150Ah Tall Tubular Battery", hsn: "85072090", qty: 1, rate: 14500 },
    { name: "Panel Mounting Structure (GI)", hsn: "76109090", qty: 1, rate: 12000 },
    { name: "Installation & Wiring Charges", hsn: "998314", qty: 1, rate: 15000 },
    { name: "DC Cable, MC4, ACDB/DCDB Kit", hsn: "85444999", qty: 1, rate: 8000 },
    { name: "Earthing Kit (GI Pipe + Wire)", hsn: "73079990", qty: 1, rate: 3500 },
    { name: "Net Meter Application Charges", hsn: "998314", qty: 1, rate: 5000 },
    { name: "Annual Maintenance Contract (AMC)", hsn: "998714", qty: 1, rate: 6000 },
];

export const invoiceStatusColors: Record<InvoiceStatus, string> = {
    draft: "bg-gray-500/20 text-gray-400",
    sent: "bg-blue-500/20 text-blue-400",
    paid: "bg-green-500/20 text-green-400",
    overdue: "bg-red-500/20 text-red-400",
    cancelled: "bg-yellow-500/20 text-yellow-400",
};

export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
    draft: "Draft",
    sent: "Sent",
    paid: "Paid",
    overdue: "Overdue",
    cancelled: "Cancelled",
};

export function generateInvoiceNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
    return `RS-${year}-${seq}`;
}

export function numberToWords(num: number): string {
    if (num === 0) return "Zero";
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convert(n: number): string {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
        if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + convert(n % 100) : "");
        if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
        if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
        return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
    }

    return convert(Math.round(num)) + " Rupees Only";
}
