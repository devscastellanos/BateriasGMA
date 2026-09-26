# Roadmap — Baterías GMA

**De un catálogo estático a una tienda en línea, con la información lista para
vivir en una base de datos en la nube.**

---

## Qué es este documento

Es un plan de trabajo por fases. Describe **qué hay que cambiar y en qué
orden**, no cómo está escrito el código.

Las evidencias técnicas de cada problema están en `DIAGNOSTICO.md`, con la forma
de comprobar cada una. Este documento no las repite: asume que están verificadas
y se concentra en el camino.

---

## Dónde estamos

| | Hoy |
|---|---|
| Marcas que vendemos | 6 |
| Marcas con productos cargados | 2 (Duncan, MAC) |
| Marcas sin un solo producto | 4 (Willard, Bosch, ACDelco, Moura) |
| Referencias disponibles | 31 |
| Páginas que Google puede leer | 1 (la portada) |
| Fotos de producto | 23 de 31 |
| Fichas de producto | No existen |
| Buscador y filtros | No existen |
| Forma de cerrar una venta | WhatsApp, a mano |
| Dónde vive la información | Escrita en archivos de texto dentro del proyecto |

Lo bueno: la información de productos ya está ordenada con una convención
limpia — cada foto tiene una ruta predecible por marca y referencia. Esa
convención es exactamente lo que necesita una base de datos después. **No hay
que cambiar nada ahí.**

Lo malo: hoy el sitio muestra 31 tarjetas, 4 marcas vacías, 8 fotos que no
cargan, y ninguna forma de buscar por caja o amperaje. Es un folleto, no un
catálogo.

---

# La página más importante

> **`/baterias/duncan/ns40r670`**

Esta es la página que vende. Es la que alguien abre cuando ya sabe qué quiere, y
no hay ninguna otra que la reemplace. Todo lo demás en este plan existe para
conducir gente hacia acá.

## Por qué es la más importante

| | |
|---|---|
| **Es la única forma de capturar la búsqueda de mayor intención.** Quien busca "baterías Bogotá" todavía está comparando. Quien busca **"NS40R670"** ya decidió comprar. |
| **Es donde se gana o se pierde el trabajo de SEO.** El código de la batería va escrito en el nombre de la página, en el título y en la dirección. Se encuentra sin competir. |
| **Es la única que justifica los filtros y el buscador.** Buscar sin fichas es buscar a ciegas: el visitante encuentra la referencia y no tiene dónde hacer clic. |
| **Es la única que muestra specs reales.** Caja, amperaje, polaridad, garantía. Es la información por la que alguien elige una batería en vez de otra. |
| **Es donde la compatibilidad con vehículos paga.** "Batería para Renault Kangoo" es la búsqueda más valiosa del negocio, y solo se puede responder en esta página. |
| **Es donde vive la venta.** El día que haya carrito, comprar pasa aquí. |

## Los cuatro tipos de página

| Tipo | Ejemplo | A qué búsqueda responde |
|---|---|---|
| **Producto** | `/baterias/duncan/ns40r670` | "NS40R670", "batería para Renault Kangoo" |
| **Portada** | `/` | "baterías Bogotá", "batería a domicilio" |
| **Marca** | `/baterias/duncan` | "baterías Duncan", "baterías Duncan Bogotá" |
| **Sede** | `/tiendas/eduardo-santos` | "baterías Eduardo Santos", "baterías Restrepo" |

**La portada no cambia de estructura.** Está bien como está: es la que recibe al
visitante que todavía no sabe qué marca necesita. Lo que sí cambia es que muestre
más marcas, y que las vacías no inviten a hacer clic en nada.

## Qué necesita para estar completa

Nada de esto existe hoy:

| Necesita | Estado actual |
|---|---|
| Página propia por referencia | **No existe** |
| Título único con el código | **No existe** — además hoy 7 pares de referencias comparten nombre y son indistinguibles |
| Fotografía | 23 de 31. Faltan 8 |
| Especificaciones completas | Declaradas en el sitio pero nunca llenadas: están escritas dentro del texto del nombre |
| Compatibilidad con vehículos | **No existe** |
| Descripción propia | **No existe** |
| Precio | No se muestra (ver preguntas abiertas) |
| Botones que funcionen | Uno de los dos no hace nada |

## La advertencia honesta

Esta página es **a la vez la más valiosa y la más cara**. Con 200 productos son
200 páginas, y cada una necesita foto, especificaciones, compatibilidad y
descripción propia.

Por eso el orden importa: **la plantilla tiene que estar terminada antes de
empezar a cargar referencias en volumen.** Si no, se corrigen 200 páginas una por
una. Y conviene publicar de a poco — 31 fichas completas valen más que 200 a
medias.

---

## La decisión que manda sobre todas las demás

> **El costo de mover la información a una base de datos se decide ahora, no
> cuando toque hacerlo.**

Hoy las pantallas del sitio leen los datos directamente de donde están escritos.
Si eso sigue así hasta el momento de la migración, cambiar a base de datos
significa reescribir cada pantalla.

La diferencia entre las dos opciones es una sola cosa: **que haya una única
puerta de entrada a la información del catálogo**, en lugar de que cada pantalla
lea por su cuenta.

- Si cada pantalla lee directo → migrar es reescribir el sitio.
- Si todo pasa por una puerta única → migrar es reescribir **un archivo**.

Son días de trabajo de diferencia, y la diferencia se nota el día que haya 200
productos en vez de 31. Por eso es lo primero, aunque no se vea.

**Se aplica desde la primera línea de código nuevo hasta el final**, y se impone
automáticamente para que no se pueda violar por descuido.

---

# Las fases

---

## Fase 0 — Cimientos de datos
### 1 a 2 días · invisible para el cliente

No se ve en pantalla. Es lo que evita tener que rehacer el sitio más adelante.

**Qué cambia**

- Se crea la puerta única a la información del catálogo.
- Se corrigen los identificadores de marca: hoy conviven `mac`, `marca-bosch`,
  `ACDelco` y `Moura` en el mismo campo. Con 6 marcas no ha pasado nada; con 6
  marcas y 200 productos, las búsquedas fallarían en silencio.
- Se separan las especificaciones en campos propios. Hoy la caja, el amperaje y
  la polaridad están escritas a mano dentro del texto del nombre del producto
  ("Batería Duncan caja NS40 670 / Polaridad derecha"). Con 200 productos eso no
  permite buscar, ni filtrar, ni mostrar nada en una ficha.
- Se decide qué información se muestra y cuál es interna. La razón social, los
  teléfonos y las direcciones quedan escritos **en un solo lugar**.

**Lo que desbloquea:** que las fichas de producto se puedan generar con datos
reales, y que la migración a base de datos no obligue a rehacer nada.

> Va primera aunque no se vea, porque las 200 fichas de la Fase 1 se construyen
> sobre este esquema. Construir primero y corregir después significa rehacer 200
> páginas.

---

## Fase 1 — La ficha de producto
### 3 semanas · la página que vende

**Es la fase más importante del plan.** Se hace primero, no porque sea la más
bonita, sino porque todo lo demás depende de que exista.

**Qué cambia**

- Cada batería tiene su propia página, construida desde una plantilla reutilizable.
- La URL queda confirmada: `/baterias/duncan/ns40r670`.
- La ficha se arma **diseñada para vender**, no como un artículo de revista: foto
  grande, especificaciones en tabla, compatibilidad, y los botones de acción
  arriba. El día que haya carrito, comprar pasa acá, y no se toca nada.
- El botón "Ver detalle" deja de estar roto y lleva a la ficha.
- El botón "Cotizar" abre WhatsApp con el producto ya mencionado en el mensaje.
- Se resuelven los nombres duplicados: 7 pares de referencias son indistinguibles
  hoy, y dos productos que se ven igual en un listado no se pueden elegir.
- Se cargan las 31 referencias existentes con la información que ya está.

**Lo que desbloquea:** el SEO por producto, la venta, y el punto de partida del
carrito.

> No se generan las 200 fichas de una. La plantilla se prueba con las 31 que ya
> existen, se corrige, y después se escala al ritmo que dé el contenido.

---

## Fase 2 — Un catálogo que se pueda recorrer
### 2 semanas

**Va después de la Fase 1, y antes iba antes.** La razón es directa: mejorar el
catálogo sin fichas es mejorar la vitrina de una tienda donde tocar un producto
no lleva a ninguna parte. Hoy ese botón no hace nada.

**Qué cambia**

- La portada mantiene su estructura. Solo se le agregan marcas, y las vacías
  dejan de invitar a hacer clic en nada.
- Cada marca tiene su página de catálogo con las especificaciones ya separadas.
- Aparecen filtros: por tecnología, por caja, por polaridad, por amperaje.
- Un buscador por nombre o por código de referencia.
- Las fotos que faltan se muestran como "foto pendiente" y no como una imagen
  rota.
- Las 4 marcas sin productos dejan de aparecer como si se pudiera comprar.

**Lo que desbloquea:** que alguien encuentre su batería sin conocer la marca, y
que valga la pena invertir en las siguientes fases.

---

## Fase 3 — Que la gente nos encuentre
### 1 semana, en paralelo con la Fase 1

Un negocio local en Bogotá vive o dies de esto. Hoy no hay casi nada.

**Qué cambia**

- Mapa del sitio y archivo de robots, para que Google sepa qué páginas existen.
  Sin esto, las fichas que se creen en la Fase 1 no las encuentra nadie.
- Datos estructurados: tipo de negocio, las dos sedes, direcciones, teléfonos y
  horarios, en un formato que Google entiende. Incluye los datos de cada
  producto — precio, disponibilidad, identificador — que es lo que habilita que
  aparezcan en buscadores con la foto y el precio.
- Página por sede con su propia información.
- Títulos y descripciones propios por página. Hoy todas dicen lo mismo.
- Reducción del peso de las imágenes. La imagen principal pesa 1,4 MB y es lo
  primero que ve el visitante.

**El problema concreto:** el nombre de la empresa aparece escrito de **tres
formas distintas** en el sitio, dos de ellas mal acentuadas. Google compara ese
nombre, la dirección y el teléfono contra la ficha de Google Business. Cuando no
coinciden, se pierde posicionamiento local. Es de las cosas más baratas de
arreglar y de las que más rinden.

**Lo que desbloquea:** que el tráfico llegue sin depender de publicidad.

---

## Fase 4 — Llenar el catálogo
### Continua · la fase más larga y la que más falta

No es código. Es el recurso que más falta, y el que ninguna cantidad de
programación reemplaza. **Es también la que le da materia prima a la Fase 1.**

**Qué falta**

- **Fotos:** hay 23 de 31. Faltan 8, más las ~170 de las referencias futuras.
- **Descripciones:** texto real por producto. Con 31 productos es tolerable que
  algunas sean escuetas. Escalado a 200 páginas casi idénticas, Google lo
  interpreta como contenido de relleno.
- **Las 4 marcas vacías:** Willard, Bosch, ACDelco y Moura. O entran con
  contenido de verdad, o no se muestran como algo que se puede comprar hoy.
- **Compatibilidad con vehículos.** Ver abajo.

**El dato que más valor comercial tiene**

> Para una batería, la información más valiosa es **qué vehículos la montan**.

Hoy no existe. El carrusel de carros de la portada es decoración. En una tienda
en línea, la forma natural de navegar es *elige tu vehículo → mira las baterías
que le sirven*, y esa respuesta vive en la ficha de producto. Sin eso, el
visitante tiene que buscar por código, que es exactamente lo que un sitio web
debería evitar.

**Esta es la parte más lenta de conseguir y no se puede inventar.** Los
distribuidores de baterías manejan listas de compatibilidad por referencia; hay
que pedirlas. Si se empieza a buscar cuando ya haya 200 productos, hay que
reconstruirlas todas. **Es la única tarea que conviene empezar antes de tener
nada escrito.**

---

## Fase 5 — Sacar la información de los archivos de texto
### 2 a 3 semanas · base de datos en la nube

**Qué cambia:** la información del catálogo pasa a vivir en una base de datos en
la nube, en lugar de estar escrita dentro del proyecto.

**Cómo se comprueba que salió bien:** las pantallas del sitio **no cambian**.
Solo cambia de dónde leen los datos. Si hay que tocar alguna pantalla, es señal
de que la Fase 0 se hizo mal.

**Qué se necesita decidir antes**

- **¿Quién carga los productos?** Si es el dueño de GMA, conviene una
  herramienta con pantalla de edición. Si es alguien técnico, alcanza con la base
  de datos y una pantalla simple.
- **¿Se muestran precios?** Si sí, el precio tiene que existir en el esquema
  desde la Fase 0, no desde la Fase 6. Hay una razón legal colombiana en juego
  sobre el derecho del consumidor a conocer el precio, y conviene confirmarla
  con asesoría antes de decidir.

**Lo que desbloquea:** que varias personas puedan cargar productos sin tocar
código, y que el catálogo crezca sin romper nada.

---

## Fase 6 — Vender en línea
### 4 a 6 semanas · eCommerce

**Qué cambia**

- El botón "Cotizar" pasa a llamarse "Comprar" y abre el carrito.
- Carrito que se recuerda al recargar la página.
- Forma de pago. Colombia ya opera **Addi** y **Sistecrédito** — los dos aparecen
  hoy en el texto del sitio, así que la intención de ofrecerlos ya está; falta
  conectarlos. Sumar tarjeta y pago por PSE.
- Cuenta de cliente e historial de compras.
- Confirmación del pedido y aviso al cliente.
- Envío a domicilio e instalación, que ya se prometen comercialmente.

**Lo que ya está hecho y no se tira**

Las fichas de producto, el buscador, los filtros, el SEO por producto y el
flujo de contacto son la misma mecánica con un paso adicional. **La Fase 1 no es
un prototipo descartable: es la mayor parte de la tienda.**

---

# Los dos botones, en resumen

```
HOY                          Fase 1                    Fase 6
─────────────────────────────────────────────────────────────────
[Ver detalle]  roto     →    [Ver detalle]        →   [Ver detalle]
  (no hace nada)            lleva a la ficha          igual

[Cotizar]        →         [Cotizar]             →   [Comprar]
  abre WhatsApp             abre WhatsApp              suma al carrito
  con el producto            con el producto
  ya mencionado
```

El costo de que hoy uno de los dos no haga nada es que se ve como un sitio a
medio hacer. La Fase 1 lo cierra.

---

# Orden

```
Fase 0 (bases)  →  Fase 1 (FICHAS)  →  Fase 2 (catálogo)  →  Fase 3 (SEO)
                        │                                        │
                        └─────────→ Fase 4 (contenido) ──────────┤
                                    (le da materia prima)        │
                                                                ↓
                                              Fase 5 (nube) → Fase 6 (tienda)
```

**Lo que no se puede hacer en paralelo**

- **La Fase 0 va primera** aunque no se vea. Las 200 fichas de la Fase 1 se
  construyen sobre su esquema; corregirlo después significa rehacer 200 páginas.
- **La Fase 1 va antes que la Fase 2.** Mejorar el catálogo sin fichas es mejorar
  la vitrina de una tienda donde tocar un producto no lleva a ninguna parte.
- **La Fase 3 va con la Fase 1**, no después. Si el mapa del sitio y los datos
  estructurados llegan cuando ya hay 200 fichas, hay que indexarlas desde cero.
- **La compatibilidad con vehículos se pide antes de la Fase 4.** Es lo único
  que depende de terceros y no se puede recuperar después.

---

# Riesgos

| Riesgo | Qué pasa | Qué se hace |
|---|---|---|
| Fitment no se consigue | La ficha no puede responder "batería para mi carro", que es la búsqueda más valiosa | Pedir la lista en la Fase 0. Plan B: buscador por código + guía de compatibilidad escrita |
| El contenido de 200 productos no llega a tiempo | Fichas vacías o a medias | Publicar de a poco. 31 completas valen más que 200 a medias |
| Se salta la Fase 0 | La Fase 5 se convierte en rehacer el sitio | La puerta única es la primera tarea, no la última |
| Se cargan referencias antes de terminar la plantilla | 200 páginas que hay que corregir una por una | Terminar la plantilla con las 31 que ya existen antes de escalar |
| Alguien carga productos sin revisar | Datos inconsistentes en producción | Validación en la base de datos, no solo en el formulario |
| Un solo proveedor de pago falla | No se puede cobrar | Conectar uno primero; PSE cubre el mercado local |

---

# Preguntas abiertas

Estas bloquean decisiones concretas. Ninguna impide empezar la Fase 0.

1. **¿Quién carga los productos?** Dueño, técnico, o ambos → decide la Fase 5.
2. **¿Existe una lista de qué vehículos usa cada referencia?** → decide si la
   ficha puede responder la búsqueda más valiosa.
3. **¿Se muestran precios?** → define el esquema desde el principio, y cambia
   el aspecto de la ficha. Confirmar con asesoría legal.
4. **¿Hay manual de marca** (logotipo, colores, tipografía oficiales)? → define si
   se trabaja con lo que hay o se propone una dirección.
5. **¿Saben el inventario por referencia o solo si está disponible?** → define si
   el stock es un número o un sí/no.
6. **¿Cuál es el dominio?** → hoy se usa un provisional para los enlaces y el
   mapa del sitio.

---

# Cómo se sabe que vamos bien

Al terminar el MVP:

- [ ] Cada batería tiene su ficha completa, y el botón "Ver detalle" funciona
- [ ] Ninguna referencia muestra el mismo nombre que otra
- [ ] Todas las páginas cargan rápido y ya están prerenderizadas
- [ ] Ninguna imagen rota, en ninguna página
- [ ] Filtros y buscador funcionando sobre datos estructurados
- [ ] Mapa del sitio, robots y datos estructurados validados por Google
- [ ] Las dos sedes con su información correcta y coincidente en todo el sitio
- [ ] Los dos botones funcionan
- [ ] Búsquedas de personas con cotizaciones guardadas
- [ ] El sitio se construye sin errores y sin advertencias

---

# Lo primero

1. Responder las 6 preguntas abiertas
2. **Pedir la lista de compatibilidad de vehículos.** Es lo único que depende de
   terceros y no se puede recuperar después
3. Fase 0: la puerta única a la información y la limpieza del esquema
4. **Fase 1: la ficha de producto**, empezando por la plantilla y las 31
   referencias que ya existen
5. Fase 3 en paralelo: que la gente encuentre lo que se creó
6. Fase 2: que el catálogo se pueda recorrer
