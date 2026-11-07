import type { Metadata } from "next";
import Link from "next/link";

import PaginaLegal from "@/components/legal/pagina-legal";
import {
  EMPRESA,
  HORA_CORTE_ENTREGA,
  URL_SIC,
  WHATSAPP_COMERCIAL,
  sedes,
} from "@/data/contactoData";
import { DESCUENTO_USADA } from "@/lib/pedido";
import { formatearPrecio } from "@/lib/precio";

export const metadata: Metadata = {
  title: "Términos y condiciones | Baterías GMA",
  description: `Condiciones de compra en Baterías GMA, ${EMPRESA.razonSocial}: precios, pagos, entregas en Bogotá y garantías.`,
  alternates: { canonical: "/terminos-y-condiciones" },
};

// "573027015752" -> "302 701 5752", como se escribe un celular en Colombia.
const celular = WHATSAPP_COMERCIAL.replace(/^57(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");

export default function Page() {
  return (
    <PaginaLegal titulo="Términos y condiciones" actualizada="26 de octubre de 2026">
      <h2>1. Quiénes somos</h2>
      <p>
        Este sitio es operado por {EMPRESA.razonSocial}, identificada con NIT{" "}
        {EMPRESA.nit} (en adelante, &quot;Baterías GMA&quot;). Puedes
        contactarnos en el correo{" "}
        <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a>, por
        WhatsApp al {celular} o en nuestras sedes:
      </p>
      <ul>
        {sedes.map((s) => (
          <li key={s.id}>
            {s.nombre}: {s.direccion}. Teléfono {s.telefono}.
          </li>
        ))}
      </ul>

      <h2>2. Alcance</h2>
      <p>
        Estos términos aplican a las compras de baterías que se inicien desde
        este sitio. Se rigen por las leyes de la República de Colombia, en
        especial la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 527 de
        1999 (comercio electrónico).
      </p>

      <h2>3. Productos e información</h2>
      <ul>
        <li>
          Cada ficha muestra la información que tenemos de la referencia:
          marca, caja, polaridad, amperaje y tecnología. Cuando un dato no
          aparece, es porque no lo tenemos confirmado; no lo suponemos.
        </li>
        <li>
          Las fotografías son ilustrativas. Si una referencia no tiene foto, lo
          indicamos.
        </li>
        <li>
          Antes de comprar, confirma con nosotros que la batería sirve para tu
          vehículo, en especial la polaridad: con la polaridad invertida la
          batería no se puede instalar. Puedes indicarnos tu vehículo al hacer
          el pedido.
        </li>
        <li>
          La disponibilidad mostrada es informativa. Un asesor la confirma
          antes de cerrar cada venta.
        </li>
      </ul>

      <h2>4. Precios</h2>
      <ul>
        <li>
          Todos los precios están en pesos colombianos e{" "}
          <strong>incluyen IVA y el domicilio dentro de Bogotá</strong>. No hay
          costos de envío adicionales.
        </li>
        <li>
          Si entregas tu batería usada al recibir la nueva, descontamos{" "}
          {formatearPrecio(DESCUENTO_USADA)} por cada batería del pedido.
        </li>
        <li>
          Podemos actualizar los precios del sitio en cualquier momento. El
          precio que se respeta es el que el asesor confirma al aceptar tu
          pedido.
        </li>
      </ul>

      <h2>5. Cómo se hace una compra</h2>
      <ol className="ml-5 list-decimal space-y-2">
        <li>Agregas las baterías al carrito.</li>
        <li>
          En el carrito ves el resumen del pedido con el total, eliges la forma
          de entrega y completas tus datos.
        </li>
        <li>
          Al pulsar &quot;Enviar pedido por WhatsApp&quot; se abre una
          conversación con el pedido escrito. Enviar ese mensaje{" "}
          <strong>no es todavía una compra</strong>: es una solicitud.
        </li>
        <li>
          Un asesor te responde confirmando disponibilidad, total, forma de
          pago y fecha de entrega. La compra queda hecha cuando tú aceptas esa
          confirmación y realizas el pago acordado.
        </li>
      </ol>

      <h2>6. Medios de pago</h2>
      <p>
        Aceptamos efectivo, transferencia, tarjetas débito y crédito, Addi y
        Sistecrédito. El asesor te indica cómo pagar al confirmar el pedido. Si
        pagas con un sistema de financiación (Addi o Sistecrédito), las
        condiciones del crédito, como la tasa de interés y el número de
        cuotas, te las informa esa plataforma antes de aprobarlo.
      </p>

      <h2>7. Entrega</h2>
      <ul>
        <li>
          <strong>Domicilio:</strong> solo dentro de Bogotá. Si el pedido se
          confirma antes de las {HORA_CORTE_ENTREGA}, lo entregamos el mismo
          día. Si se confirma después, el asesor te informa la fecha de entrega
          al confirmarlo.
        </li>
        <li>
          <strong>Recoger en sede:</strong> en el horario de la sede que
          elijas.
        </li>
        <li>
          Si no podemos entregar en la fecha acordada, te avisamos y puedes
          elegir entre esperar o cancelar el pedido con devolución total de lo
          pagado.
        </li>
      </ul>

      <h2>8. Batería usada</h2>
      <p>
        Las baterías de plomo-ácido usadas no deben botarse con la basura.
        Recibimos tu batería usada para entregarla a su programa de devolución
        posconsumo (Resolución 0372 de 2009 del Ministerio de Ambiente). Si
        eliges entregarla en el pedido, debes entregar una batería usada por
        cada batería nueva para recibir el descuento.
      </p>

      <h2>9. Factura</h2>
      <p>
        Emitimos factura electrónica por cada venta y la enviamos al correo que
        nos indiques en el pedido.
      </p>

      <h2>10. Garantía, retracto y reclamos</h2>
      <p>
        Las condiciones de garantía, el derecho de retracto y cómo presentar
        peticiones, quejas o reclamos están en{" "}
        <Link href="/garantias-y-devoluciones">Garantías, retracto y PQR</Link>.
      </p>

      <h2>11. Datos personales</h2>
      <p>
        Usamos los datos que nos das solo para atender tu pedido, según
        nuestra{" "}
        <Link href="/politica-de-datos">
          Política de tratamiento de datos personales
        </Link>
        .
      </p>

      <h2>12. Autoridad de protección al consumidor</h2>
      <p>
        La autoridad de protección al consumidor en Colombia es la
        Superintendencia de Industria y Comercio:{" "}
        <a href={URL_SIC} target="_blank" rel="noopener noreferrer">
          www.sic.gov.co
        </a>
        .
      </p>
    </PaginaLegal>
  );
}
