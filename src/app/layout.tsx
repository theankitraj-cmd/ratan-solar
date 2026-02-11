import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme-provider";
import { ClientWidgets } from "@/components/ui/client-widgets";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SplashScreen } from "@/components/ui/splash-screen";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ratan Solar | Total Energy Independence",
  description: "Advanced solar engineering driving India's high-performance clean energy transition.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ratan Solar",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Ratan Solar",
              description: "India's trusted solar energy partner. Rooftop solar, ground-mount, and utility-scale solar solutions.",
              url: "https://ratansolar.com",
              telephone: "+919876543210",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Bihar",
                addressCountry: "IN",
              },
              priceRange: "₹₹",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "320",
              },
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground transition-colors duration-300",
          inter.variable,
          playfair.variable
        )}
      >
        <ThemeProvider>
          <SplashScreen />
          <ScrollProgress />
          <CursorGlow />
          {children}
          <ClientWidgets />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
