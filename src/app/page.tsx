import Header from "@/components/layout/header";
import Tittle from "@/components/layout/tittle";
import BrandCarousel from "@/components/layout/brandCarousel";
import Baterias from "@/components/layout/baterias";
import Footer from "@/components/layout/footer";
import About from "@/components/layout/about";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white pt-20">
      <Tittle />
      <div className="pl-6 pr-6">
        <BrandCarousel />
      </div>
      <Baterias />

      <Footer />
    </main>
  );
}
