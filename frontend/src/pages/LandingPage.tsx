import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DecorativePattern from "@/components/DecorativePattern";
import GitCrackers from "@/components/GitCrackers";
import Footer from "@/components/Footer";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="bg-[#010106] min-h-full w-full overflow-x-hidden">
      <Navbar currentPage="home" onNavigate={onNavigate} />
      <Hero />
      <Features />
      <DecorativePattern />
      <GitCrackers />
      <Footer />
    </div>
  );
}
