import { getCloudinaryProductoUrl } from "@/lib/cloudinary";

export type Bateria = {
  id: string;

  marcaId: string;
  referencia: string;
  titulo: string;

  /**
   * Marca real de la bateria cuando `marcaId` es un grupo y no una marca: las
   * de "Otras marcas" (Varta, Optima…) llevan aca su nombre, para que la ficha
   * y Google digan "Batería Varta" y no "Batería Otras marcas". Se lee con
   * `marcaDe()` de `@/lib/catalogo`, nunca directo.
   */
  fabricante?: string;

  /**
   * Ruta del asset en Cloudinary. Opcional: cuando no hay foto simplemente no
   * se pone, y la pagina se publica igual sin imagen. Antes esto era
   * obligatorio y las que no tienen foto se listaban a mano en `SIN_FOTO` abajo.
   * Las 10 referencias de Willard todavia no tienen foto subida.
   */
  publicId?: string;

  caja?: string;
  amperaje?: number;
  cca?: number;

  polaridad?: "derecha" | "izquierda";

  tecnologia?: "PLOMO" | "EFB" | "AGM";

  /**
   * Precio de venta al público, en pesos, ya con impuestos y domicilio en
   * Bogotá incluidos (no hay costo de envío aparte en ningún lado). Número
   * crudo, sin `$` ni separador: el signo se lo pone `formatearPrecio()` al
   * mostrar, para que un número no quede con dos formatos distintos.
   *
   * OBLIGATORIO a propósito. Le Sacamos el `?` para que el sitio no se pueda
   * publicar con una batería sin precio: `tsc` deja de compilar en el build, y
   * eso es todo. No hay validación en runtime ni tests que se puedan saltar.
   *
   * De dónde sale: la lista FF-BATERIAS.xlsx (hoja BATERIAS) trae dos precios
   * por referencia; se usa el ALTO, el de quien no entrega la batería usada, y
   * se calcula `(alto + 20.000) × 1,10`, redondeado al múltiplo de 5.000 más
   * cercano. Ej.: 210.000 → 253.000 → 255.000. Al cambiar la lista hay que
   * recalcular con la misma fórmula.
   */
  precio: number;

  disponible: boolean;
};

// Referencias cuya foto no existe todavia en Cloudinary. Verificado con un
// HEAD por publicId: los 31 de este archivo devuelven 200 salvo estos 8, que
// devuelven 404. Vive aqui y no en la pagina para que cuando se suba la foto
// haya que borrar una entrada y no dos lugares.
//
// Hay una segunda forma de no tener foto, y es la que se esta usando de nuevo:
// no poner `publicId`. Los 4 lugares que dibujan la foto ya separan los dos
// casos con `!item.publicId || SIN_FOTO.has(item.publicId)`, asi que las 10 de
// Willard que se agregaron al final no aparecen ni aqui ni en ninguna parte.
export const SIN_FOTO = new Set([
  "Duncan/48R1300",
  "Duncan/481300",
  "Duncan/NS60750",
  "Duncan/27R1150",
  "Duncan/271150",
  "Duncan/31h1250",
  "Duncan/47R1300EFB",
  "Duncan/49R1600EFB",
]);

// `caja` y `polaridad` se sacaron del texto de cada `titulo`, que es donde ya
// estaban escritos. No se dedujo nada: si el título no lo decía, el campo se
// dejó vacío. Las referencias de MAC dicen solo el modelo ("N60L800M"), sin
// grupo ni polaridad, así que sus 8 registros van sin esos dos datos.
//
// Las 10 de Willard del final llegan distintas: vienen de una tabla que
// traia solo REFERENCIA y AMPERAJE, mas la nota de que todas son de polaridad
// derecha. Por eso llevan `polaridad` y no llevan `caja`.
export const baterias: Bateria[] = [
  {
    id: "NS40R670",
    marcaId: "duncan",
    referencia: "NS40R670",
    titulo: "Batería Duncan caja NS40 670",
    publicId: "Duncan/NS40R670",
    caja: "NS40",
    amperaje: 670,
    polaridad: "derecha",
    precio: 255000,
    disponible: true,
  },
  {
    id: "NS40R700",
    marcaId: "duncan",
    referencia: "NS40R700",
    titulo: "Batería Duncan caja NS40 700",
    publicId: "Duncan/NS40R700",
    caja: "NS40",
    amperaje: 700,
    polaridad: "derecha",
    precio: 255000,
    disponible: true,
  },
  {
    id: "42R850",
    marcaId: "duncan",
    referencia: "42R850",
    titulo: "Batería Duncan caja 42 850 / Polaridad derecha",
    caja: "42",
    amperaje: 850,
    cca: 500,
    polaridad: "derecha",
    publicId: "Duncan/42R850",
    precio: 350000,
    disponible: true,
  },
  {
    id: "42850",
    marcaId: "duncan",
    referencia: "42850",
    titulo: "Batería Duncan caja 42 850 / Polaridad izquierda",
    caja: "42",
    amperaje: 850,
    cca: 500,
    polaridad: "izquierda",
    publicId: "Duncan/42850",
    precio: 350000,
    disponible: true,
  },
  {
    id: "36R750",
    marcaId: "duncan",
    referencia: "36R750",
    titulo: "Batería Duncan caja 36 750 / Polaridad derecha",
    caja: "36",
    amperaje: 750,
    polaridad: "derecha",
    publicId: "Duncan/36R750",
    precio: 330000,
    disponible: true,
  },
  {
    id: "42R950",
    marcaId: "duncan",
    referencia: "42R950",
    titulo: "Batería Duncan caja 42 950 / Polaridad derecha",
    caja: "42",
    amperaje: 950,
    polaridad: "derecha",
    publicId: "Duncan/42R950",
    precio: 405000,
    disponible: true,
  },
  {
    id: "42950",
    marcaId: "duncan",
    referencia: "42950",
    titulo: "Batería Duncan caja 42 950 / Polaridad izquierda",
    caja: "42",
    polaridad: "izquierda",
    publicId: "Duncan/42950",
    precio: 405000,
    disponible: true,
  },
  {
    id: "34R1000",
    marcaId: "duncan",
    referencia: "34R1000",
    titulo: "Batería Duncan caja 34 1000 / Polaridad derecha",
    caja: "34",
    polaridad: "derecha",
    publicId: "Duncan/34R1000",
    precio: 450000,
    disponible: true,
  },
  {
    id: "341000",
    marcaId: "duncan",
    referencia: "341000",
    titulo: "Batería Duncan caja 34 1000 / Polaridad izquierda",
    caja: "34",
    polaridad: "izquierda",
    publicId: "Duncan/341000",
    precio: 450000,
    disponible: true,
  },
  {
    id: "48R1300",
    marcaId: "duncan",
    referencia: "48R1300",
    titulo: "Batería Duncan caja 48 1300 / Polaridad derecha",
    caja: "48",
    polaridad: "derecha",
    publicId: "Duncan/48R1300",
    precio: 450000,
    disponible: true,
  },
  {
    id: "481300",
    marcaId: "duncan",
    referencia: "481300",
    titulo: "Batería Duncan caja 48 1300 / Polaridad izquierda",
    caja: "48",
    polaridad: "izquierda",
    publicId: "Duncan/481300",
    precio: 450000,
    disponible: true,
  },
  {
    id: "NS60750",
    marcaId: "duncan",
    referencia: "NS60750",
    titulo: "Batería Duncan caja NS60 750 / Polaridad izquierda",
    caja: "NS60",
    polaridad: "izquierda",
    publicId: "Duncan/NS60750",
    precio: 375000,
    disponible: true,
  },
  {
    id: "NS60R750",
    marcaId: "duncan",
    referencia: "NS60R750",
    titulo: "Batería Duncan caja NS60 750 / Polaridad derecha",
    caja: "NS60",
    polaridad: "derecha",
    publicId: "Duncan/NS60R750",
    precio: 375000,
    disponible: true,
  },
  {
    id: "35R1000",
    marcaId: "duncan",
    referencia: "35R1000",
    titulo: "Batería Duncan caja 35 1000 / Polaridad derecha",
    caja: "35",
    polaridad: "derecha",
    publicId: "Duncan/35R1000",
    precio: 495000,
    disponible: true,
  },
  {
    id: "27R1150",
    marcaId: "duncan",
    referencia: "27R1150",
    titulo: "Batería Duncan caja 27 1150 / Polaridad derecha",
    caja: "27",
    polaridad: "derecha",
    publicId: "Duncan/27R1150",
    precio: 505000,
    disponible: true,
  },
  {
    id: "271150",
    marcaId: "duncan",
    referencia: "271150",
    titulo: "Batería Duncan caja 27 1150 / Polaridad izquierda",
    caja: "27",
    polaridad: "izquierda",
    publicId: "Duncan/271150",
    precio: 505000,
    disponible: true,
  },
  {
    id: "49R1300",
    marcaId: "duncan",
    referencia: "49R1300",
    titulo: "Batería Duncan caja 49 1300 / Polaridad derecha",
    caja: "49",
    polaridad: "derecha",
    publicId: "Duncan/49R1300",
    precio: 560000,
    disponible: true,
  },
  {
    id: "651100",
    marcaId: "duncan",
    referencia: "651100",
    titulo: "Batería Duncan caja 65 1100 / Polaridad izquierda",
    caja: "65",
    polaridad: "izquierda",
    publicId: "Duncan/651100",
    precio: 585000,
    disponible: true,
  },
  {
    id: "30h1250",
    marcaId: "duncan",
    referencia: "30h1250",
    titulo: "Batería Duncan caja 30H 1250 / Polaridad izquierda",
    caja: "30H",
    polaridad: "izquierda",
    publicId: "Duncan/30h1250",
    precio: 605000,
    disponible: true,
  },
  {
    id: "31h1250",
    marcaId: "duncan",
    referencia: "31h1250",
    titulo: "Batería Duncan caja 31H 1250 / Polaridad izquierda",
    caja: "31H",
    polaridad: "izquierda",
    publicId: "Duncan/31h1250",
    precio: 605000,
    disponible: true,
  },
  {
    id: "4D1500",
    marcaId: "duncan",
    referencia: "4D1500",
    titulo: "Batería Duncan caja 4D 1500 / Polaridad izquierda",
    caja: "4D",
    polaridad: "izquierda",
    publicId: "Duncan/4D1500",
    precio: 890000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "47R1300EFB",
    marcaId: "duncan",
    referencia: "47R1300EFB",
    titulo: "Batería Duncan caja 47 1300 EFB / Polaridad derecha",
    caja: "47",
    polaridad: "derecha",
    publicId: "Duncan/47R1300EFB",
    precio: 605000,
    disponible: true,
    tecnologia: "EFB",
  },
  {
    id: "49R1600EFB",
    marcaId: "duncan",
    referencia: "49R1600EFB",
    titulo: "Batería Duncan caja 49 1600 EFB / Polaridad derecha",
    caja: "49",
    polaridad: "derecha",
    publicId: "Duncan/49R1600EFB",
    precio: 725000,
    disponible: true,
    tecnologia: "AGM",
  },

  {
    id: "NS40HDL670",
    marcaId: "mac",
    referencia: "NS40HDL670",
    titulo: "Batería MAC NS40HDL670",
    publicId: "MAC/NS40HDL670",
    precio: 255000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "N60L800M",
    marcaId: "mac",
    referencia: "N60L800M",
    titulo: "Batería MAC N60 800",
    publicId: "MAC/N60L800M",
    precio: 420000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "42IST850M",
    marcaId: "mac",
    referencia: "42IST850M",
    titulo: "Batería MAC 42-850",
    publicId: "MAC/42IST850M",
    amperaje: 850,
    caja: "42",
    polaridad: "derecha",
    precio: 420000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "47950MC",
    marcaId: "mac",
    referencia: "47950MC",
    titulo: "Batería MAC 47950MC",
    publicId: "MAC/47950MC",
    precio: 430000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "27R1140MC",
    marcaId: "mac",
    referencia: "27R1140MC",
    titulo: "Batería MAC 27R1140MC",
    publicId: "MAC/27R1140MC",
    precio: 560000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "271140MC",
    marcaId: "mac",
    referencia: "271140MC",
    titulo: "Batería MAC 271140MC",
    publicId: "MAC/271140MC",
    precio: 560000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "31H1300MC",
    marcaId: "mac",
    referencia: "31H1300MC",
    titulo: "Batería MAC 31H1300MC",
    publicId: "MAC/31H1300MC",
    precio: 650000,
    disponible: true,
    tecnologia: "PLOMO",
  },
  {
    id: "L1ST900MG",
    marcaId: "mac",
    referencia: "L1ST900MG",
    titulo: "Batería MAC L1ST900MG",
    publicId: "MAC/L1ST900MG",
    precio: 440000,
    disponible: true,
    tecnologia: "PLOMO",
  },

  // --- WILLARD -------------------------------------------------------------
  //
  // Las 10 referencias de abajo llegan desde una tabla de 2 columnas
  // (REFERENCIA, AMPERAJE) mas la nota de que todas son de polaridad derecha.
  // Se respeto eso al pie de la letra:
  //
  //   - `caja` va vacia en las 10. La referencia dice el grupo ("42D850" es un
  //     42) pero adivinarlo seria volver a deducir un dato que no nos dieron,
  //     y la caja se decide cuando el cliente la pide, no por el nombre.
  //   - `amperaje` va tal cual, menos la "A" de las dos EFB, que es la unidad
  //     ("640A" son 640). El numero es el que va, la letra no.
  //   - `tecnologia` solo en las dos EFB, y porque la palabra esta escrita en la
  //     propia referencia. Las otras 8 quedan vacias: que sean de plomo es lo
  //     que se les diria a los clientes, no lo que dice el papel.
  //   - sin `publicId`: todavia no hay foto subida de estas.
  {
    id: "NS40670",
    marcaId: "willard",
    referencia: "NS40670",
    titulo: "Batería Willard NS40 670",
    amperaje: 670,
    caja: "NS40",
    polaridad: "derecha",
    tecnologia: "PLOMO",
    precio: 265000,
    disponible: true,
  },
  {
    id: "42D850",
    marcaId: "willard",
    referencia: "42D850",
    titulo: "Batería Willard 42 850",
    amperaje: 850,
    caja: "42",
    polaridad: "derecha",
    tecnologia: "PLOMO",
    precio: 330000,
    disponible: true,
  },
  {
    id: "34D1000",
    marcaId: "willard",
    referencia: "34D1000",
    titulo: "Batería Willard 34 1000 / Polaridad derecha",
    amperaje: 1000,
    caja: "34",
    polaridad: "derecha",
    tecnologia: "PLOMO",
    precio: 450000,
    disponible: true,
  },
  {
    id: "34I1000",
    marcaId: "willard",
    referencia: "34I1000",
    titulo: "Batería Willard 34 1000 / Polaridad izquierda",
    amperaje: 1000,
    caja: "34",
    polaridad: "izquierda",
    tecnologia: "PLOMO",
    precio: 450000,
    disponible: true,
  },
  {
    id: "27D1000",
    marcaId: "willard",
    referencia: "27D1000",
    titulo: "Batería Willard 27 1000 / Polaridad derecha",
    amperaje: 1000,
    caja: "27",
    polaridad: "derecha",
    tecnologia: "PLOMO",
    precio: 505000,
    disponible: true,
  },
  {
    id: "2ID1000",
    marcaId: "willard",
    referencia: "2ID1000",
    titulo: "Batería Willard 27 1000 / Polaridad izquierda",
    amperaje: 1000,
    caja: "27",
    polaridad: "izquierda",
    tecnologia: "PLOMO",
    precio: 505000,
    disponible: true,
  },
  {
    id: "31H1150",
    marcaId: "willard",
    referencia: "31H1150",
    titulo: "Batería Willard 31H 1150 / Polaridad izquierda",
    amperaje: 1150,
    caja: "31H",
    polaridad: "izquierda",
    tecnologia: "PLOMO",
    precio: 550000,
    disponible: true,
  },
  {
    id: "36D850",
    marcaId: "willard",
    referencia: "36D850",
    titulo: "Batería Willard 36 850 / Polaridad derecha",
    amperaje: 850,
    caja: "36",
    polaridad: "derecha",
    tecnologia: "PLOMO",
    precio: 375000,
    disponible: true,
  },
  {
    id: "N60I-750",
    marcaId: "willard",
    referencia: "N60I-750",
    titulo: "Batería Willard N60I-750 / Polaridad izquierda",
    amperaje: 750,
    caja: "N60",
    polaridad: "izquierda",
    tecnologia: "PLOMO",
    precio: 375000,
    disponible: true,
  },
  {
    id: "24BD1000",
    marcaId: "willard",
    referencia: "24BD1000",
    titulo: "Batería Willard 24 1000 / Polaridad derecha",
    amperaje: 1000,
    caja: "24",
    polaridad: "derecha",
    tecnologia: "PLOMO",
    precio: 485000,
    disponible: true,
  },
  {
    id: "47D-60EFB",
    marcaId: "willard",
    referencia: "47D-60EFB",
    titulo: "Batería Willard 47D-60 EFB / Polaridad derecha",
    amperaje: 640,
    caja: "47",
    polaridad: "derecha",
    tecnologia: "EFB",
    precio: 650000,
    disponible: true,
  },
  {
    id: "48D-70EFB",
    marcaId: "willard",
    referencia: "48D-70EFB",
    titulo: "Batería Willard 48D-70 EFB / Polaridad derecha",
    amperaje: 740,
    caja: "48",
    polaridad: "derecha",
    tecnologia: "EFB",
    precio: 750000,
    disponible: true,
  },
  // ACDelco, Moura, Bosch y "Otras marcas" vienen de FF-BATERIAS.xlsx. No
  // tienen foto ni polaridad: la hoja solo trae referencia, amperaje y precio.
  // En ACDelco la referencia es el numero de parte de la hoja; la caja y el
  // amperaje salen de la columna AMPERAJE ("N60-650").
  {
    id: "19375226",
    marcaId: "ACDelco",
    referencia: "19375226",
    titulo: "Batería ACDelco N60 650",
    caja: "N60",
    amperaje: 650,
    precio: 350000,
    disponible: true,
  },
  {
    id: "19375228",
    marcaId: "ACDelco",
    referencia: "19375228",
    titulo: "Batería ACDelco 36 600",
    caja: "36",
    amperaje: 600,
    precio: 350000,
    disponible: true,
  },
  {
    id: "19380080",
    marcaId: "ACDelco",
    referencia: "19380080",
    titulo: "Batería ACDelco 36 Alta",
    caja: "36",
    precio: 350000,
    disponible: true,
  },
  {
    id: "19375225",
    marcaId: "ACDelco",
    referencia: "19375225",
    titulo: "Batería ACDelco NS40 360",
    caja: "NS40",
    amperaje: 360,
    precio: 330000,
    disponible: true,
  },
  {
    id: "19375232",
    marcaId: "ACDelco",
    referencia: "19375232",
    titulo: "Batería ACDelco 35 1000",
    caja: "35",
    amperaje: 1000,
    precio: 420000,
    disponible: true,
  },
  {
    id: "19375233",
    marcaId: "ACDelco",
    referencia: "19375233",
    titulo: "Batería ACDelco 27 1000",
    caja: "27",
    amperaje: 1000,
    precio: 540000,
    disponible: true,
  },
  {
    id: "19375204",
    marcaId: "ACDelco",
    referencia: "19375204",
    titulo: "Batería ACDelco N60 700",
    caja: "N60",
    amperaje: 700,
    precio: 375000,
    disponible: true,
  },
  {
    id: "19375206",
    marcaId: "ACDelco",
    referencia: "19375206",
    titulo: "Batería ACDelco 42 800",
    caja: "42",
    amperaje: 800,
    precio: 420000,
    disponible: true,
  },
  {
    id: "19375208",
    marcaId: "ACDelco",
    referencia: "19375208",
    titulo: "Batería ACDelco 48 900",
    caja: "48",
    amperaje: 900,
    precio: 550000,
    disponible: true,
  },
  {
    id: "ME430FD",
    marcaId: "Moura",
    referencia: "ME430FD",
    titulo: "Batería Moura ME430FD 36 750",
    caja: "36",
    amperaje: 750,
    precio: 395000,
    disponible: true,
  },
  {
    id: "ME570GD",
    marcaId: "Moura",
    referencia: "ME570GD",
    titulo: "Batería Moura ME570GD 950",
    amperaje: 950,
    precio: 430000,
    disponible: true,
  },
  {
    id: "MF72LD",
    marcaId: "Moura",
    referencia: "MF72LD",
    titulo: "Batería Moura MF72LD EFB 650",
    amperaje: 650,
    tecnologia: "EFB",
    precio: 570000,
    disponible: true,
  },
  {
    id: "N60780",
    marcaId: "marca-bosch",
    referencia: "N60780",
    titulo: "Batería Bosch N60 780",
    caja: "N60",
    amperaje: 780,
    precio: 395000,
    disponible: true,
  },
  {
    id: "42D1050",
    marcaId: "marca-bosch",
    referencia: "42D1050",
    titulo: "Batería Bosch 42 1050",
    caja: "42",
    amperaje: 1050,
    precio: 515000,
    disponible: true,
  },
  {
    id: "48D1100K",
    marcaId: "marca-bosch",
    referencia: "48D1100K",
    titulo: "Batería Bosch 48 1100",
    caja: "48",
    amperaje: 1100,
    precio: 550000,
    disponible: true,
  },
  {
    id: "0092S57187",
    marcaId: "marca-bosch",
    referencia: "0092S57187",
    titulo: "Batería Bosch 0092S57187 730",
    amperaje: 730,
    precio: 695000,
    disponible: true,
  },
  {
    id: "24D1150",
    marcaId: "marca-bosch",
    referencia: "24D1150",
    titulo: "Batería Bosch 24 1150",
    caja: "24",
    amperaje: 1150,
    precio: 540000,
    disponible: true,
  },
  {
    id: "0092S67116",
    marcaId: "marca-bosch",
    referencia: "0092S67116",
    titulo: "Batería Bosch 0092S67116 680",
    amperaje: 680,
    precio: 900000,
    disponible: true,
  },
  {
    id: "0092S67117",
    marcaId: "marca-bosch",
    referencia: "0092S67117",
    titulo: "Batería Bosch 0092S67117 760",
    amperaje: 760,
    precio: 1010000,
    disponible: true,
  },
  {
    id: "47D1050",
    marcaId: "marca-bosch",
    referencia: "47D1050",
    titulo: "Batería Bosch 47 1050",
    caja: "47",
    amperaje: 1050,
    precio: 440000,
    disponible: true,
  },
  {
    id: "47D900EFB",
    marcaId: "marca-bosch",
    referencia: "47D900EFB",
    titulo: "Batería Bosch 47 900 EFB",
    caja: "47",
    amperaje: 900,
    tecnologia: "EFB",
    precio: 550000,
    disponible: true,
  },
  {
    id: "48D1100EFB",
    marcaId: "marca-bosch",
    referencia: "48D1100EFB",
    titulo: "Batería Bosch 48 1100 EFB",
    caja: "48",
    amperaje: 1100,
    tecnologia: "EFB",
    precio: 660000,
    disponible: true,
  },
  {
    id: "42D730",
    marcaId: "otras",
    referencia: "42D730",
    titulo: "Batería Coexito 42 730",
    fabricante: "Coexito",
    caja: "42",
    amperaje: 730,
    precio: 295000,
    disponible: true,
  },
  {
    id: "42ISTV4870",
    marcaId: "otras",
    referencia: "42ISTV4870",
    titulo: "Batería Varta 42ISTV4870",
    fabricante: "Varta",
    caja: "42",
    amperaje: 870,
    precio: 440000,
    disponible: true,
  },
  {
    id: "FM-L0-44P",
    marcaId: "otras",
    referencia: "FM-L0-44P",
    titulo: "Batería Fiamm FM-L0-44P",
    fabricante: "Fiamm",
    amperaje: 390,
    precio: 440000,
    disponible: true,
  },
  {
    id: "34-78",
    marcaId: "otras",
    referencia: "34-78",
    titulo: "Batería Optima 34/78",
    fabricante: "Optima",
    caja: "34",
    cca: 750,
    precio: 1230000,
    disponible: true,
  },
];

/**
 * URL de la foto de una bateria, o `null` si todavia no hay foto.
 *
 * Hay dos motivos para no tener foto y no es el mismo:
 *
 *   1. No hay `publicId`. La referencia existe en el catalogo pero nadie ha
 *      subido la imagen todavia. Hoy son las 10 de Willard.
 *   2. Hay `publicId` pero el asset responde 404. Son las 8 de `SIN_FOTO`, que
 *      tienen el nombre del archivo anotado para cuando se suba.
 *
 * Quien dibuja la foto solo necesita preguntar por el resultado: si es `null`
 * muestra el aviso de "foto pendiente", y si es una string la pone. El
 * `c_fit` y el nombre del preset tambien salen de aca, para que las 4 pantallas
 * que muestran una bateria (el catalogo, la ficha, la imagen de Open Graph y el
 * sitemap) no puedan quedar desincronizadas entre si.
 *
 * Antes esta comprobacion estaba escrita 4 veces, una en cada pantalla. Cuando
 * una bateria no tiene foto habia que acordarse de las 4.
 */
export function getFotoBateria(
  bateria: Pick<Bateria, "publicId">,
): string | null {
  if (!bateria.publicId || SIN_FOTO.has(bateria.publicId)) return null;
  return getCloudinaryProductoUrl(bateria.publicId);
}
