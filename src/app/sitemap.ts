import type { MetadataRoute } from "next";

import { baterias, SIN_FOTO } from "@/data/bateriaData";
import { marcas } from "@/data/marcasData";
import { getCloudinaryProductoUrl } from "@/lib/cloudinary";
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
export default function sitemap(): MetadataRoute.Sitemap {
  const fijas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/contacto` },
  ];

  const deMarca: MetadataRoute.Sitemap = marcas
    .filter((marca) => marca.activo)
    .map((marca) => ({ url: `${SITE_URL}/baterias/${marca.slug}` }));

  const deProducto: MetadataRoute.Sitemap = baterias.flatMap((bateria) => {
    const marca = marcas.find((m) => m.id === bateria.marcaId && m.activo);
    if (!marca) return [];

    const url = `${SITE_URL}/baterias/${marca.slug}/${bateria.referencia.toLowerCase()}`;

    // Las 8 referencias de `SIN_FOTO` entran sin imagen: la ficha se publica
    // igual, pero no hay foto que indexar. La URL que se manda es la de
    // Cloudinary con la transformation `c_fit`, que es la misma que ve la
    // persona en la pagina.
    const sinFoto = !bateria.publicId || SIN_FOTO.has(bateria.publicId);

    return [{ url, ...(sinFoto ? {} : { images: [getCloudinaryProductoUrl(bateria.publicId)] }) }];
  });

  return [...fijas, ...deMarca, ...deProducto];
}
