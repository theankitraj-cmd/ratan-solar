import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { StatsCounterBar } from "@/components/sections/stats-counter";
import { TrustBadgesSection } from "@/components/sections/trust-badges";
import { BusinessOverviewSection } from "@/components/sections/business-overview";
import { SubsidyCheckerSection } from "@/components/sections/subsidy-checker";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FeaturesSection } from "@/components/sections/features";
import { ComparisonTableSection } from "@/components/sections/comparison-table";
import { VisualBreakSection } from "@/components/sections/visual-break";
import { CarbonVisualizerSection } from "@/components/sections/carbon-visualizer";
import { ROITimelineSection } from "@/components/sections/roi-timeline";
import { SolarJourneySection } from "@/components/sections/solar-journey";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StatsSection } from "@/components/sections/stats";
import { TechSection } from "@/components/sections/tech-section";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <StatsCounterBar />
      <TrustBadgesSection />
      <BusinessOverviewSection />
      <SubsidyCheckerSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ComparisonTableSection />
      <VisualBreakSection />
      <CarbonVisualizerSection />
      <ROITimelineSection />
      <SolarJourneySection />
      <TestimonialsSection />
      <StatsSection />
      <TechSection />
      <CTASection />
      <Footer />
    </main>
  );
}
