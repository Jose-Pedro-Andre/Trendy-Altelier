import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { HowItWorks } from "@/components/how-it-works";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}
