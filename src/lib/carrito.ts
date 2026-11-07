"use client";

import { useSyncExternalStore } from "react";

/**
 * Carrito de compras, guardado en el navegador (`localStorage`).
 *
 * Solo se guarda `{ id, cantidad }`. El titulo, el precio y la foto se buscan
 * en el catalogo cada vez que se muestra el carrito: si se guardara el precio,
 * un cambio de precio dejaria carritos viejos cobrando el valor anterior.
 *
 * Es un store externo leido con `useSyncExternalStore` y no un Context: asi no
 * hace falta envolver el layout, el servidor siempre renderiza el carrito vacio
 * sin errores de hidratacion, y dos pestañas abiertas se mantienen iguales.
 */
export type LineaCarrito = { id: string; cantidad: number };

/** Tope por referencia. Mas que esto es un pedido mayorista y se habla aparte. */
export const MAX_POR_REFERENCIA = 10;

// Con version en la clave: si la forma de lo guardado cambia, se sube a `v2`
// y los carritos viejos se ignoran en vez de romper la pagina.
const CLAVE = "gma:carrito:v1";
const VACIO: LineaCarrito[] = [];

let cache: LineaCarrito[] | null = null;
const oyentes = new Set<() => void>();

function leer(): LineaCarrito[] {
  if (cache) return cache;
  try {
    const crudo = JSON.parse(localStorage.getItem(CLAVE) ?? "[]");
    cache = Array.isArray(crudo)
      ? crudo.filter(
          (l): l is LineaCarrito =>
            typeof l?.id === "string" &&
            Number.isInteger(l?.cantidad) &&
            l.cantidad > 0,
        )
      : VACIO;
  } catch {
    // Navegacion privada, almacenamiento bloqueado o JSON corrupto.
    cache = VACIO;
  }
  return cache;
}

function escribir(lineas: LineaCarrito[]) {
  cache = lineas;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lineas));
  } catch {
    // Sin almacenamiento el carrito sigue funcionando mientras la pagina este abierta.
  }
  oyentes.forEach((avisar) => avisar());
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  const otraPestana = (e: StorageEvent) => {
    if (e.key !== CLAVE) return;
    cache = null;
    avisar();
  };
  window.addEventListener("storage", otraPestana);
  return () => {
    oyentes.delete(avisar);
    window.removeEventListener("storage", otraPestana);
  };
}

const limitar = (n: number) => Math.min(Math.max(n, 0), MAX_POR_REFERENCIA);

export function useCarrito() {
  const lineas = useSyncExternalStore(suscribir, leer, () => VACIO);

  return {
    lineas,
    unidades: lineas.reduce((total, l) => total + l.cantidad, 0),

    agregar(id: string, cantidad = 1) {
      const actual = leer();
      const existente = actual.find((l) => l.id === id);
      escribir(
        existente
          ? actual.map((l) =>
              l.id === id ? { ...l, cantidad: limitar(l.cantidad + cantidad) } : l,
            )
          : [...actual, { id, cantidad: limitar(cantidad) }],
      );
    },

    /** Con 0 la linea se quita. */
    cambiarCantidad(id: string, cantidad: number) {
      const n = limitar(cantidad);
      escribir(
        n === 0
          ? leer().filter((l) => l.id !== id)
          : leer().map((l) => (l.id === id ? { ...l, cantidad: n } : l)),
      );
    },

    quitar(id: string) {
      escribir(leer().filter((l) => l.id !== id));
    },

    vaciar() {
      escribir(VACIO);
    },
  };
}
