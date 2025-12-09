import BackgroundElements from "@/components/ui/background-elements";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/ui/hero-section";
import Navigation from "@/components/ui/navigation";


export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <BackgroundElements />
      <Navigation />
      <HeroSection />
      <Footer />
    </main>
  )
}
