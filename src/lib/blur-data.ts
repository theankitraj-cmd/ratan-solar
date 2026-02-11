/**
 * Base64-encoded tiny blur placeholders for images.
 * Used with next/image `placeholder="blur"` + `blurDataURL`.
 * These are hand-crafted ~8x8 pixel representations of each image.
 */

// Warm gradient placeholder (for solar/hero images)
export const solarHeroBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect fill="#f0fdf4" width="8" height="8"/><rect fill="#22c55e" width="8" height="4" y="4" opacity="0.3"/></svg>'
    );

// Green gradient placeholder (for rooftop/panel images)
export const rooftopBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect fill="#dcfce7" width="8" height="8"/><rect fill="#166534" width="8" height="3" y="5" opacity="0.4"/></svg>'
    );

// Blue-sky gradient placeholder (for farm images)
export const solarFarmBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect fill="#e0f2fe" width="8" height="4"/><rect fill="#16a34a" width="8" height="4" y="4" opacity="0.5"/></svg>'
    );

// Tech/dark placeholder
export const solarTechBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect fill="#1e293b" width="8" height="8"/><rect fill="#22c55e" width="4" height="4" x="2" y="2" opacity="0.3"/></svg>'
    );

// Logo placeholder (circular green)
export const logoBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#dcfce7"/></svg>'
    );

// People/referral placeholder
export const referralBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect fill="#f0fdf4" width="8" height="8"/><circle cx="4" cy="3" r="2" fill="#86efac" opacity="0.5"/></svg>'
    );

// Earth/globe placeholder
export const earthBlur =
    "data:image/svg+xml;base64," +
    btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#1e40af" opacity="0.6"/><circle cx="3" cy="3" r="2" fill="#22c55e" opacity="0.4"/></svg>'
    );

// Image name to blur mapping for convenience
export const blurPlaceholders: Record<string, string> = {
    "/logo.jpg": logoBlur,
    "/earth-solar-hero.png": earthBlur,
    "/rooftop-solar.png": rooftopBlur,
    "/solar-farm.png": solarFarmBlur,
    "/solar-tech.png": solarTechBlur,
    "/ref-1.png": referralBlur,
    "/ref-2.png": referralBlur,
};
