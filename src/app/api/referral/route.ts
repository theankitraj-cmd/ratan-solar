import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getServiceSupabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        // Rate limiting
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
        const { success: allowed } = rateLimit(ip);
        if (!allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again in a minute." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { referrerName, referrerPhone, referrerEmail, friendName, friendPhone, friendEmail } = body;

        // Validate required fields
        if (!referrerName || !referrerPhone || !friendName || !friendPhone) {
            return NextResponse.json(
                { error: "Referrer and friend details are required" },
                { status: 400 }
            );
        }

        // Save to Supabase (if configured)
        const supabase = getServiceSupabase();
        if (supabase) {
            const { error: dbError } = await supabase.from("leads").insert({
                name: referrerName,
                email: referrerEmail || "",
                phone: referrerPhone,
                source: "referral",
                status: "new",
                page_url: "/referral",
                referred_name: friendName,
                referred_phone: friendPhone,
                referred_email: friendEmail || "",
                message: `Referral: ${referrerName} referred ${friendName}`,
            });

            if (dbError) {
                console.error("Database error:", dbError);
            }
        }

        // Notify admin
        try {
            await resend.emails.send({
                from: "Ratan Solar <onboarding@resend.dev>",
                to: ["ratansolar@gmail.com"],
                subject: `🎁 New Referral: ${referrerName} → ${friendName}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 24px; border-radius: 12px 12px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 24px;">🎁 New Referral Received!</h1>
                        </div>
                        <div style="background: #faf5ff; padding: 24px; border: 1px solid #e9d5ff;">
                            <h3 style="color: #6b21a8; margin: 0 0 12px;">Referred by:</h3>
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Name:</td><td>${referrerName}</td></tr>
                                <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Phone:</td><td>${referrerPhone}</td></tr>
                                <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Email:</td><td>${referrerEmail || "—"}</td></tr>
                            </table>
                            <h3 style="color: #6b21a8; margin: 0 0 12px;">Friend (Potential Customer):</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Name:</td><td>${friendName}</td></tr>
                                <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Phone:</td><td>${friendPhone}</td></tr>
                                <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Email:</td><td>${friendEmail || "—"}</td></tr>
                            </table>
                        </div>
                        <div style="background: #f9fafb; padding: 16px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: 0;">
                            <a href="https://ratansolar.com/admin" style="background: #7c3aed; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View in Dashboard</a>
                        </div>
                    </div>
                `,
            });
        } catch (emailError) {
            console.error("Email error:", emailError);
        }

        return NextResponse.json({ success: true, message: "Referral submitted! You'll earn ₹1,000 when your friend goes solar." });
    } catch (error) {
        console.error("Referral API error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
