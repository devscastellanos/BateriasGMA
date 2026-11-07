/**
 * Puerta unica a la informacion del catalogo (Fase 0 del ROADMAP).
 *
 * Ninguna pantalla lee `src/data/bateriaData.ts` ni `src/data/marcasData.ts`
 * directamente: todo pasa por aca. El dia que el catalogo viva en una base de
 * datos se reescribe este archivo y las paginas no se tocan. ESLint lo impone
 * (`no-restricted-imports` en `eslint.config.mjs`).
 *
 * Por eso las funciones son `async` aunque hoy los datos esten en memoria: una
 * consulta a la base de datos lo sera, y cambiar la firma despues obligaria a
 * agregar `await` en cada pantalla.
 */
import { baterias, getFotoBateria, type Bateria } from "@/data/bateriaData";
import { marcas, type Marca } from "@/data/marcasData";

export type { Bateria, Marca };
export { getFotoBateria };

export type BateriaConMarca = { bateria: Bateria; marca: Marca };

export type FiltrosBusqueda = {
  q?: string;
  marca?: string;
  tecnologia?: NonNullable<Bateria["tecnologia"]>;
  polaridad?: NonNullable<Bateria["polaridad"]>;
  caja?: string;
};

/** Nombre de marca que se muestra para una bateria: su `fabricante` si la
 *  marca es un grupo ("Otras marcas"), o el de la marca. */
export function marcaDe(bateria: Pick<Bateria, "fabricante">, marca: Pick<Marca, "name">) {
  return bateria.fabricante ?? marca.name;
}

/** URL canonica de la ficha. Unico lugar donde se arma. */
export function urlFicha(marca: Pick<Marca, "slug">, bateria: Pick<Bateria, "referencia">) {
  return `/baterias/${marca.slug}/${bateria.referencia.toLowerCase()}`;
}

export async function listarMarcas(): Promise<Marca[]> {
  return marcas.filter((m) => m.activo);
}

export async function obtenerMarca(slug: string): Promise<Marca | null> {
  return marcas.find((m) => m.slug === slug && m.activo) ?? null;
}

/** Todas las baterias de marcas activas, cada una con su marca. */
export async function listarBaterias(): Promise<BateriaConMarca[]> {
  const activas = new Map((await listarMarcas()).map((m) => [m.id, m]));
  return baterias.flatMap((bateria) => {
    const marca = activas.get(bateria.marcaId);
    return marca ? [{ bateria, marca }] : [];
  });
}

export async function bateriasDeMarca(marcaId: string): Promise<Bateria[]> {
  return baterias.filter((b) => b.marcaId === marcaId);
}

/** Busca la ficha tolerando mayusculas: la URL canonica va en minusculas, pero
 *  `/baterias/duncan/NS40R670` deberia funcionar igual. */
export async function obtenerBateria(
  marcaSlug: string,
  referencia: string,
): Promise<BateriaConMarca | null> {
  const marca = await obtenerMarca(marcaSlug);
  if (!marca) return null;

  const bateria = baterias.find(
    (b) =>
      b.marcaId === marca.id &&
      b.referencia.toLowerCase() === referencia.toLowerCase(),
  );
  return bateria ? { bateria, marca } : null;
}

/**
 * Deja solo letras y numeros, en minusculas y sin tildes. La gente escribe el
 * mismo codigo de muchas formas — "NS40 R670", "ns40-r670", "NS40R670" — y
 * las tres tienen que encontrar la misma bateria.
 */
function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Busqueda en memoria. Con decenas o pocos cientos de referencias no hace falta
 * un motor de busqueda: recorrer la lista cuesta menos que una consulta de red.
 *
 * Cada palabra de `q` tiene que aparecer en algun campo (referencia, titulo,
 * caja o marca). Los resultados se ordenan poniendo primero las coincidencias
 * con la referencia, que es lo que escribe quien ya sabe que quiere.
 */
export async function buscarBaterias(
  filtros: FiltrosBusqueda,
): Promise<BateriaConMarca[]> {
  const palabras = (filtros.q ?? "")
    .split(/\s+/)
    .map(normalizar)
    .filter(Boolean);
  const consulta = palabras.join("");

  const candidatas = (await listarBaterias()).filter(
    ({ bateria, marca }) =>
      (!filtros.marca || marca.slug === filtros.marca) &&
      (!filtros.tecnologia || bateria.tecnologia === filtros.tecnologia) &&
      (!filtros.polaridad || bateria.polaridad === filtros.polaridad) &&
      (!filtros.caja || bateria.caja === filtros.caja),
  );

  if (palabras.length === 0) return candidatas;

  const puntuadas = candidatas.flatMap((item) => {
    const { bateria, marca } = item;
    const referencia = normalizar(bateria.referencia);
    const texto = [referencia, bateria.titulo, bateria.caja ?? "", marca.name, marcaDe(bateria, marca)]
      .map(normalizar)
      .join("|");

    if (!palabras.every((p) => texto.includes(p))) return [];

    const puntaje =
      referencia === consulta ? 3 : referencia.startsWith(consulta) ? 2 : referencia.includes(consulta) ? 1 : 0;
    return [{ item, puntaje }];
  });

  // `sort` es estable: a igual puntaje se conserva el orden del catalogo.
  return puntuadas.sort((a, b) => b.puntaje - a.puntaje).map((p) => p.item);
}

/** Valores que de verdad existen en el catalogo, para armar los filtros. Un
 *  filtro con una opcion que no tiene resultados es un callejon sin salida. */
export async function opcionesDeFiltro() {
  const todas = await listarBaterias();
  const unicos = <T,>(valores: (T | undefined)[]) =>
    [...new Set(valores.filter((v): v is T => v !== undefined))];

  const marcasConProductos = new Set(todas.map(({ marca }) => marca.id));

  return {
    marcas: (await listarMarcas()).filter((m) => marcasConProductos.has(m.id)),
    tecnologias: unicos(todas.map(({ bateria }) => bateria.tecnologia)),
    polaridades: unicos(todas.map(({ bateria }) => bateria.polaridad)),
    cajas: unicos(todas.map(({ bateria }) => bateria.caja)).sort((a, b) =>
      a.localeCompare(b, "es", { numeric: true }),
    ),
  };
}
