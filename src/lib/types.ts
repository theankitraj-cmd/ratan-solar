/**
 * Lead types and interfaces for admin dashboard
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type LeadSource = "contact" | "referral" | "calculator" | "exit_popup";

export interface Lead {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    message?: string;
    source: LeadSource;
    status: LeadStatus;
    notes?: string;
    // Referral-specific fields
    referred_name?: string;
    referred_phone?: string;
    referred_email?: string;
    // Calculator-specific fields
    system_size?: string;
    monthly_bill?: number;
    // Metadata
    page_url?: string;
    user_agent?: string;
}

export interface LeadStats {
    total: number;
    thisWeek: number;
    thisMonth: number;
    byStatus: Record<LeadStatus, number>;
    bySource: Record<LeadSource, number>;
    conversionRate: number;
}

export const statusColors: Record<LeadStatus, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    qualified: "bg-purple-100 text-purple-700",
    converted: "bg-green-100 text-green-700",
    lost: "bg-gray-100 text-gray-500",
};

export const statusLabels: Record<LeadStatus, string> = {
    new: "New",
    contacted: "Contacted",
    qualified: "Qualified",
    converted: "Converted",
    lost: "Lost",
};

export const sourceLabels: Record<LeadSource, string> = {
    contact: "Contact Form",
    referral: "Referral",
    calculator: "Calculator",
    exit_popup: "Exit Popup",
};
