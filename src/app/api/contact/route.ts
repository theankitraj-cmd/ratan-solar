import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getServiceSupabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

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
        const { name, email, phone, message, service } = body;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Name, email, and phone are required" },
                { status: 400 }
            );
        }

        // Save to Supabase (if configured)
        const supabase = getServiceSupabase();
        if (supabase) {
            const { error: dbError } = await supabase.from("leads").insert({
                name,
                email,
                phone,
                message: message || "",
                source: "contact",
                status: "new",
                page_url: "/contact",
                metadata: { service: service || "general" },
            });

            if (dbError) {
                console.error("Database error:", dbError);
            }
        }

        // Send notification email to admin
        try {
            await resend.emails.send({
                from: "Ratan Solar <onboarding@resend.dev>",
                to: ["ratansolar@gmail.com"],
                subject: `🌞 New Lead: ${name} — ${service || "General Inquiry"}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 24px; border-radius: 12px 12px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 24px;">🌞 New Lead from Ratan Solar</h1>
                        </div>
                        <div style="background: #f0fdf4; padding: 24px; border: 1px solid #dcfce7;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px 0; color: #4b5563;">${name}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0; color: #4b5563;">${email}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td><td style="padding: 8px 0; color: #4b5563;">${phone}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Service:</td><td style="padding: 8px 0; color: #4b5563;">${service || "General"}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Message:</td><td style="padding: 8px 0; color: #4b5563;">${message || "—"}</td></tr>
                            </table>
                        </div>
                        <div style="background: #f9fafb; padding: 16px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: 0;">
                            <a href="https://ratansolar.com/admin" style="background: #16a34a; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View in Dashboard</a>
                        </div>
                    </div>
                `,
            });
        } catch (emailError) {
            console.error("Email error:", emailError);
            // Don't fail the request if email fails — lead is already saved
        }

        // Send auto-reply to customer
        try {
            await resend.emails.send({
                from: "Ratan Solar <onboarding@resend.dev>",
                to: [email],
                subject: "Thank you for contacting Ratan Solar! 🌞",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 28px;">🌞 Ratan Solar</h1>
                            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Total Energy Independence</p>
                        </div>
                        <div style="background: white; padding: 32px; border: 1px solid #e5e7eb;">
                            <h2 style="color: #111827; margin: 0 0 16px;">Hi ${name}! 👋</h2>
                            <p style="color: #4b5563; line-height: 1.6;">Thank you for reaching out to us. We've received your inquiry and our solar expert will get back to you within <strong>2 hours</strong>.</p>
                            <div style="background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 8px; padding: 16px; margin: 20px 0;">
                                <p style="color: #166534; margin: 0; font-weight: bold;">💡 Did you know?</p>
                                <p style="color: #4b5563; margin: 8px 0 0;">With PM Surya Ghar scheme, you can get up to ₹78,000 subsidy on rooftop solar panels!</p>
                            </div>
                            <p style="color: #4b5563; line-height: 1.6;">Meanwhile, try our <a href="https://ratansolar.com/calculator" style="color: #16a34a; font-weight: bold;">Solar Savings Calculator</a> to see how much you can save.</p>
                        </div>
                        <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: 0;">
                            <p style="color: #9ca3af; margin: 0; font-size: 12px;">Ratan Solar — Making India Solar-Powered 🇮🇳</p>
                        </div>
                    </div>
                `,
            });
        } catch (emailError) {
            console.error("Auto-reply email error:", emailError);
        }

        return NextResponse.json({ success: true, message: "Thank you! We'll get back to you within 2 hours." });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
