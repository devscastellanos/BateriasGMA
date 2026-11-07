import type { MetadataRoute } from "next";

import {
  getFotoBateria,
  listarBaterias,
  listarMarcas,
  urlFicha,
} from "@/lib/catalogo";
import { SITE_URL } from "@/lib/site";

/**
 * Lista de URLs del sitio para los buscadores. Next la convierte en XML al
 * hacer el build, asi que agregar una bateria a `bateriaData.ts` la mete al
 * sitemap sola: no hay nada que mantener a mano.
 *
 * Solo van URLs absolutas y en minusculas, que es como quedan las canonicas.
 * Omitimos `lastModified`, `changeFrequency` y `priority` a proposito: no hay
 * ningun dato de fechas en el catalogo y poner la fecha del build
 * declararia que todas las paginas cambiaron hoy, que no es cierto. Google
 * anyways ignora `changeFrequency` y `priority`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // `/baterias` sin parametros es el catalogo completo; con `?q=` o filtros es
  // una busqueda y no se indexa (ver `src/app/baterias/page.tsx`).
  const fijas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/baterias` },
    { url: `${SITE_URL}/contacto` },
    { url: `${SITE_URL}/terminos-y-condiciones` },
    { url: `${SITE_URL}/politica-de-datos` },
    { url: `${SITE_URL}/garantias-y-devoluciones` },
  ];

  const deMarca: MetadataRoute.Sitemap = (await listarMarcas()).map((marca) => ({
    url: `${SITE_URL}/baterias/${marca.slug}`,
  }));

  const deProducto: MetadataRoute.Sitemap = (await listarBaterias()).map(({ bateria, marca }) => {
    const url = `${SITE_URL}${urlFicha(marca, bateria)}`;

    // Las referencias sin foto (8 con el asset en 404, mas las 10 de Willard que
    // aun no tienen `publicId`) entran igual, pero sin imagen: la ficha se
    // publica, lo que no hay es una foto que indexar. La URL que se manda es la
    // de Cloudinary con `c_fit`, que es la misma que ve la persona en la pagina.
    const foto = getFotoBateria(bateria);

    return { url, ...(foto ? { images: [foto] } : {}) };
  });

  return [...fijas, ...deMarca, ...deProducto];
}
