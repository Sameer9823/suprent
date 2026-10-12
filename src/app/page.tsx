import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { InfrastructureSection } from "@/components/home/infrastructure-section";
import { PropertyCategories } from "@/components/home/property-categories";
import { FeaturedSpaces } from "@/components/home/featured-spaces";
import { FacilitiesSection } from "@/components/home/facilities-section";
import { WhyChoose } from "@/components/home/why-choose";
import { HowItWorks } from "@/components/home/how-it-works";
import { PropertyVideo } from "@/components/home/property-video";
import { CustomRequirementCta } from "@/components/home/custom-requirement-cta";

export const metadata: Metadata = {
  title: { absolute: "SUPGS | Commercial spaces for rent & everyday facilities" },
  description:
    "Find commercial spaces for rent, from shops and showrooms to warehouses and event venues, and explore the library, washing center and fitness center at SUPGS.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfrastructureSection />
      <PropertyCategories />
      <FeaturedSpaces />
      <PropertyVideo />
      <FacilitiesSection />
      <WhyChoose />
      <HowItWorks />
      <CustomRequirementCta />
    </>
  );
}
