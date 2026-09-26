import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marcas } from "@/data/marcasData";
import { baterias, SIN_FOTO } from "@/data/bateriaData";
import { getCloudinaryProductoUrl } from "@/lib/cloudinary";
import { Badge, type BadgeVariant } from "../ui/badge";
import { waMeUrl } from "@/lib/utils";
import { WHATSAPP_COMERCIAL } from "@/data/contactoData";

type BrandCatalogPageProps = {
  marcaSlug: string;
};

// El tipo se deriva de `badgeVariants` en vez de escribirse a mano: la lista
// manual se quedó atrás y le faltaban `muted` y `black`.
const TECH_VARIANT = {
  PLOMO: "destructive",
  EFB: "muted",
  AGM: "black",
} satisfies Record<string, NonNullable<BadgeVariant>>;

export default function BrandCatalogPage({ marcaSlug }: BrandCatalogPageProps) {
  const marca = marcas.find((item) => item.slug === marcaSlug && item.activo);

  const marcaBaterias = baterias.filter((b) => b.marcaId === marca?.id);

  if (!marca) {
    notFound();
  }

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
            {marcaBaterias.map((item) => {
              const ficha = `/baterias/${marca.slug}/${item.referencia.toLowerCase()}`;
              const sinFoto = !item.publicId || SIN_FOTO.has(item.publicId);

              return (
                <Card
                  key={item.id}
                  className="overflow-hidden border-zinc-200 bg-white/90 shadow-lg shadow-zinc-900/5"
                >
                  {/* Toda el area de la imagen es el enlace a la ficha, igual
                      que el boton "Ver detalle" de abajo. Con `c_fit` la foto
                      entra completa, asi que el marco 4:3 la rodea con espacio
                      en vez de recortarla. */}
                  <Link
                    href={ficha}
                    aria-label={`Ver detalle de la ${item.titulo}`}
                    className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-zinc-100"
                  >
                    {sinFoto ? (
                      <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-zinc-500">
                        Foto pendiente
                      </p>
                    ) : (
                      <Image
                        src={getCloudinaryProductoUrl(item.publicId)}
                        alt={`Batería ${marca.name} referencia ${item.referencia}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain transition-opacity duration-200 group-hover:opacity-80"
                      />
                    )}
                  </Link>
                  <CardHeader>
                    <CardTitle>{item.titulo}</CardTitle>
                    {/* Antes este badge caia a `?? "PLOMO"`, que affirmaba una
                        tecnologia en las 20 referencias que no la tienen
                        declarada. Si no hay dato, no se muestra nada. */}
                    {item.tecnologia ? (
                      <CardAction>
                        <Badge variant={TECH_VARIANT[item.tecnologia]}>
                          {item.tecnologia}
                        </Badge>
                      </CardAction>
                    ) : null}
                    <CardDescription>
                      {item.referencia}{" "}
                      {item.disponible ? "• Disponible" : "• No disponible"}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-1/2">
                      <Link href={ficha}>Ver detalle</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-1/2 bg-green-600 hover:bg-green-600"
                    >
                      <a
                        href={waMeUrl(
                          WHATSAPP_COMERCIAL,
                          "Buen día, estoy interesado en comprar una " +
                            item.titulo +
                            " para mi carro.",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Comprar
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
