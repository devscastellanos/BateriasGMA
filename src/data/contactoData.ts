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
