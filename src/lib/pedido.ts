import { formatearPrecio } from "@/lib/precio";

/**
 * Texto del pedido que se envia por WhatsApp desde el carrito. Vive aparte de
 * la pantalla para que el formato del mensaje — lo que lee el vendedor — se
 * pueda revisar y cambiar en un solo lugar.
 */
export type LineaPedido = {
  titulo: string;
  referencia: string;
  precio: number;
  cantidad: number;
};

/**
 * Domicilio solo dentro de Bogota. Fuera de la ciudad no se despacha: quien
 * este afuera puede recoger en una sede.
 */
export type Entrega =
  | { tipo: "domicilio"; direccion: string; barrio?: string }
  | { tipo: "sede"; sede: string };

/** Tipos de documento que acepta la factura electronica para personas y
 *  empresas. */
export const TIPOS_DOCUMENTO = ["CC", "NIT", "CE", "Pasaporte"] as const;

export type DatosPedido = {
  nombre: string;
  /** Para la factura electronica: a quien se emite y a donde se envia. */
  documento: { tipo: (typeof TIPOS_DOCUMENTO)[number]; numero: string };
  correo: string;
  entrega: Entrega;
  /** El cliente entrega sus baterias usadas (una por cada bateria nueva). */
  entregaUsada: boolean;
  vehiculo?: string;
  notas?: string;
};

/**
 * Descuento por entregar la bateria usada, por cada bateria del pedido: cada
 * nueva se cambia por una usada. El precio publicado es el de quien NO la
 * entrega (ver `precio` en `bateriaData.ts`).
 */
export const DESCUENTO_USADA = 30000;

export function resumenPedido(lineas: LineaPedido[], entregaUsada: boolean) {
  const subtotal = lineas.reduce((total, l) => total + l.precio * l.cantidad, 0);
  const unidades = lineas.reduce((total, l) => total + l.cantidad, 0);
  const descuento = entregaUsada ? unidades * DESCUENTO_USADA : 0;
  return { subtotal, unidades, descuento, total: subtotal - descuento };
}

export function mensajePedido(lineas: LineaPedido[], datos: DatosPedido) {
  const productos = lineas.map(
    (l) =>
      `• ${l.cantidad} × ${l.titulo} (ref. ${l.referencia}) — ${formatearPrecio(l.precio * l.cantidad)}`,
  );

  const { subtotal, unidades, descuento, total } = resumenPedido(lineas, datos.entregaUsada);
  const totales = descuento
    ? [
        `Subtotal: ${formatearPrecio(subtotal)}`,
        `Descuento por batería usada (${unidades} × ${formatearPrecio(DESCUENTO_USADA)}): -${formatearPrecio(descuento)}`,
        `Total: ${formatearPrecio(total)}`,
      ]
    : [`Total: ${formatearPrecio(total)}`];

  // El precio ya incluye el domicilio en Bogota: no hay costo de envio aparte.
  const entrega =
    datos.entrega.tipo === "domicilio"
      ? `Entrega: domicilio en Bogotá — ${datos.entrega.direccion}` +
        (datos.entrega.barrio ? `, ${datos.entrega.barrio}` : "")
      : `Entrega: recojo en ${datos.entrega.sede}`;

  return [
    "Hola, quiero hacer este pedido:",
    "",
    ...productos,
    "",
    ...totales,
    "",
    `Nombre: ${datos.nombre}`,
    `Documento: ${datos.documento.tipo} ${datos.documento.numero}`,
    `Correo para la factura: ${datos.correo}`,
    entrega,
    `Entrego batería usada: ${datos.entregaUsada ? "Sí" : "No"}`,
    ...(datos.vehiculo ? [`Vehículo: ${datos.vehiculo}`] : []),
    ...(datos.notas ? [`Notas: ${datos.notas}`] : []),
  ].join("\n");
}
