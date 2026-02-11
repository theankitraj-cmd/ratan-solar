"use client";

import { useEffect, useRef } from "react";

export function SolarParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            fadeDirection: number;
            color: string;
        }

        const colors = [
            "rgba(250, 204, 21,", // yellow-400
            "rgba(253, 224, 71,", // yellow-300
            "rgba(163, 230, 53,", // lime-400
            "rgba(34, 197, 94,",  // green-500
            "rgba(251, 191, 36,", // amber-400
        ];

        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: -Math.random() * 0.5 - 0.1,
            opacity: Math.random() * 0.6 + 0.1,
            fadeDirection: Math.random() > 0.5 ? 1 : -1,
            color: colors[Math.floor(Math.random() * colors.length)],
        });

        // Initialize particles
        for (let i = 0; i < 35; i++) {
            particles.push(createParticle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;

                // Fade in/out
                p.opacity += p.fadeDirection * 0.005;
                if (p.opacity >= 0.7) p.fadeDirection = -1;
                if (p.opacity <= 0.05) {
                    // Reset particle
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + 10;
                    p.opacity = 0.05;
                    p.fadeDirection = 1;
                }

                // Wrap horizontally
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color} ${p.opacity})`;
                ctx.fill();

                // Draw glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size * 3
                );
                gradient.addColorStop(0, `${p.color} ${p.opacity * 0.3})`);
                gradient.addColorStop(1, `${p.color} 0)`);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            aria-hidden="true"
        />
    );
}
