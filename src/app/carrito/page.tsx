import type { Metadata } from "next";

import CarritoVista, { type ProductoCarrito } from "@/components/carrito/carrito-vista";
import { getFotoBateria, listarBaterias, marcaDe, urlFicha } from "@/lib/catalogo";
import { sedes } from "@/data/contactoData";

export const metadata: Metadata = {
  title: "Carrito | Baterías GMA",
  robots: { index: false, follow: false },
};

/**
 * El carrito vive en el navegador y solo sabe ids. Esta pagina le pasa los
 * datos vigentes de cada producto — precio incluido — desde el catalogo, para
 * que lo que se muestra y se envia sea siempre lo que esta publicado hoy.
 */
export default async function Page() {
  const productos: Record<string, ProductoCarrito> = Object.fromEntries(
    (await listarBaterias()).map(({ bateria, marca }) => [
      bateria.id,
      {
        id: bateria.id,
        titulo: bateria.titulo,
        referencia: bateria.referencia,
        marca: marcaDe(bateria, marca),
        precio: bateria.precio,
        disponible: bateria.disponible,
        foto: getFotoBateria(bateria),
        url: urlFicha(marca, bateria),
      },
    ]),
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fef2f2_0%,#ffffff_40%,#fff7ed_100%)] text-zinc-900 pt-15">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Tu carrito
        </h1>
        <CarritoVista
          productos={productos}
          sedes={sedes.map((s) => ({ id: s.id, nombre: s.nombre, direccion: s.direccion }))}
        />
      </section>
    </main>
  );
}
