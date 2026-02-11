import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import type { LeadStatus } from "@/lib/types";

// GET — Fetch all leads
export async function GET(request: Request) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ leads: [], message: "Database not configured" });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (status) query = query.eq("status", status);
    if (source) query = query.eq("source", source);

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data });
}

// PATCH — Update lead status or notes
export async function PATCH(request: Request) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    try {
        const body = await request.json();
        const { id, status, notes } = body as { id: string; status?: LeadStatus; notes?: string };

        if (!id) {
            return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
        }

        const updates: Record<string, unknown> = {};
        if (status) updates.status = status;
        if (notes !== undefined) updates.notes = notes;

        const { error } = await supabase
            .from("leads")
            .update(updates)
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lead update error:", error);
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }
}

// DELETE — Delete a lead
export async function DELETE(request: Request) {
    const supabase = getServiceSupabase();
    if (!supabase) {
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("leads")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lead delete error:", error);
        return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }
}
