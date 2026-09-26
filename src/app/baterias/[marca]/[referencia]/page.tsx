import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FichaProducto from "@/components/bateria/ficha-producto";
import { baterias, SIN_FOTO } from "@/data/bateriaData";
import { marcas } from "@/data/marcasData";
import { getCloudinaryProductoUrl } from "@/lib/cloudinary";

type PageProps = {
  params: Promise<{ marca: string; referencia: string }>;
};

/** Busca marca y bateria tolerando mayusculas: la URL canonica va en
 *  minusculas, pero `/baterias/duncan/NS40R670` deberia funcionar igual. */
function buscar(marcaSlug: string, referencia: string) {
  const marca = marcas.find((m) => m.slug === marcaSlug && m.activo);
  if (!marca) return null;

  const bateria = baterias.find(
    (b) =>
      b.marcaId === marca.id &&
      b.referencia.toLowerCase() === referencia.toLowerCase(),
  );
  if (!bateria) return null;

  return { marca, bateria };
}

/** Las 31 fichas se generan en el build. `dynamicParams` se deja en su valor
 *  por defecto a proposito: en vez de un 404 para las mayusculas, la pagina
 *  las resuelve en servidor con la misma busqueda insensible a mayusculas. */
export function generateStaticParams() {
  return baterias.flatMap((bateria) => {
    const marca = marcas.find((m) => m.id === bateria.marcaId && m.activo);
    if (!marca) return [];
    return [{ marca: marca.slug, referencia: bateria.referencia.toLowerCase() }];
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { marca: marcaSlug, referencia } = await params;
  const encontrado = buscar(marcaSlug, referencia);
  if (!encontrado) return {};

  const { marca, bateria } = encontrado;
  const url = `/baterias/${marca.slug}/${bateria.referencia.toLowerCase()}`;

  // La descripción solo menciona datos que existen en el registro. Donde no
  // hay caja o polaridad no se pone nada: es preferible una descripción corta
  // y cierta que una larga con datos inventados.
  const partes = [`Batería ${marca.name} referencia ${bateria.referencia}`];
  if (bateria.caja) partes.push(`caja ${bateria.caja}`);
  if (bateria.polaridad)
    partes.push(`polaridad ${bateria.polaridad === "derecha" ? "derecha" : "izquierda"}`);
  partes.push("disponible en Bogotá");

  const sinFoto = !bateria.publicId || SIN_FOTO.has(bateria.publicId);

  return {
    title: `${bateria.referencia} — Batería ${marca.name} | Baterías GMA`,
    description: `${partes.join(", ")}. Cotiza por WhatsApp en Grupo Miscelánea Automotriz S.A.S.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${bateria.referencia} — Batería ${marca.name}`,
      description: partes.join(", "),
      url,
      type: "website",
      locale: "es_CO",
      ...(sinFoto
        ? {}
        : { images: [{ url: getCloudinaryProductoUrl(bateria.publicId) }] }),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { marca: marcaSlug, referencia } = await params;
  const encontrado = buscar(marcaSlug, referencia);

  if (!encontrado) notFound();

  return <FichaProducto bateria={encontrado.bateria} marca={encontrado.marca} />;
}
