import type { Metadata } from "next";

import PaginaLegal from "@/components/legal/pagina-legal";
import { EMPRESA, URL_SIC, WHATSAPP_COMERCIAL, sedes } from "@/data/contactoData";

export const metadata: Metadata = {
  title: "Garantías, retracto y PQR | Baterías GMA",
  description: `Garantía de las baterías, derecho de retracto y cómo presentar peticiones, quejas y reclamos en ${EMPRESA.razonSocial}.`,
  alternates: { canonical: "/garantias-y-devoluciones" },
};

const celular = WHATSAPP_COMERCIAL.replace(/^57(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");

// El termino de garantia por marca todavia no esta definido por el negocio:
// el texto remite a la factura en vez de inventar un numero de meses. Cuando
// se defina, va como dato de cada marca y se muestra tambien en la ficha.
export default function Page() {
  return (
    <PaginaLegal titulo="Garantías, retracto y PQR" actualizada="26 de octubre de 2026">
      <h2 id="garantia">1. Garantía</h2>
      <p>
        Todas nuestras baterías tienen la garantía legal que establece la Ley
        1480 de 2011: respondemos por su calidad, idoneidad, seguridad y buen
        funcionamiento.
      </p>
      <ul>
        <li>
          <strong>Término:</strong> el que otorga el fabricante para cada
          referencia. Te lo confirmamos antes de la compra y queda escrito en
          tu factura.
        </li>
        <li>
          <strong>Qué cubre:</strong> defectos de fabricación o de calidad de
          la batería.
        </li>
        <li>
          <strong>Qué no cubre</strong> (art. 16 de la Ley 1480): daños por
          fuerza mayor o caso fortuito, por el hecho de un tercero, por uso
          indebido, o por no seguir las instrucciones de instalación, uso y
          mantenimiento. Por ejemplo, instalar la batería con la polaridad
          invertida, o una falla del sistema eléctrico del vehículo que la
          descargue.
        </li>
        <li>
          <strong>Cómo se hace efectiva:</strong> lleva la batería y tu factura
          a cualquiera de nuestras sedes o escríbenos. Revisamos la batería y,
          si el defecto está cubierto, según el caso la reparamos, la
          cambiamos por otra igual o te devolvemos el dinero, como indica la
          ley.
        </li>
        <li>
          Respondemos tu solicitud de garantía en máximo 15 días hábiles.
        </li>
      </ul>

      <h2 id="retracto">2. Derecho de retracto</h2>
      <p>
        Como la compra se hace a distancia, tienes derecho a retractarte
        (artículo 47 de la Ley 1480 de 2011):
      </p>
      <ul>
        <li>
          <strong>Plazo:</strong> 5 días hábiles contados desde que recibes la
          batería.
        </li>
        <li>
          <strong>Condiciones:</strong> debes devolver la batería por los
          mismos medios y en las mismas condiciones en que la recibiste. Los
          costos de transporte de la devolución corren por tu cuenta.
        </li>
        <li>
          <strong>Devolución del dinero:</strong> te devolvemos todo lo que
          pagaste, sin descuentos ni retenciones, en máximo 30 días calendario
          desde que ejerces el retracto.
        </li>
        <li>
          Para ejercerlo, escríbenos dentro del plazo a{" "}
          <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a> o por
          WhatsApp al {celular}.
        </li>
      </ul>

      <h2 id="pqr">3. Peticiones, quejas y reclamos (PQR)</h2>
      <p>Puedes presentar una petición, queja o reclamo por cualquiera de estos medios:</p>
      <ul>
        <li>
          Correo: <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a>
        </li>
        <li>WhatsApp: {celular}</li>
        <li>
          En nuestras sedes:{" "}
          {sedes.map((s) => `${s.nombre} (${s.direccion})`).join(" y ")}.
        </li>
      </ul>
      <p>
        Indica tu nombre, tu documento, el número de factura o del pedido si lo
        tienes, qué pasó y qué solicitas. Te respondemos en máximo 15 días
        hábiles.
      </p>
      <p>
        Si no estás conforme con nuestra respuesta, puedes acudir a la
        Superintendencia de Industria y Comercio, la autoridad de protección al
        consumidor en Colombia:{" "}
        <a href={URL_SIC} target="_blank" rel="noopener noreferrer">
          www.sic.gov.co
        </a>
        .
      </p>
    </PaginaLegal>
  );
}
