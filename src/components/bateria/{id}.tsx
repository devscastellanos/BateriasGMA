"use client";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marcas } from "@/data/marcasData";
import { baterias } from "@/data/bateriaData";
import { getCloudinaryDetailUrl } from "@/lib/cloudinary";
import { Badge } from "../ui/badge";
import { openWhatsApp } from "@/lib/utils";

type BrandCatalogPageProps = {
  id: string;
};

export default function BrandCatalogPage({ id }: BrandCatalogPageProps) {
  const marca = marcas.find((item) => item.slug === id && item.activo);

  const marcaBaterias = baterias.filter((b) => b.marcaId === marca?.id);

  const TECH_VARIANT: Record<
    string,
    "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  > = {
    PLOMO: "destructive",
    EFB: "muted",
    AGM: "black",
  };

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
            {marcaBaterias.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border-zinc-200 bg-white/90 shadow-lg shadow-zinc-900/5"
              >
                <div className="relative aspect-[4/3] w-full bg-zinc-100">
                  <Image
                    src={getCloudinaryDetailUrl(item.publicId)}
                    alt="event cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="relative z-20 aspect-video w-full object-scale-down cursor-pointer"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{item.titulo}</CardTitle>
                  <CardAction>
                    <Badge
                      variant={
                        TECH_VARIANT[
                          String(item.tecnologia)?.toUpperCase() ?? "PLOMO"
                        ]
                      }
                    >
                      {item.tecnologia ?? "PLOMO"}
                    </Badge>
                  </CardAction>
                  <CardDescription>
                    {item.referencia}{" "}
                    {item.disponible ? "• Disponible" : "• No disponible"}
                  </CardDescription>
                </CardHeader>
                {/* <CardContent className="pb-5 text-xs text-zinc-500"></CardContent> */}
                <CardFooter>
                  <Button className="w-1/2">Ver detalles</Button>
                  <Button
                    className="w-1/2 bg-green-600 hover:bg-green-600"
                    onClick={() =>
                      openWhatsApp(
                        "573027015752",
                        "Buen día, estoy interesado en comprar una " +
                          item.titulo +
                          " para mi carro.",
                      )
                    }
                  >
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
