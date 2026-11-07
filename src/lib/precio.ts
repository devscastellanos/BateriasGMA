/**
 * Formatea un precio en pesos colombianos: 385000 -> "$385.000".
 *
 * Vive en un solo lugar a propósito. La tarjeta del catálogo y la ficha de
 * producto tienen que mostrar exactamente la misma cifra; si cada una armara el
 * texto por su cuenta, un día una muestra "$385.000" y la otra "$ 385.000,00" y
 * nadie se da cuenta hasta que un cliente las compara y pregunta por qué.
 *
 * En los datos el precio se guarda como número crudo (385000), nunca como
 * texto. Un precio con signo y separador adentro no se puede ordenar, ni
 * comparar, ni filtrar, y además congela el formato dentro del dato.
 */
const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  // Sin esto, Intl devuelve "$ 385.000,00". En Colombia el peso no tiene
  // centavos, así que mostrarlos sería inventar una precisión que no existe.
  maximumFractionDigits: 0,
});

/**
 * Lo que incluye cada precio publicado. La Ley 1480 (arts. 26 y 50) exige
 * informar el precio total con impuestos y costos de envio; como el precio ya
 * los trae, se dice al lado de cada cifra con el mismo texto en todas partes.
 */
export const LEYENDA_PRECIO = "IVA y domicilio en Bogotá incluidos";

export function formatearPrecio(valor: number): string {
  // Intl deja un espacio duro (U+00A0) entre el "$" y el número. Se quita para
  // escribirlo como se escribe acá: $385.000.
  //
  // El espacio va escrito como `\u00a0` y no como un caracter copiado y pegado:
  // un U+00A0 literal es invisible, parece un espacio normal, y basta que un
  // editor lo "ordene" para que el precio vuelva a salir como "$ 385.000".
  return COP.format(valor).replace(/\u00a0/g, "");
}
