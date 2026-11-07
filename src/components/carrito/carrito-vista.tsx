"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MAX_POR_REFERENCIA, useCarrito } from "@/lib/carrito";
import {
  DESCUENTO_USADA,
  TIPOS_DOCUMENTO,
  mensajePedido,
  resumenPedido,
  type DatosPedido,
  type Entrega,
  type LineaPedido,
} from "@/lib/pedido";
import { LEYENDA_PRECIO, formatearPrecio } from "@/lib/precio";
import { openWhatsApp } from "@/lib/utils";
import { HORA_CORTE_ENTREGA, WHATSAPP_COMERCIAL } from "@/data/contactoData";

export type ProductoCarrito = {
  id: string;
  titulo: string;
  referencia: string;
  marca: string;
  precio: number;
  disponible: boolean;
  foto: string | null;
  url: string;
};

type SedeResumen = { id: string; nombre: string; direccion: string };

// `false` en el servidor y en la hidratacion, `true` despues. Sin esto, quien
// tiene productos guardados veria un instante "Tu carrito esta vacio".
const sinSuscripcion = () => () => {};
const useMontado = () =>
  useSyncExternalStore(sinSuscripcion, () => true, () => false);

const etiqueta = "flex flex-col gap-1 text-sm font-medium text-zinc-700";

export default function CarritoVista({
  productos,
  sedes,
}: {
  productos: Record<string, ProductoCarrito>;
  sedes: SedeResumen[];
}) {
  const montado = useMontado();
  const { lineas, cambiarCantidad, quitar, vaciar } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [tipoDoc, setTipoDoc] = useState<DatosPedido["documento"]["tipo"]>("CC");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [correo, setCorreo] = useState("");
  // Ley 1581: autorizacion previa, expresa e informada. Las casillas empiezan
  // sin marcar y son obligatorias; marcarlas por defecto no vale como
  // autorizacion.
  const [aceptaDatos, setAceptaDatos] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState<Entrega["tipo"]>("domicilio");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [sedeId, setSedeId] = useState(sedes[0]?.id ?? "");
  const [entregaUsada, setEntregaUsada] = useState(false);
  const [vehiculo, setVehiculo] = useState("");
  const [notas, setNotas] = useState("");
  const [enviado, setEnviado] = useState(false);

  if (!montado) return null;

  // Un id que ya no esta en el catalogo (referencia retirada) se descarta sin
  // mostrarse: no hay nada que ensenar ni que se pueda pedir.
  const items = lineas.flatMap((l) => {
    const producto = productos[l.id];
    return producto ? [{ producto, cantidad: l.cantidad }] : [];
  });
  const pedibles: LineaPedido[] = items
    .filter(({ producto }) => producto.disponible)
    .map(({ producto, cantidad }) => ({
      titulo: producto.titulo,
      referencia: producto.referencia,
      precio: producto.precio,
      cantidad,
    }));
  const resumen = resumenPedido(pedibles, entregaUsada);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/80 p-8 text-sm text-zinc-600 shadow-sm">
        Tu carrito está vacío.{" "}
        <Link href="/baterias" className="text-red-700 underline underline-offset-4">
          Buscar baterías
        </Link>
      </div>
    );
  }

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const sede = sedes.find((s) => s.id === sedeId);
    const entrega: Entrega =
      tipoEntrega === "domicilio"
        ? { tipo: "domicilio", direccion: direccion.trim(), barrio: barrio.trim() || undefined }
        : { tipo: "sede", sede: sede ? `${sede.nombre} (${sede.direccion})` : sedeId };

    openWhatsApp(
      WHATSAPP_COMERCIAL,
      mensajePedido(pedibles, {
        nombre: nombre.trim(),
        documento: { tipo: tipoDoc, numero: numeroDoc.trim() },
        correo: correo.trim(),
        entrega,
        entregaUsada,
        vehiculo: vehiculo.trim() || undefined,
        notas: notas.trim() || undefined,
      }),
    );
    setEnviado(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
      <ul className="flex flex-col gap-4">
        {items.map(({ producto, cantidad }) => (
          <li
            key={producto.id}
            className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm"
          >
            <Link
              href={producto.url}
              className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100"
            >
              {producto.foto ? (
                <Image
                  src={producto.foto}
                  alt={producto.titulo}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              ) : null}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <Link href={producto.url} className="font-semibold hover:underline">
                  {producto.titulo}
                </Link>
                <button
                  type="button"
                  onClick={() => quitar(producto.id)}
                  aria-label={`Quitar ${producto.titulo}`}
                  className="text-zinc-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <p className="text-sm text-zinc-600">Ref. {producto.referencia}</p>
              {producto.disponible ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Quitar una"
                      onClick={() => cambiarCantidad(producto.id, cantidad - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-8 text-center font-mono" aria-live="polite">
                      {cantidad}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Agregar una"
                      disabled={cantidad >= MAX_POR_REFERENCIA}
                      onClick={() => cambiarCantidad(producto.id, cantidad + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <span className="font-semibold">
                    {formatearPrecio(producto.precio * cantidad)}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-amber-800">
                  Esta referencia ya no está disponible y no se incluye en el pedido.
                </p>
              )}
            </div>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={vaciar}
            className="text-sm text-zinc-500 underline underline-offset-4 hover:text-red-700"
          >
            Vaciar carrito
          </button>
        </li>
      </ul>

      <form
        onSubmit={enviar}
        className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-sm"
      >
        <dl className="flex flex-col gap-1">
          {resumen.descuento ? (
            <>
              <div className="flex items-baseline justify-between text-sm text-zinc-600">
                <dt>Subtotal</dt>
                <dd>{formatearPrecio(resumen.subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between text-sm text-green-700">
                <dt>Batería usada ({resumen.unidades} × {formatearPrecio(DESCUENTO_USADA)})</dt>
                <dd>-{formatearPrecio(resumen.descuento)}</dd>
              </div>
            </>
          ) : null}
          <div className="flex items-baseline justify-between">
            <dt className="text-zinc-600">Total</dt>
            <dd className="text-2xl font-bold">{formatearPrecio(resumen.total)}</dd>
          </div>
          <p className="text-right text-xs text-zinc-500">{LEYENDA_PRECIO}</p>
        </dl>

        <label className={etiqueta}>
          ¿Entregas tu batería usada?
          <select
            value={entregaUsada ? "si" : "no"}
            onChange={(e) => setEntregaUsada(e.target.value === "si")}
            className="h-9 rounded-lg border border-zinc-300 bg-white px-2 text-sm text-zinc-900"
          >
            <option value="no">No</option>
            <option value="si">
              Sí — {formatearPrecio(DESCUENTO_USADA)} menos por cada batería
            </option>
          </select>
        </label>

        <label className={etiqueta}>
          Nombre
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>

        {/* Para la factura electronica: a quien se emite y a donde llega. */}
        <div className="grid grid-cols-[6.5rem_1fr] gap-2">
          <label className={etiqueta}>
            Documento
            <select
              value={tipoDoc}
              onChange={(e) => setTipoDoc(e.target.value as typeof tipoDoc)}
              className="h-9 rounded-lg border border-zinc-300 bg-white px-2 text-sm text-zinc-900"
            >
              {TIPOS_DOCUMENTO.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className={etiqueta}>
            Número
            <Input
              required
              inputMode={tipoDoc === "Pasaporte" ? "text" : "numeric"}
              value={numeroDoc}
              onChange={(e) => setNumeroDoc(e.target.value)}
            />
          </label>
        </div>
        <label className={etiqueta}>
          Correo para la factura electrónica
          <Input
            required
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>

        <fieldset className="flex flex-col gap-2 text-sm">
          <legend className="mb-1 font-medium text-zinc-700">Entrega</legend>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="entrega"
              checked={tipoEntrega === "domicilio"}
              onChange={() => setTipoEntrega("domicilio")}
            />
            Domicilio (solo Bogotá)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="entrega"
              checked={tipoEntrega === "sede"}
              onChange={() => setTipoEntrega("sede")}
            />
            Recoger en una sede
          </label>
        </fieldset>

        {tipoEntrega === "domicilio" ? (
          <>
            <label className={etiqueta}>
              Dirección en Bogotá
              <Input
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle 00 #00-00"
              />
            </label>
            <label className={etiqueta}>
              Barrio (opcional)
              <Input value={barrio} onChange={(e) => setBarrio(e.target.value)} />
            </label>
            <p className="text-xs text-zinc-500">
              Entregamos el mismo día si el asesor confirma tu pedido antes de
              las {HORA_CORTE_ENTREGA}
            </p>
          </>
        ) : (
          <label className={etiqueta}>
            Sede
            <select
              value={sedeId}
              onChange={(e) => setSedeId(e.target.value)}
              className="h-9 rounded-lg border border-zinc-300 bg-white px-2 text-sm text-zinc-900"
            >
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} — {s.direccion}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className={etiqueta}>
          Tu vehículo (opcional)
          <Input
            value={vehiculo}
            onChange={(e) => setVehiculo(e.target.value)}
            placeholder="Marca, modelo y año"
          />
        </label>
        <label className={etiqueta}>
          Notas (opcional)
          <Textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={2} />
        </label>

        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            required
            checked={aceptaDatos}
            onChange={(e) => setAceptaDatos(e.target.checked)}
            className="mt-1"
          />
          <span>
            Autorizo el tratamiento de mis datos personales para gestionar este
            pedido, según la{" "}
            <Link
              href="/politica-de-datos"
              target="_blank"
              className="text-red-700 underline underline-offset-4"
            >
              Política de tratamiento de datos
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            required
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className="mt-1"
          />
          <span>
            Acepto los{" "}
            <Link
              href="/terminos-y-condiciones"
              target="_blank"
              className="text-red-700 underline underline-offset-4"
            >
              Términos y condiciones
            </Link>
            .
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          disabled={pedibles.length === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          Enviar pedido por WhatsApp
        </Button>
        <p className="text-xs text-zinc-500">
          Se abre WhatsApp con tu pedido escrito. Un asesor confirma
          disponibilidad y entrega antes de cobrar.
        </p>

        {enviado ? (
          <div className="rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-900">
            ¿Ya enviaste el mensaje?{" "}
            <button
              type="button"
              onClick={() => {
                vaciar();
                setEnviado(false);
              }}
              className="font-medium underline underline-offset-4"
            >
              Vaciar el carrito
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
