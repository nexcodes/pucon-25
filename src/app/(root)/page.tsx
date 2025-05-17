import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Card from "@/components/card";
import Carousel from "@/components/carousel";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <Card />
      <Carousel />
      <Footer />
    </main>
  );
}
