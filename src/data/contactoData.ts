export type Sede = {
  id: string;
  nombre: string;
  direccion: string;
  /** Como se ve escrito en pantalla: "311 841 8032". */
  telefono: string;
  /** Como se marca: href="tel:+573118418032". */
  tel: string;
  /** Solo dígitos con el 57, para wa.me: "573118418032". */
  whatsapp: string;
  horarios: string[];
};

/**
 * Identificación del vendedor. La Ley 1480 de 2011 (art. 50) exige mostrarla
 * en todo sitio que venda por internet: razón social, NIT, dirección,
 * teléfono y correo. Escrita una sola vez para que el footer, las páginas
 * legales y la de contacto no puedan decir cosas distintas.
 */
export const EMPRESA = {
  razonSocial: "Grupo Miscelánea Automotriz S.A.S.",
  nit: "900.406.797-1",
  correo: "gmacarrosymotos@gmail.com",
};

/**
 * Domicilio en Bogotá el mismo día si el pedido se confirma antes de esta hora.
 * Lo usan el carrito, la ficha y los términos y condiciones.
 */
export const HORA_CORTE_ENTREGA = "4:00 p. m.";

/** Página de la autoridad de protección al consumidor. La Ley 1480 (art. 50)
 *  pide un enlace visible a ella en todo sitio de comercio electrónico. */
export const URL_SIC = "https://www.sic.gov.co";

/**
 * Línea de venta de Baterías GMA. No pertenece a ninguna sede, por eso vive
 * aparte y no dentro de `sedes`: es el número que aparece en las fichas de
 * producto y en el botón "Contáctanos" de la portada.
 */
export const WHATSAPP_COMERCIAL = "573027015752";

/**
 * Las dos sedes. Antes estos datos estaban escritos a mano en el footer, en
 * la página de contacto y en la ficha de producto, hasta tres veces cada uno.
 * Al cambiar un teléfono había que acordarse de todos los lugares; se
 * olvidaba uno y el sitio mostraba dos números distintos para la misma sede.
 */
export const sedes: Sede[] = [
  {
    id: "eduardo-santos",
    nombre: "Sede Eduardo Santos",
    direccion: "Calle 1 #18-64, Bogotá, Eduardo Santos",
    telefono: "311 841 8032",
    tel: "+573118418032",
    whatsapp: "573118418032",
    horarios: [
      "Lunes a Viernes: 8:00 AM - 6:00 PM",
      "Sábado: 8:00 AM - 5:00 PM",
      "Domingo: 9:00 AM - 2:00 PM",
    ],
  },
  {
    id: "restrepo",
    nombre: "Sede Restrepo",
    direccion: "Av. Caracas #18-64, Restrepo",
    telefono: "313 800 4214",
    tel: "+573138004214",
    whatsapp: "573138004214",
    horarios: [
      "Lunes a Viernes: 8:00 AM - 6:00 PM",
      "Sábado: 8:00 AM - 5:00 PM",
      "Domingo: Cerrado",
    ],
  },
];

export function sedePorId(id: string): Sede | undefined {
  return sedes.find((s) => s.id === id);
}
