import Image from "next/image";
import Header from "@/components/pages/header"
import Tittle from "@/components/pages/tittle";
import BrandCarousel from "@/components/pages/brandCarousel";
import Baterias from "@/components/pages/baterias";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white ">
      <Header />
      <Tittle />
      <div className="pl-6 pr-6">
        <BrandCarousel />
      </div>
      <Baterias />
    </main>
  );
}
