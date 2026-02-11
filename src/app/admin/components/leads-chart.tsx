"use client";

import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import type { Lead } from "@/lib/types";

interface LeadsChartProps {
    leads: Lead[];
}

export function LeadsChart({ leads }: LeadsChartProps) {
    const chartData = useMemo(() => {
        // Last 14 days
        const days: { date: string; label: string; count: number }[] = [];
        const now = new Date();

        for (let i = 13; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            const label = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
            days.push({ date: dateStr, label, count: 0 });
        }

        // Count leads per day
        leads.forEach((lead) => {
            const leadDate = new Date(lead.created_at).toISOString().split("T")[0];
            const day = days.find((d) => d.date === leadDate);
            if (day) day.count++;
        });

        return days;
    }, [leads]);

    const maxCount = Math.max(...chartData.map((d) => d.count), 1);

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-bold text-lg">Lead Activity</h3>
                    <p className="text-gray-400 text-sm">Last 14 days</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400">Leads per day</span>
                </div>
            </div>
            <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: "#9ca3af", fontSize: 11 }}
                            axisLine={{ stroke: "#374151" }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "#9ca3af", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, maxCount + 1]}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "1px solid #374151",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "13px",
                            }}
                            cursor={{ fill: "rgba(34, 197, 94, 0.08)" }}
                            formatter={(value: number | string | undefined) => [`${value ?? 0} leads`, "Count"]}
                        />
                        <Bar
                            dataKey="count"
                            fill="url(#greenGradient)"
                            radius={[6, 6, 0, 0]}
                        />
                        <defs>
                            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
