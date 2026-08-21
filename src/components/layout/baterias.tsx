"use client";
import { Marcas } from "../../app/marcas/page";
import { marcas } from "../../data/marcasData";
export default function Baterias() {
  return (
    <div id="baterias" className="flex flex-col  p-6 ml-4">
      <h2 className="text-2xl font-bold text-gray-800">
        LAS MEJORES BATERÍAS DEL MERCADO
      </h2>
      <div className="flex flex-wrap gap-6 mt-6 max-w">
        {marcas.map((marca) => (
          <Marcas
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
