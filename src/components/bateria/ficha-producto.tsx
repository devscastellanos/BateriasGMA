import Image from "next/image";
import Link from "next/link";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { waMeUrl } from "@/lib/utils";
import { HORA_CORTE_ENTREGA, WHATSAPP_COMERCIAL } from "@/data/contactoData";
import { AgregarAlCarrito } from "@/components/carrito/agregar-al-carrito";
import { getFotoBateria, marcaDe, type Bateria, type Marca } from "@/lib/catalogo";
import { LEYENDA_PRECIO, formatearPrecio } from "@/lib/precio";

// Mismo criterio que el catalogo: el tipo sale de `badgeVariants` para no
// repetir una lista manual que se queda atras.
const TECH_VARIANT = {
  PLOMO: "destructive",
  EFB: "muted",
  AGM: "black",
} satisfies Record<string, NonNullable<BadgeVariant>>;

const Vacio = () => (
  <span className="font-sans font-normal text-zinc-400">—</span>
);

function Fila({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3">
      <dt className="text-sm text-zinc-600">{label}</dt>
      <dd className="text-right font-mono text-sm font-semibold text-zinc-900">
        {children}
      </dd>
    </div>
  );
}

export default function FichaProducto({
  bateria,
  marca,
}: {
  bateria: Bateria;
  marca: Marca;
}) {
  const mensaje = waMeUrl(
    WHATSAPP_COMERCIAL,
    `Buen día, estoy interesado en la ${bateria.titulo} (referencia ${bateria.referencia}). ¿Tienen disponibilidad?`,
  );

  const foto = getFotoBateria(bateria);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fef2f2_0%,#ffffff_40%,#fff7ed_100%)] text-zinc-900 pt-15">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav className="mb-6 text-sm text-zinc-600">
          <Link href="/" className="hover:text-zinc-900 hover:underline">
            Inicio
          </Link>
          <span className="px-2 text-zinc-400">/</span>
          <Link
            href={`/baterias/${marca.slug}`}
            className="hover:text-zinc-900 hover:underline"
          >
            {marca.name}
          </Link>
          <span className="px-2 text-zinc-400">/</span>
          <span className="text-zinc-900">{bateria.referencia}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Foto */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-6 sm:p-10">
              {foto ? (
                <Image
                  src={foto}
                  alt={`Batería ${marcaDe(bateria, marca)} referencia ${bateria.referencia}`}
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="h-full w-full object-contain"
                  priority
                />
              ) : (
                <p className="max-w-xs px-6 text-center text-sm text-zinc-500">
                  La fotografía de esta referencia está pendiente. Te
                  confirmamos disponibilidad y medidas por WhatsApp.
                </p>
              )}
            </div>
          </div>

          {/* Referencia + datos */}
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-mono text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {bateria.titulo}
              </h1>
            </div>

            {/*<p className="mt-2 text-lg text-zinc-700">{bateria.titulo}</p>*/}

            <p
              className={
                "mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium " +
                (bateria.disponible
                  ? "bg-green-100 text-green-800"
                  : "bg-zinc-200 text-zinc-700")
              }
            >
              {bateria.disponible ? "Disponible" : "No disponible"}
            </p>

            {/* El precio va suelto y arriba, no como una fila más de la tabla
                de abajo. Es el número con el que entra la gente a esta página y,
                mezclado con "Caja" y "CCA", quedaba perdido. */}
            <p className="mt-5 text-4xl font-bold tracking-tight text-zinc-900">
              {formatearPrecio(bateria.precio)}
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {/* Sin punto final: HORA_CORTE_ENTREGA ya termina en "p. m." */}
              {LEYENDA_PRECIO}. Entrega el mismo día si confirmas antes de las{" "}
              {HORA_CORTE_ENTREGA}
            </p>

            {/* Cada fila aparece siempre. Cuando el dato no esta cargado se
                muestra el guion, para que se note que falta en lugar de
                parece que la pagina se rompio. */}
            <dl className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
              <Fila label="Marca">{marcaDe(bateria, marca)}</Fila>
              <Fila label="Referencia">{bateria.referencia}</Fila>
              <Fila label="Caja">{bateria.caja || <Vacio />}</Fila>
              <Fila label="Polaridad">{bateria.polaridad ?? <Vacio />}</Fila>
              <Fila label="Amperaje">
                {bateria.amperaje ?? <Vacio />}
                {bateria.amperaje ? (
                  <span className="ml-1 font-sans font-normal text-zinc-500">
                    A
                  </span>
                ) : null}
              </Fila>
              <Fila label="CCA">
                {bateria.cca ?? <Vacio />}
                {bateria.cca ? (
                  <span className="ml-1 font-sans font-normal text-zinc-500">
                    A
                  </span>
                ) : null}
              </Fila>
              <Fila label="Tecnología">{bateria.tecnologia ?? <Vacio />}</Fila>
            </dl>

            {bateria.polaridad ? null : (
              <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                La polaridad de esta referencia no está cargada todavía.
                Confírmala con nosotros antes de comprar: con la polaridad
                invertida la batería no instala.
              </p>
            )}

            <AgregarAlCarrito
              id={bateria.id}
              titulo={bateria.titulo}
              disponible={bateria.disponible}
              className="mt-8 h-11 w-full"
            />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <a
                href={mensaje}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-green-600 px-5 sm:flex-1 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                Cotizar por WhatsApp
              </a>
              <a
                href={`tel:+${WHATSAPP_COMERCIAL}`}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 px-5 sm:flex-1 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Llamar y cotizar
              </a>
            </div>

            <p className="mt-6 text-sm text-zinc-600">
              <Link
                href={`/baterias/${marca.slug}`}
                className="text-red-700 underline underline-offset-4 hover:text-red-800"
              >
                Ver todas las baterías {marca.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
