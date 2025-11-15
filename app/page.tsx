import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import PartnerLogosTicker from "@/components/PartnerLogosTicker";
import Disclaimer from "@/components/Disclaimer";
import ConsoleAnimation from "@/components/CodeExample";

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <PartnerLogosTicker />
      <ConsoleAnimation />
      <Disclaimer/>
      <Footer />
    </>
  );
}
