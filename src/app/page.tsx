import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { InfrastructureSection } from "@/components/home/infrastructure-section";
import { LocationConnectivity } from "@/components/home/location-connectivity";
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
    "Find commercial spaces for rent, from shops and showrooms to warehouses and event venues, and explore 7 on-site facilities at SUPGS: a library with 24-hour CCTV monitoring, a digital car washing center, a fitness center, a stationery shop, a hair salon, a stitching center and a tuition center.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfrastructureSection />
      <LocationConnectivity />
      <PropertyCategories />
      <PropertyVideo />
      <FacilitiesSection />
      <WhyChoose />
      <HowItWorks />
      <CustomRequirementCta />
    </>
  );
}
