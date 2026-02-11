"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on desktop
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[90] transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div
                className="absolute rounded-full blur-2xl mix-blend-screen"
                style={{
                    left: position.x - 60,
                    top: position.y - 60,
                    width: 120,
                    height: 120,
                    background:
                        "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)",
                    transition: "left 0.08s ease-out, top 0.08s ease-out",
                }}
            />
            {/* Inner brighter core */}
            <div
                className="absolute rounded-full blur-md"
                style={{
                    left: position.x - 15,
                    top: position.y - 15,
                    width: 30,
                    height: 30,
                    background:
                        "radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)",
                    transition: "left 0.05s ease-out, top 0.05s ease-out",
                }}
            />
        </div>
    );
}
