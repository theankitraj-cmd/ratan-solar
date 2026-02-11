import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ invoices: [] });
    }

    const status = request.nextUrl.searchParams.get("status");

    let query = supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

    if (status && status !== "all") {
        query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Invoices fetch error:", error);
        return NextResponse.json({ invoices: [] });
    }

    return NextResponse.json({ invoices: data || [] });
}

export async function POST(request: NextRequest) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json();

    const { data, error } = await supabase
        .from("invoices")
        .insert({
            invoice_number: body.invoice_number,
            date: body.date,
            due_date: body.due_date,
            status: body.status || "draft",
            customer_name: body.customer.name,
            customer_address: body.customer.address,
            customer_city: body.customer.city,
            customer_phone: body.customer.phone,
            customer_email: body.customer.email,
            customer_gstin: body.customer.gstin || "",
            items: body.items,
            subtotal: body.subtotal,
            cgst: body.cgst,
            sgst: body.sgst,
            total: body.total,
            notes: body.notes || "",
        })
        .select()
        .single();

    if (error) {
        console.error("Invoice create error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ invoice: data });
}

export async function PATCH(request: NextRequest) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    const { error } = await supabase
        .from("invoices")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) {
        console.error("Invoice update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const { error } = await supabase.from("invoices").delete().eq("id", id);

    if (error) {
        console.error("Invoice delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
