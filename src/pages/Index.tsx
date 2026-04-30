import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhoWeHelpSection } from "@/components/home/WhoWeHelpSection";
import { ServicesPreviewSection } from "@/components/home/ServicesPreviewSection";
import { CoursesPreviewSection } from "@/components/home/CoursesPreviewSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { PortfolioTestimonialsSection } from "@/components/home/PortfolioTestimonialsSection";
import { NextBatchCTASection } from "@/components/home/NextBatchCTASection";
import { ContactTeaserSection } from "@/components/home/ContactTeaserSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhoWeHelpSection />
      <ServicesPreviewSection />
      <CoursesPreviewSection />
      <WhyUsSection />
      <PortfolioTestimonialsSection />
      <NextBatchCTASection />
      <ContactTeaserSection />
    </Layout>
  );
};

export default Index;
