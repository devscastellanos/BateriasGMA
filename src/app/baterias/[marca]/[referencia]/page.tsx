import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FichaProducto from "@/components/bateria/ficha-producto";
import {
  getFotoBateria,
  listarBaterias,
  marcaDe,
  obtenerBateria,
  urlFicha,
} from "@/lib/catalogo";

type PageProps = {
  params: Promise<{ marca: string; referencia: string }>;
};

/** Todas las fichas se generan en el build. `dynamicParams` se deja en su
 *  valor por defecto a proposito: en vez de un 404 para las mayusculas, la
 *  pagina las resuelve en servidor con `obtenerBateria`, que no distingue
 *  mayusculas. */
export async function generateStaticParams() {
  return (await listarBaterias()).map(({ bateria, marca }) => ({
    marca: marca.slug,
    referencia: bateria.referencia.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { marca: marcaSlug, referencia } = await params;
  const encontrado = await obtenerBateria(marcaSlug, referencia);
  if (!encontrado) return {};

  const { marca, bateria } = encontrado;
  const url = urlFicha(marca, bateria);

  // La descripción solo menciona datos que existen en el registro. Donde no
  // hay caja o polaridad no se pone nada: es preferible una descripción corta
  // y cierta que una larga con datos inventados.
  const nombreMarca = marcaDe(bateria, marca);
  const partes = [`Batería ${nombreMarca} referencia ${bateria.referencia}`];
  if (bateria.caja) partes.push(`caja ${bateria.caja}`);
  if (bateria.polaridad)
    partes.push(`polaridad ${bateria.polaridad === "derecha" ? "derecha" : "izquierda"}`);
  partes.push("disponible en Bogotá");

  // Sin foto no se manda imagen: antes se caia a `SIN_FOTO`, que hoy ya solo
  // cubre 8 de las 18 referencias sin fotografia. `getFotoBateria` decide.
  const foto = getFotoBateria(bateria);

  return {
    title: `${bateria.referencia} — Batería ${nombreMarca} | Baterías GMA`,
    description: `${partes.join(", ")}. Cotiza por WhatsApp en Grupo Miscelánea Automotriz S.A.S.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${bateria.referencia} — Batería ${nombreMarca}`,
      description: partes.join(", "),
      url,
      type: "website",
      locale: "es_CO",
      ...(foto ? { images: [{ url: foto }] } : {}),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { marca: marcaSlug, referencia } = await params;
  const encontrado = await obtenerBateria(marcaSlug, referencia);

  if (!encontrado) notFound();

  return <FichaProducto bateria={encontrado.bateria} marca={encontrado.marca} />;
}
