/**
 * Simple in-memory rate limiter.
 * Limits requests per IP address per window (default: 5 per 60 seconds).
 * Note: Resets on server restart. For production, consider Redis-based solutions.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
        if (now > entry.resetTime) {
            store.delete(key);
        }
    }
}, 60_000);

export function rateLimit(
    ip: string,
    maxRequests = 5,
    windowMs = 60_000
): { success: boolean; remaining: number } {
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now > entry.resetTime) {
        store.set(ip, { count: 1, resetTime: now + windowMs });
        return { success: true, remaining: maxRequests - 1 };
    }

    if (entry.count >= maxRequests) {
        return { success: false, remaining: 0 };
    }

    entry.count++;
    return { success: true, remaining: maxRequests - entry.count };
}
