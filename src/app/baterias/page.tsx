import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";

import TarjetaBateria from "@/components/bateria/tarjeta-bateria";
import { SelectFiltro } from "@/components/bateria/select-filtro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buscarBaterias,
  opcionesDeFiltro,
  type FiltrosBusqueda,
} from "@/lib/catalogo";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TECNOLOGIAS = ["PLOMO", "EFB", "AGM"] as const;
const POLARIDADES = ["derecha", "izquierda"] as const;

function texto(valor: string | string[] | undefined) {
  const v = Array.isArray(valor) ? valor[0] : valor;
  return v?.trim() || undefined;
}

/** Valida lo que llega por la URL. Un valor que no existe en el catalogo se
 *  ignora en vez de dejar la busqueda vacia sin explicacion. */
function leerFiltros(
  params: Awaited<PageProps["searchParams"]>,
): FiltrosBusqueda {
  const tecnologia = texto(params.tecnologia);
  const polaridad = texto(params.polaridad);
  return {
    q: texto(params.q),
    marca: texto(params.marca),
    caja: texto(params.caja),
    tecnologia: TECNOLOGIAS.find((t) => t === tecnologia),
    polaridad: POLARIDADES.find((p) => p === polaridad),
  };
}

const hayFiltros = (f: FiltrosBusqueda) => Object.values(f).some(Boolean);

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const filtros = leerFiltros(await searchParams);

  return {
    title: filtros.q
      ? `Resultados para "${filtros.q}" | Baterías GMA`
      : "Catálogo de baterías para carro en Bogotá | Baterías GMA",
    description:
      "Busca tu batería por referencia, caja, polaridad o tecnología. Cotiza por WhatsApp en Grupo Miscelánea Automotriz S.A.S.",
    alternates: { canonical: "/baterias" },
    // Las combinaciones de busqueda son infinitas y casi iguales entre si:
    // solo el catalogo completo se indexa. Las fichas son las que posicionan.
    ...(hayFiltros(filtros) ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const filtros = leerFiltros(params);
  const [resultados, opciones] = await Promise.all([
    buscarBaterias(filtros),
    opcionesDeFiltro(),
  ]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fef2f2_0%,#ffffff_40%,#fff7ed_100%)] text-zinc-900 pt-15">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Catálogo
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Encuentra tu batería
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-700 sm:text-lg">
            Busca por referencia (por ejemplo NS40R670), por caja o por marca.
          </p>
        </div>

        {/* `key` con los filtros actuales: los campos no son controlados, y sin
            esto "Limpiar" cambia la URL pero deja los valores viejos escritos. */}
        <Form
          key={JSON.stringify(filtros)}
          action="/baterias"
          // Dos columnas desde movil: en una sola, los filtros llenaban la
          // primera pantalla y los resultados quedaban debajo, sin verse.
          className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm sm:gap-4 lg:grid-cols-6 lg:items-end"
        >
          <label className="col-span-2 flex flex-col gap-1 text-sm font-medium text-zinc-700">
            Referencia o nombre
            <Input
              type="search"
              name="q"
              defaultValue={filtros.q}
              placeholder="NS40R670, 42, Duncan…"
            />
          </label>
          <SelectFiltro
            name="marca"
            label="Marca"
            defaultValue={filtros.marca}
            opciones={opciones.marcas.map((m) => ({ value: m.slug, label: m.name }))}
          />
          <SelectFiltro
            name="caja"
            label="Caja"
            defaultValue={filtros.caja}
            opciones={opciones.cajas.map((c) => ({ value: c, label: c }))}
          />
          <SelectFiltro
            name="polaridad"
            label="Polaridad"
            defaultValue={filtros.polaridad}
            opciones={opciones.polaridades.map((p) => ({
              value: p,
              label: p === "derecha" ? "Derecha" : "Izquierda",
            }))}
          />
          <SelectFiltro
            name="tecnologia"
            label="Tecnología"
            defaultValue={filtros.tecnologia}
            opciones={opciones.tecnologias.map((t) => ({ value: t, label: t }))}
          />
          <div className="col-span-2 flex gap-2 lg:col-span-6">
            <Button type="submit">Buscar</Button>
            {hayFiltros(filtros) ? (
              <Button variant="outline" asChild>
                <Link href="/baterias">Limpiar</Link>
              </Button>
            ) : null}
          </div>
        </Form>

        <p className="text-sm text-zinc-600" aria-live="polite">
          {resultados.length === 1
            ? "1 referencia"
            : `${resultados.length} referencias`}
        </p>

        {resultados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/80 p-8 text-sm text-zinc-600 shadow-sm backdrop-blur">
            No encontramos baterías con esos datos. Prueba con menos filtros o
            escríbenos por WhatsApp y te ayudamos a encontrarla.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {resultados.map(({ bateria, marca }) => (
              <TarjetaBateria key={bateria.id} bateria={bateria} marca={marca} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
