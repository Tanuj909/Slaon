import HeroSection from "@/features/home/components/HeroSection";
import ServicesSection from "@/features/home/components/ServicesSection";
import AboutSection from "@/features/home/components/AboutSection";
import ClientReviews from "@/features/home/components/ClientReviews";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ClientReviews/>
    </main>
  );
}

