import type { Metadata } from "next";

import CatalogoMarca from "@/components/bateria/catalogo-marca";
import { bateriasDeMarca, listarMarcas, obtenerMarca } from "@/lib/catalogo";

type PageProps = {
  params: Promise<{ marca: string }>;
};

/** Las marcas se generan en el build. Solo las activas. */
export async function generateStaticParams() {
  return (await listarMarcas()).map((m) => ({ marca: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { marca: slug } = await params;
  const marca = await obtenerMarca(slug);
  if (!marca) return {};

  const total = (await bateriasDeMarca(marca.id)).length;

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
