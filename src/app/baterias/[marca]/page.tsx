import type { Metadata } from "next";

import CatalogoMarca from "@/components/bateria/catalogo-marca";
import { marcas } from "@/data/marcasData";
import { baterias } from "@/data/bateriaData";

type PageProps = {
  params: Promise<{ marca: string }>;
};

/** Las marcas se generan en el build. Solo las activas. */
export function generateStaticParams() {
  return marcas.filter((m) => m.activo).map((m) => ({ marca: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { marca: slug } = await params;
  const marca = marcas.find((m) => m.slug === slug && m.activo);
  if (!marca) return {};

  const total = baterias.filter((b) => b.marcaId === marca.id).length;

  return {
    title: `Baterías ${marca.name} en Bogotá | Baterías GMA`,
    description: `${marca.descripcion} ${total} referencias disponibles. Cotiza por WhatsApp en Grupo Miscelánea Automotriz S.A.S.`,
    alternates: { canonical: `/baterias/${marca.slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { marca } = await params;

  return <CatalogoMarca marcaSlug={marca} />;
}
