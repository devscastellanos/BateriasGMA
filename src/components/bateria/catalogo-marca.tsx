import { notFound } from "next/navigation";

import TarjetaBateria from "@/components/bateria/tarjeta-bateria";
import { bateriasDeMarca, obtenerMarca } from "@/lib/catalogo";

type BrandCatalogPageProps = {
  marcaSlug: string;
};

export default async function BrandCatalogPage({ marcaSlug }: BrandCatalogPageProps) {
  const marca = await obtenerMarca(marcaSlug);

  if (!marca) {
    notFound();
  }

  const marcaBaterias = await bateriasDeMarca(marca.id);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fef2f2_0%,#ffffff_40%,#fff7ed_100%)] text-zinc-900 pt-15">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Catálogo {marca.name}
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Baterías {marca.name} para cada necesidad de tu vehículo
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-700 sm:text-lg">
            {marca.descripcion}
          </p>
        </div>

        {marcaBaterias.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/80 p-8 text-sm text-zinc-600 shadow-sm backdrop-blur">
            Todavía no hay referencias cargadas para esta marca.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {marcaBaterias.map((item) => (
              <TarjetaBateria key={item.id} bateria={item} marca={marca} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
