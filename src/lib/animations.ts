"use client";

import { Variants } from "framer-motion";

// Premium easing curves
export const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const smoothEase: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

// Fade up with stagger for container children
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

// Fade up reveal
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: premiumEase },
    },
};

// Fade in from left
export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: premiumEase },
    },
};

// Fade in from right
export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: premiumEase },
    },
};

// Scale up reveal
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: premiumEase },
    },
};

// Tag chip stagger
export const chipStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.3 },
    },
};

export const chipItem: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: premiumEase },
    },
};

// Card hover effect
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: premiumEase },
    },
    hover: {
        scale: 1.02,
        y: -6,
        transition: { duration: 0.4, ease: premiumEase },
    },
};

// Green glow pulse for accent elements
export const glowPulse: Variants = {
    initial: {
        boxShadow: "0 0 0px rgba(22, 163, 74, 0)",
    },
    animate: {
        boxShadow: [
            "0 0 10px rgba(22, 163, 74, 0.15)",
            "0 0 25px rgba(22, 163, 74, 0.3)",
            "0 0 10px rgba(22, 163, 74, 0.15)",
        ],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
};

// Gradient border animation
export const gradientBorder: Variants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: { duration: 5, repeat: Infinity, ease: "linear" },
    },
};

// Viewport config for scroll-triggered animations
export const viewportConfig = {
    once: true,
    margin: "-40px" as const,
};
