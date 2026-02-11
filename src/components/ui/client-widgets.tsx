"use client";

import { usePathname } from "next/navigation";
import { FloatingWhatsApp } from "./floating-whatsapp";
import { FloatingCall } from "./floating-call";
import { ExitIntentPopup } from "./exit-intent-popup";

export function ClientWidgets() {
    const pathname = usePathname();

    // Hide floating widgets on admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <FloatingCall />
            <ExitIntentPopup />
            <FloatingWhatsApp />
        </>
    );
}
