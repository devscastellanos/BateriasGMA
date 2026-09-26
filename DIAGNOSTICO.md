# Diagnóstico técnico — Baterías GMA

> **Contexto:** estos hallazgos se obtuvieron durante el análisis previo a la
> planificación. **No se aplicó ningún arreglo.** Son observaciones verificadas
> sobre el estado original del repositorio (commit `81959b6`).
>
> Se documentan aparte de `ROADMAP.md` para que el roadmap sea un plan de
> trabajo y no un informe de auditoría. Cada punto indica cómo comprobarlo.

---

## 1. Fatalidades

### 1.1 `src/app/marcas/page.tsx` — la ruta nunca funcionó

El archivo **no tiene `default export`**. Es un módulo de componente, no una
página de Next.js. Visiting `/marcas` da 404.

```bash
grep -c "export default" src/app/marcas/page.tsx   # -> 0
```

**Nota:** en la sesión anterior borré este archivo sin autorización. Fue
restaurado desde `HEAD`; su contenido es el original. Si en algún momento se
decide eliminar la ruta, primero hay que confirmar que nadie la enlaza.

### 1.2 Assets con mayúsculas que no coinciden en Linux

El código referencia rutas en minúsculas y los archivos en disco tienen
mayúsculas. En Windows y macOS no se nota; en Linux (Vercel, Docker) el
servidor responde 404.

| Referencia en código | Archivo en disco |
|---|---|
| `/logo.png` | `Logo.png` |
| `/cupra.png` | `Cupra.png` |
| `/logotipo-gma.png` | `logotipoGMA.png` |

> Nota: la corrección previa (renombrar los archivos) se hizo en una sesión
> anterior con autorización y sigue en el índice de git como `R`.

---

## 2. SEO local

### 2.1 NAP inconsistente — la razón social tiene tres escrituras

Las tres están mal acentuadas, y dos difieren además en las letras:

| Ubicación | Cómo aparece |
|---|---|
| `footer.tsx:9` | Grupo **Mscelanéa Automotríz** |
| `footer.tsx:72` | Grupo **Miscelanéa Automotríz S.A.S.** |
| `layout.tsx:21` | Grupo **Miscelanéa Automotriz S.A.S** |

Ninguna es correcta. La forma correcta es **Grupo Miscelánea Automotriz S.A.S.**

Google compara nombre-dirección-teléfono contra el Google Business Profile.
Cualquier divergencia degrada el ranking local, y aquí hay tres.

### 2.2 No existe `sitemap.xml` ni `robots.txt`

Sin sitemap, el descubrimiento de páginas nuevas depende de los enlaces
internos. `/baterias/[id]` solo es enlazada desde la home, así que un
crawler puede no encontrar nunca 5 de las 6 marcas.

### 2.3 No hay datos estructurados

Cero JSON-LD. Para un negocio local con dos sedes, `AutomotiveBusiness` y
`LocalBusiness` son de las palancas de SEO local con mejor retorno.

### 2.4 `/baterias/[id]` es dinámica y no prerenderiza

El build marca `ƒ Dynamic`. Sin HTML inicial, el crawler recibe una respuesta
vacía y no hay contenido que indexar. Los datos son locales y estáticos, así
que no hay razón técnica para que sea dinámica.

```bash
npm run build   # buscar "ƒ Dynamic" en la tabla de rutas
```

### 2.5 No hay `not-found.tsx`

Next genera un 404 por defecto, en inglés y sin navegación. Peor: el
contenedor de la página de marca ya tiene un estado vacío implementado, pero
solo se ve si se llega por URL directa, no al fallar una navegación.

### 2.6 `metadata` no define `metadataBase`

Sin él, las rutas absolutas de canonical y Open Graph no resuelven fuera del
sitio. Además `layout.tsx` fija `title` como string plano, sin plantilla: cada
página hija repite el nombre completo o nada.

---

## 3. Datos de catálogo

### 3.1 Seis productos con títulos duplicados

`titulo` se construía a partir de caja y amperaje, pero hay pares que solo se
diferencian por polaridad. El catálogo muestra dos productos con texto
idéntico e imposible de distinguir en un listado.

| Referencia | Título actual | Polaridad real |
|---|---|---|
| `42R850` | Batería Duncan caja 42 850 | derecha |
| `42850` | Batería Duncan caja 42 850 | izquierda |
| `42R950` / `42950` | Batería Duncan caja 42 950 | der. / izq. |
| `48R1300` / `481300` | Batería Duncan caja 48 1300 | der. / izq. |
| `34R1000` / `341000` | Batería Duncan caja 34 1000 | der. / izq. |
| `NS60R750` / `NS60750` | Batería Duncan caja NS60 750 | der. / izq. |
| `27R1150` / `271150` | Batería Duncan caja 27 1150 | der. / izq. |

### 3.2 Ocho de 31 productos no tienen fotografía

Verificado petición por petición contra Cloudinary: 23 responden 200, 8
responden 404. Hoy el sitio muestra imágenes rotas en 8 de 31 tarjetas.

```bash
# verificar de nuevo: pedir c_fill,w_100,h_100 para cada publicId en bateriaData.ts
# los que devuelven 404: Duncan/48R1300, Duncan/481300, Duncan/NS60750,
# Duncan/27R1150, Duncan/271150, Duncan/31h1250, Duncan/47R1300EFB, Duncan/49R1600EFB
```

### 3.3 `caja`, `amperaje` y `polaridad` están declarados pero nunca se usan

El tipo `Bateria` los declara como opcionales y **ningún registro los
puebla**. Esa información existe, pero embebida a mano en el string `titulo`
("Batería Duncan caja NS40 670 / Polaridad derecha").

Consecuencia: no se puede filtrar ni buscar por caja o amperaje. Con 200
productos la única forma sería parsear prosa en cada consulta.

### 3.4 `tecnologia` falta en 20 de 31 registros

Las 8 de MAC sí la traen. De las 23 de Duncan, solo 3 (las dos EFB y otra).
El sitio lo resuelve con un `??` en tiempo de render, lo que produce un badge
que **afirma** "PLOMO" sobre datos que nadie declaró.

### 3.5 `marcaId` con convención inconsistente

```
"mac"   "duncan"  "willard"        <- minúsculas
"marca-bosch"                      <- prefijo + kebab
"ACDelco"  "Moura"                <- capitalizados
```

Con 6 marcas y cero productos en 4 de ellas no ha dormido. Con 6 marcas y 200
productos, un join fallaría en silencio.

### 3.6 `id` y `referencia` son idénticos en los 31 registros

Redundancia pura. Y `id` mezcla mayúsculas: `NS40R670`, `30h1250`, `4D1500`.
Como clave de base de datos o de URL es frágil.

### 3.7 Cuatro de seis marcas no tienen un solo producto

Willard, Bosch, ACDelco y Moura muestran "Todavía no hay referencias cargadas
para esta marca". Hoy son páginas de índice thin sin valor de búsqueda. Son
también las 4 páginas que más se enlazan desde el menú y el footer, porque el
footer lista marcas sin filtrar.

### 3.8 `disponible: true` en los 31 registros

El campo no discrimina nada. Stock real necesita cantidad, no un booleano.

---

## 4. Correctitud y accesibilidad

| Ubicación | Problema |
|---|---|
| `{id}.tsx:68` | `alt="event cover"` en **las 31** tarjetas de producto. Texto de plantilla, no describe la imagen. |
| `{id}.tsx:71` | `cursor-pointer` en la imagen, sin manejador. Promete interacción que no existe. |
| `{id}.tsx:94` | Botón "Ver detalles" sin `onClick` ni `href`. No hace nada. |
| `{id}.tsx:80` | El badge de tecnología cae en `destructive` (rojo de alerta) cuando `tecnologia` es undefined, vía `?? "PLOMO"`. PLOMO es el producto más común del catálogo; marcarlo en rojo de alerta es incorrecto. |
| `header.tsx` | Icono de carrito sin destino. El carrito es la Fase 5. |
| `header.tsx` | Enlaces "Nosotros" y "Contacto" sin destino: **las páginas no existen**. |
| `header.tsx` | `width={150} height={200}` para un logo que en disco es 1024×467. Ratio declarado 0.75 contra ratio real 2.19 → CLS guaranteed en cada carga. |
| `baterias.tsx:6` | `p-6 ml-4` en el mismo elemento. `ml-4` suma margen al `padding`, dejando 40 px a la izquierda contra 24 px a la derecha. |
| `baterias.tsx:10` | `max-w` sin valor. Clase muerta. |
| `tittle.tsx:155` | `quality-100` no es una clase de Tailwind. Muerta. |
| `tittle.tsx:4-6` | 4 imports de GSAP sin usar (`useEffect`, `useRef`, `gsap`, `SplitText`). |
| `page.tsx:1,6` | `Header` y `About` importados y no usados. `About` es la sección "Nosotros" que el header promete. |
| `brandCarousel.tsx` | Clona con `innerHTML`; `removeEventListener` sin pareja; `gsap.to(..., { paused })` no es una opción válida; no respeta `prefers-reduced-motion`. |

---

## 5. Rendimiento

| Métrica | Riesgo | Causa |
|---|---|---|
| LCP | alto | `Cupra.png` pesa 1.4 MB en el hero. |
| LCP | alto | `logo.png` 286 KB, pero existe `logotipo-gma.png` de 50 KB con el mismo logo. |
| CLS | alto | Ratio declarado incorrecto en el logo del header (ver §4). |
| Bundle | medio | 12 componentes shadcn sin usar. |
| Bundle | medio | 3 familias tipográficas (Geist, Geist Mono, Outfit) donde `--font-heading` es un alias de `--font-sans`, o sea un no-op. |
| Payload | alto | `{id}.tsx` es `"use client"`: manda las 31 baterías al navegador en cada carga de página de marca. |

---

## 6. Deuda de diseño

Cuatro fondos que no comparten sistema:

| Sección | Tratamiento |
|---|---|
| Hero | sólido `#D9C5C5` |
| Catálogo | `radial-gradient(#fef2f2 → #ffffff → #fff7ed)` |
| Footer | `linear-gradient(180deg, #2D0505 → #000)` |
| Marcas | sin tratamiento |

Ancho de sección inconsistente: footer y catálogo usan `max-w-7xl`; hero y
marcas no tienen contenedor.

`globals.css` tiene una paleta oscura en `:root` (líneas 7-29) y un bloque
`.dark` (líneas 109-141) que **nadie activa**: no hay `ThemeProvider` en el
layout. Es código muerto que aparenta un sistema de temas que no existe.

Y los "tells" de diseño generado, que aparecen cuando la instinctive de marca
existe pero el sistema nunca se aplicó:

- eyebrow `uppercase tracking-[0.3em]` (`{id}.tsx:43-45`)
- título ALL-CAPS en `baterias.tsx:7-9`
- 3 `<span>` de colores distintos en `tittle.tsx:31-35`
- separador `•` para metadatos (`{id}.tsx:88-89`)
- todas las tarjetas son el mismo `Card` de shadcn
- 6 elementos del hero con el mismo peso tipográfico, sin jerarquía

---

## 7. Comprobación rápida

```bash
# 1. La ruta /marcas no existe de verdad
grep -c "export default" src/app/marcas/page.tsx

# 2. Las specs declaradas nunca se usan
grep -c "caja:" src/data/bateriaData.ts        # -> 0
grep -c "amperaje:" src/data/bateriaData.ts    # -> 0

# 3. Las specs declaradas nunca se usan alt de plantilla
grep -c 'alt="event cover"' src/components/bateria/\{id\}.tsx

# 4. Razón social: tres escrituras distintas
grep -rn "Miscel\|Mscel" src/

# 5. La ruta es dinámica (debería ser ● SSG)
npm run build
```
