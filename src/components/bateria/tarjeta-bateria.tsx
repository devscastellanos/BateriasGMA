import Image from "next/image";
import Link from "next/link";

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
import { Badge, type BadgeVariant } from "../ui/badge";
import { getFotoBateria, marcaDe, urlFicha, type Bateria, type Marca } from "@/lib/catalogo";
import { AgregarAlCarrito } from "@/components/carrito/agregar-al-carrito";
import { LEYENDA_PRECIO, formatearPrecio } from "@/lib/precio";

// El tipo se deriva de `badgeVariants` en vez de escribirse a mano: la lista
// manual se quedó atrás y le faltaban `muted` y `black`.
const TECH_VARIANT = {
  PLOMO: "destructive",
  EFB: "muted",
  AGM: "black",
} satisfies Record<string, NonNullable<BadgeVariant>>;

/** Tarjeta de una bateria. La usan el catalogo de marca y el buscador, para
 *  que un producto se vea igual sin importar por donde se llegue a el. */
export default function TarjetaBateria({
  bateria: item,
  marca,
}: {
  bateria: Bateria;
  marca: Marca;
}) {
  const ficha = urlFicha(marca, item);
  const foto = getFotoBateria(item);

  return (
    <Card className="overflow-hidden border-zinc-200 bg-white/90 shadow-lg shadow-zinc-900/5">
      {/* Toda el area de la imagen es el enlace a la ficha, igual
          que el boton "Ver detalle" de abajo. Con `c_fit` la foto
          entra completa, asi que el marco 4:3 la rodea con espacio
          en vez de recortarla. */}
      <Link
        href={ficha}
        aria-label={`Ver detalle de la ${item.titulo}`}
        className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-zinc-100"
      >
        {foto ? (
          // La foto ya llega sin margen (`e_trim`); el aire alrededor lo pone
          // este `inset-4`, igual para todas.
          <div className="absolute inset-4">
            <Image
              src={foto}
              alt={`Batería ${marcaDe(item, marca)} referencia ${item.referencia}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          </div>
        ) : (
          <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-zinc-500">
            Foto pendiente
          </p>
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
      {/* El precio va entre el encabezado y los botones: es el dato
          que hace que la tarjeta sirva para decidir, y queda
          justo encima de donde empieza la acción. */}
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-zinc-900">
          {formatearPrecio(item.precio)}
        </p>
        <p className="text-xs text-zinc-500">{LEYENDA_PRECIO}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-1/2">
          <Link href={ficha}>Ver detalle</Link>
        </Button>
        <AgregarAlCarrito
          id={item.id}
          titulo={item.titulo}
          disponible={item.disponible}
          className="w-1/2"
        />
      </CardFooter>
    </Card>
  );
}
