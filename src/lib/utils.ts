import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Abre un chat de WhatsApp en una nueva pestaña con mensaje prellenado.
 * Devuelve la URL construida para usos en servidor/tests.
 */
export function openWhatsApp(phone: string, message?: string) {
  const cleaned = phone.replace(/[^0-9+]/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  const url = encoded
    ? `https://wa.me/${cleaned}?text=${encoded}`
    : `https://wa.me/${cleaned}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
}
