import Link from "next/link";

import { MarcaCard } from "@/components/marca-card";
import { Button } from "@/components/ui/button";
import { listarMarcas } from "@/lib/catalogo";
export default async function Baterias() {
  const marcas = await listarMarcas();
  return (
    <div id="baterias" className="flex flex-col  p-6 ml-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          LAS MEJORES BATERÍAS DEL MERCADO
        </h2>
        {/* Para quien no sabe la marca: el catalogo completo tiene buscador
            y filtros por caja, polaridad y tecnologia. */}
        <Button asChild size="lg" className="mr-4">
          <Link href="/baterias">Ver todo el catálogo</Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 max-w">
        {marcas.map((marca) => (
          <MarcaCard
            key={marca.id}
            slug={marca.slug}
            logo={marca.logo}
            name={marca.name}
            description={marca.descripcion}
          />
        ))}
      </div>
    </div>
  );
}
